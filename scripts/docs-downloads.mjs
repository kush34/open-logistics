// Sums daily downloads for the published packages across npm, PyPI and crates.io.
// Runs at docs build time so the page does not depend on registry CORS headers.
import { writeFile, mkdir } from "node:fs/promises";

const PACKAGES = {
  npm: "open-logistics",
  pypi: "open-logistics-sdk",
  crates: "open-logistics",
};

const today = new Date().toISOString().slice(0, 10);
const monthStart = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);

const headers = { "User-Agent": "open-logistics-docs" };

async function getJSON(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

function totals(days) {
  let lifetime = 0;
  let monthly = 0;
  for (const { date, downloads } of days) {
    lifetime += downloads;
    if (date >= monthStart) monthly += downloads;
  }
  return { lifetime, monthly };
}

const sources = {
  // shortcut: npm's range API caps at 18 months. The package is younger, so this is lifetime for now.
  npm: async () => {
    const data = await getJSON(
      `https://api.npmjs.org/downloads/range/2020-01-01:${today}/${PACKAGES.npm}`,
    );
    return data.downloads.map((d) => ({ date: d.day, downloads: d.downloads }));
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
