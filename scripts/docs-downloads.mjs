// Writes the build-time download snapshot that DownloadStats.vue shows while the
// live numbers load (or when a registry call fails in the browser).
import { writeFile, mkdir } from "node:fs/promises";
import {
  CHANNELS,
  channelDays,
  totals,
} from "../docs/.vitepress/downloads.mjs";

const KEEP_DAYS = 90; // the chart's longest period

const results = await Promise.allSettled(
  CHANNELS.map((channel) => channelDays(channel)),
);

const failed = results.filter((r) => r.status === "rejected");
if (failed.length) {
  for (const r of failed) console.warn(`docs-downloads: skipped ${r.reason}`);
  console.warn("docs-downloads: keeping the previous downloads.json");
} else {
  const stats = {
    updated: new Date().toISOString().slice(0, 10),
    lifetime: 0,
    monthly: 0,
    channels: {},
  };
  CHANNELS.forEach((channel, index) => {
    const days = results[index].value;
    const { lifetime, monthly } = totals(days);
    stats.channels[channel] = {
      lifetime,
      monthly,
      days: days.slice(-KEEP_DAYS),
    };
    stats.lifetime += lifetime;
    stats.monthly += monthly;
  });
  await mkdir("docs/public", { recursive: true });
  await writeFile("docs/public/downloads.json", `${JSON.stringify(stats, null, 2)}\n`);
  console.log(
    `docs-downloads: ${stats.lifetime} lifetime, ${stats.monthly} in the last 30 days`,
  );
}
