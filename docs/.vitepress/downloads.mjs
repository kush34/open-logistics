// Sums daily downloads for the published packages across npm, PyPI and crates.io.
// Shared by scripts/docs-downloads.mjs (build-time snapshot kept as the offline
// fallback) and DownloadStats.vue (live fetch in the visitor's browser), so both
// read and validate the registries the same way.

export const PACKAGES = {
  npm: "open-logistics",
  pypi: "open-logistics-sdk",
  crates: "open-logistics",
};

export const CHANNELS = Object.keys(PACKAGES);

const DAY = 864e5;
const MAX_DAYS = 4000; // one channel's history; ~11 years of dailies
const MAX_DOWNLOADS = 1e9; // per day; anything larger is bad data

const iso = (date) => date.toISOString().slice(0, 10);
const isCount = (n) => Number.isSafeInteger(n) && n >= 0 && n <= MAX_DOWNLOADS;

async function getJSON(url, { timeout = 10_000 } = {}) {
  const res = await fetch(url, {
    // crates.io requires a User-Agent; browsers drop this and send their own.
    headers: { "User-Agent": "open-logistics-docs" },
    signal: AbortSignal.timeout(timeout),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

// Keeps only well-formed days: an ISO date and a sane non-negative integer.
function toDays(rows, dateKey = "date") {
  if (!Array.isArray(rows)) throw new Error("missing daily downloads");
  const days = [];
  for (const row of rows.slice(0, MAX_DAYS)) {
    const date = row?.[dateKey];
    const downloads = row?.downloads;
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    if (!isCount(downloads)) continue;
    days.push({ date, downloads });
  }
  if (!days.length) throw new Error("no valid daily downloads");
  return days;
}

async function npmDays({ now }) {
  const meta = await getJSON(`https://registry.npmjs.org/${PACKAGES.npm}`);
  const created = meta?.time?.created;
  if (typeof created !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(created)) {
    throw new Error("npm publish date missing");
  }

  // npm caps each stats request at 18 months, so walk from first publish in
  // 500-day chunks.
  const days = [];
  const end = new Date(`${iso(now)}T00:00:00Z`);
  let start = new Date(`${created.slice(0, 10)}T00:00:00Z`);
  for (let chunks = 0; start <= end && chunks < 50; chunks += 1) {
    const stop = new Date(Math.min(start.getTime() + 499 * DAY, end.getTime()));
    const data = await getJSON(
      `https://api.npmjs.org/downloads/range/${iso(start)}:${iso(stop)}/${PACKAGES.npm}`,
    );
    days.push(...toDays(data?.downloads, "day"));
    start = new Date(stop.getTime() + DAY);
  }
  return days;
}

async function pypiDays({ pypiUrl }) {
  const data = await getJSON(
    pypiUrl ??
      `https://pypistats.org/api/packages/${PACKAGES.pypi}/overall?mirrors=false`,
  );
  return toDays(data?.data);
}

async function cratesDays() {
  const data = await getJSON(
    `https://crates.io/api/v1/crates/${PACKAGES.crates}/downloads`,
  );
  return toDays(data?.version_downloads);
}

const sources = { npm: npmDays, pypi: pypiDays, crates: cratesDays };

// One channel's validated daily history, or throws so the caller can fall back
// to the last known value.
export async function channelDays(channel, options = {}) {
  const now = options.now ?? new Date();
  return sources[channel]({ ...options, now });
}

export function totals(days, now = new Date()) {
  // 30 calendar dates including today.
  const windowStart = iso(new Date(now.getTime() - 29 * DAY));
  let lifetime = 0;
  let monthly = 0;
  for (const { date, downloads } of days) {
    lifetime += downloads;
    if (date >= windowStart) monthly += downloads;
  }
  if (!isCount(lifetime) || monthly > lifetime) {
    throw new Error("download totals out of bounds");
  }
  return { lifetime, monthly };
}

// Registries report the current day while it is still filling up, so charts and
// snapshots stop at yesterday.
export function lastCompleteDay(now = new Date()) {
  return iso(new Date(now.getTime() - DAY));
}

// Sums the selected channels per calendar day and returns the last `days` days
// ending at the newest complete day, filling gaps with zero so the line has no
// holes.
export function dailySeries(series, channels, days, now = new Date()) {
  if (!Number.isSafeInteger(days) || days < 1) return [];
  const byDate = new Map();
  for (const channel of channels) {
    for (const { date, downloads } of series?.[channel] ?? []) {
      byDate.set(date, (byDate.get(date) ?? 0) + downloads);
    }
  }
  const lastComplete = lastCompleteDay(now);
  const dates = [...byDate.keys()].filter((date) => date <= lastComplete).sort();
  if (!dates.length) return [];
  const end = new Date(`${dates[dates.length - 1]}T00:00:00Z`);
  const out = [];
  for (let i = Math.min(days, MAX_DAYS) - 1; i >= 0; i -= 1) {
    const date = iso(new Date(end.getTime() - i * DAY));
    out.push({ date, value: byDate.get(date) ?? 0 });
  }
  return out;
}

// Parses a baked or cached day list, returning null when nothing is usable.
export function sanitizeDays(rows) {
  try {
    return toDays(rows);
  } catch {
    return null;
  }
}

// Parses a baked or cached snapshot ({ channels: { npm: {...} } }) and drops
// anything that is not a sane pair of counts. Daily history is optional so an
// older totals-only snapshot still paints the counters.
export function sanitizeStats(raw) {
  const channels = {};
  for (const channel of CHANNELS) {
    const counts = raw?.channels?.[channel];
    if (!isCount(counts?.lifetime) || !isCount(counts?.monthly)) continue;
    if (counts.monthly > counts.lifetime) continue;
    const next = { lifetime: counts.lifetime, monthly: counts.monthly };
    const days = sanitizeDays(counts.days);
    if (days) next.days = days;
    channels[channel] = next;
  }
  return Object.keys(channels).length ? { channels } : null;
}
