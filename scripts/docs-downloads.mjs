// Sums daily downloads for the published packages across npm, PyPI and crates.io.
// Runs at docs build time so the page does not depend on registry CORS headers.
import { writeFile, mkdir } from "node:fs/promises";

const PACKAGES = {
  npm: "open-logistics",
  pypi: "open-logistics-sdk",
  crates: "open-logistics",
};

const iso = (date) => date.toISOString().slice(0, 10);
const today = iso(new Date());
// 30 calendar dates including today: today and the 29 days before it.
const windowStart = iso(new Date(Date.now() - 29 * 864e5));

const headers = { "User-Agent": "open-logistics-docs" };

async function getJSON(url) {
  const res = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

function totals(days) {
  let lifetime = 0;
  let monthly = 0;
  for (const { date, downloads } of days) {
    lifetime += downloads;
    if (date >= windowStart) monthly += downloads;
  }
  return { lifetime, monthly };
}

const sources = {
  npm: async () => {
    // npm caps each stats request at 18 months, so walk from first publish in 500-day chunks.
    const meta = await getJSON(`https://registry.npmjs.org/${PACKAGES.npm}`);
    const days = [];
    const end = new Date(`${today}T00:00:00Z`);
    const created = meta.time.created.slice(0, 10);
    for (let start = new Date(`${created}T00:00:00Z`); start <= end; ) {
      const stop = new Date(
        Math.min(start.getTime() + 499 * 864e5, end.getTime()),
      );
      const data = await getJSON(
        `https://api.npmjs.org/downloads/range/${iso(start)}:${iso(stop)}/${PACKAGES.npm}`,
      );
      days.push(
        ...data.downloads.map((d) => ({ date: d.day, downloads: d.downloads })),
      );
      start = new Date(stop.getTime() + 864e5);
    }
    return days;
  },
  pypi: async () => {
    const data = await getJSON(
      `https://pypistats.org/api/packages/${PACKAGES.pypi}/overall?mirrors=false`,
    );
    return data.data;
  },
  crates: async () => {
    const data = await getJSON(
      `https://crates.io/api/v1/crates/${PACKAGES.crates}/downloads`,
    );
    return data.version_downloads;
  },
};

const results = await Promise.allSettled(
  Object.entries(sources).map(async ([channel, load]) => [
    channel,
    totals(await load()),
  ]),
);

const failed = results.filter((r) => r.status === "rejected");
if (failed.length) {
  for (const r of failed) console.warn(`docs-downloads: skipped ${r.reason}`);
  console.warn("docs-downloads: keeping the previous downloads.json");
} else {
  const stats = { updated: today, lifetime: 0, monthly: 0, channels: {} };
  for (const [channel, { lifetime, monthly }] of results.map((r) => r.value)) {
    stats.channels[channel] = { lifetime, monthly };
    stats.lifetime += lifetime;
    stats.monthly += monthly;
  }
  if (stats.lifetime < stats.monthly) {
    throw new Error("lifetime total is smaller than the 30-day total");
  }
  await mkdir("docs/public", { recursive: true });
  await writeFile("docs/public/downloads.json", `${JSON.stringify(stats, null, 2)}\n`);
  console.log(
    `docs-downloads: ${stats.lifetime} lifetime, ${stats.monthly} in the last 30 days`,
  );
}
