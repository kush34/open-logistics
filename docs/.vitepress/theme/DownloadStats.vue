<script setup>
import { computed, onMounted } from "vue";
import { CHANNELS } from "../downloads.mjs";
import { downloads, loadDownloads } from "./download-store.js";

const channelLabels = { npm: "npm", pypi: "PyPI", crates: "crates.io" };

// Rendered even while empty so the hero never shifts when numbers arrive.
const channels = computed(() => downloads.value?.channels ?? null);

const rows = computed(() =>
  CHANNELS.map((channel) => [channel, channels.value?.[channel] ?? null]),
);

const total = computed(() => {
  const counts = Object.values(channels.value ?? {});
  if (!counts.length) return {};
  return {
    lifetime: counts.reduce((sum, c) => sum + c.lifetime, 0),
    monthly: counts.reduce((sum, c) => sum + c.monthly, 0),
  };
});

const format = (n) =>
  Number.isSafeInteger(n) ? n.toLocaleString("en-US") : "—";

onMounted(loadDownloads);
</script>

<template>
  <div class="download-stats">
    <div class="download-stats-row">
      <div class="download-stat">
        <span class="download-stat-value">{{ format(total.lifetime) }}</span>
        <span class="download-stat-label">lifetime downloads</span>
      </div>
      <div class="download-stat">
        <span class="download-stat-value">{{ format(total.monthly) }}</span>
        <span class="download-stat-label">downloads in the last 30 days</span>
      </div>
    </div>
    <table class="download-stats-table">
      <thead>
        <tr>
          <th>Channel</th>
          <th>Lifetime</th>
          <th>Last 30 days</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[channel, counts] in rows" :key="channel">
          <td>{{ channelLabels[channel] }}</td>
          <td>{{ format(counts?.lifetime) }}</td>
          <td>{{ format(counts?.monthly) }}</td>
        </tr>
      </tbody>
    </table>
    <p class="download-stats-note">npm, PyPI, and crates.io combined</p>
  </div>
</template>

<style scoped>
.download-stats {
  margin: 4rem 0 2rem;
  text-align: center;
}

.download-stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 4rem;
  justify-content: center;
}

.download-stat-value {
  display: block;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-text-1);
}

.download-stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.download-stats-note {
  margin: 1rem 0 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.download-stats-table {
  margin: 2rem auto 0;
  border-collapse: collapse;
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
}

.download-stats-table th,
.download-stats-table td {
  padding: 0.4rem 1.25rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.download-stats-table th {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.download-stats-table td {
  color: var(--vp-c-text-2);
}

.download-stats-table td:first-child {
  text-align: left;
  color: var(--vp-c-text-1);
}
</style>
