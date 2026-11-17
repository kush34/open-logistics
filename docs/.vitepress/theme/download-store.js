// One load per page for both the counters and the chart: they share the session
// cache, the baked snapshot, and the pending registry requests, so a visit
// costs at most one call per registry.
import { ref } from "vue";
import {
  CHANNELS,
  channelDays,
  lastCompleteDay,
  sanitizeStats,
  totals,
} from "../downloads.mjs";

const CACHE_KEY = "open-logistics:downloads";
const CACHE_TTL = 60 * 60 * 1000; // registries publish daily; an hour is plenty
const KEEP_DAYS = 90; // the chart's longest period
// pypistats.org has no CORS headers, so PyPI goes through the Vercel function.
const PYPI_URL = "/api/pypi-downloads";

// { channels: { npm: { lifetime, monthly, days } } }
export const downloads = ref(null);

let started = false;

function readCache() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if (Date.now() - cached.at > CACHE_TTL) return null;
    return sanitizeStats(cached);
  } catch {
    return null;
  }
}

function writeCache(channels) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), channels }));
  } catch {
    // Storage can be unavailable (private mode, quota); the page still works.
  }
}

async function loadBaked() {
  try {
    const res = await fetch("/downloads.json");
    return res.ok ? sanitizeStats(await res.json()) : null;
  } catch {
    return null;
  }
}

async function run() {
  const cached = readCache();
  downloads.value = cached ?? (await loadBaked());

  // An older totals-only cache still paints the counters; the live pass below
  // fills in the daily history.
  if (cached && CHANNELS.every((channel) => cached.channels[channel]?.days)) {
    return;
  }

  const lastComplete = lastCompleteDay();
  const live = await Promise.allSettled(
    CHANNELS.map((channel) => channelDays(channel, { pypiUrl: PYPI_URL })),
  );
  const merged = { ...downloads.value?.channels };
  let fresh = 0;
  live.forEach((result, index) => {
    if (result.status !== "fulfilled") return;
    const days = result.value.filter((day) => day.date <= lastComplete);
    merged[CHANNELS[index]] = {
      ...totals(result.value),
      days: days.slice(-KEEP_DAYS),
    };
    fresh += 1;
  });

  // Every source failed: keep the baked snapshot (or the placeholders) and do
  // not cache, so the next visit tries again.
  if (!fresh) return;
  downloads.value = { channels: merged };
  writeCache(merged);
}

export function loadDownloads() {
  if (!started) {
    started = true;
    run();
  }
  return downloads;
}
