<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { CHANNELS, dailySeries } from "../downloads.mjs";
import { downloads, loadDownloads } from "./download-store.js";

const PERIODS = [7, 30, 90];
const channelLabels = {
  all: "all registries",
  npm: "npm",
  pypi: "PyPI",
  crates: "crates.io",
};
const filters = ["all", ...CHANNELS];

// Inline SVG geometry in viewBox units, measured from the column so the axis
// text keeps its size when the page narrows.
const plot = ref(null);
const size = ref({ w: 720, h: 260 });

const layout = computed(() => {
  const { w, h } = size.value;
  const pad = { top: 16, right: 12, bottom: 26, left: w < 520 ? 34 : 44 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  return { w, h, pad, innerW, innerH, baseline: pad.top + innerH };
});

const series = computed(() => {
  const days = {};
  for (const [channel, counts] of Object.entries(downloads.value?.channels ?? {})) {
    days[channel] = counts.days ?? [];
  }
  return days;
});
const period = ref(30);
const filter = ref("all");
const hover = ref(null);

// A resize moves every point; a stale crosshair would sit in the wrong place.
watch(size, () => {
  hover.value = null;
});

const days = computed(() =>
  dailySeries(
    series.value,
    filter.value === "all" ? CHANNELS : [filter.value],
    period.value,
  ),
);

const total = computed(() =>
  days.value.reduce((sum, day) => sum + day.value, 0),
);

// Four gridlines above zero, on a 1, 2 or 5 step that keeps the labels whole.
const scale = computed(() => {
  const rough = Math.max(4, ...days.value.map((day) => day.value)) / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const power = rough / magnitude;
  const step = (power <= 1 ? 1 : power <= 2 ? 2 : power <= 5 ? 5 : 10) * magnitude;
  return { step, top: step * 4 };
});

const points = computed(() => {
  const { top } = scale.value;
  const { pad, innerW, innerH } = layout.value;
  const count = days.value.length;
  return days.value.map((day, index) => ({
    ...day,
    x:
      count > 1
        ? pad.left + (index / (count - 1)) * innerW
        : pad.left + innerW / 2,
    y: pad.top + innerH - (day.value / top) * innerH,
  }));
});

const linePath = computed(() =>
  points.value
    .map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(" "),
);

const areaPath = computed(() => {
  const shape = points.value;
  if (!shape.length) return "";
  const { baseline } = layout.value;
  const first = shape[0];
  const last = shape[shape.length - 1];
  return `${linePath.value} L${last.x.toFixed(1)},${baseline} L${first.x.toFixed(1)},${baseline} Z`;
});

const gridlines = computed(() =>
  [0, 1, 2, 3, 4].map((index) => ({
    value: index * scale.value.step,
    y: layout.value.pad.top + layout.value.innerH - (index / 4) * layout.value.innerH,
  })),
);

// First, middle and last date only, so the axis stays quiet.
const xLabels = computed(() => {
  const shape = points.value;
  if (!shape.length) return [];
  const last = shape.length - 1;
  return [...new Set([0, Math.floor(last / 2), last])].map((index) => ({
    date: shape[index].date,
    x: shape[index].x,
    anchor: index === 0 ? "start" : index === last ? "end" : "middle",
  }));
});

const summary = computed(
  () =>
    `Downloads per day for ${channelLabels[filter.value]} over the last ${period.value} days`,
);

const tipLeft = computed(() =>
  hover.value
    ? Math.min(92, Math.max(8, (hover.value.x / layout.value.w) * 100))
    : 0,
);

const format = (n) => n.toLocaleString("en-US");
const shortDate = (date) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
const longDate = (date) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

function onPointerMove(event) {
  const count = points.value.length;
  if (!count) return;
  const { w, pad, innerW } = layout.value;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * w;
  const index = Math.round(((x - pad.left) / innerW) * (count - 1));
  hover.value = points.value[Math.max(0, Math.min(count - 1, index))];
}

onMounted(() => {
  if (plot.value) {
    const observer = new ResizeObserver(([entry]) => {
      const w = Math.max(280, Math.round(entry.contentRect.width));
      size.value = { w, h: w < 520 ? 200 : 260 };
    });
    observer.observe(plot.value);
    onUnmounted(() => observer.disconnect());
  }

  loadDownloads();
});
</script>

<template>
  <div class="download-chart">
    <div class="dl-chart-head">
      <p class="dl-chart-title">Downloads per day</p>
      <div class="dl-tabs" role="group" aria-label="Period">
        <button
          v-for="option in PERIODS"
          :key="option"
          type="button"
          :aria-pressed="period === option"
          @click="period = option; hover = null"
        >
          {{ option }}D
        </button>
      </div>
    </div>

    <div class="dl-tabs dl-tabs-filters" role="group" aria-label="Registry">
      <button
        v-for="option in filters"
        :key="option"
        type="button"
        :aria-pressed="filter === option"
        @click="filter = option; hover = null"
      >
        {{ option === "all" ? "All" : channelLabels[option] }}
      </button>
    </div>

    <div
      ref="plot"
      class="dl-chart-plot"
      @pointermove="onPointerMove"
      @pointerleave="hover = null"
    >
      <svg :viewBox="`0 0 ${layout.w} ${layout.h}`" role="img" :aria-label="summary">
        <defs>
          <linearGradient id="dl-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="currentColor" stop-opacity="0.16" />
            <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g class="dl-chart-grid">
          <line
            v-for="line in gridlines"
            :key="line.value"
            :x1="layout.pad.left"
            :x2="layout.w - layout.pad.right"
            :y1="line.y"
            :y2="line.y"
          />
        </g>
        <g class="dl-chart-y">
          <text
            v-for="line in gridlines"
            :key="line.value"
            :x="layout.pad.left - 10"
            :y="line.y"
            text-anchor="end"
            dominant-baseline="middle"
          >
            {{ format(line.value) }}
          </text>
        </g>

        <path v-if="areaPath" class="dl-chart-area" :d="areaPath" fill="url(#dl-chart-fill)" />
        <path v-if="linePath" class="dl-chart-line" :d="linePath" />

        <g class="dl-chart-x">
          <text
            v-for="label in xLabels"
            :key="label.date"
            :x="label.x"
            :y="layout.h - 6"
            :text-anchor="label.anchor"
          >
            {{ shortDate(label.date) }}
          </text>
        </g>

        <line
          v-if="hover"
          class="dl-chart-cursor"
          :x1="hover.x"
          :x2="hover.x"
          :y1="layout.pad.top"
          :y2="layout.baseline"
        />
        <circle v-if="hover" class="dl-chart-dot" :cx="hover.x" :cy="hover.y" r="4" />
      </svg>

      <div v-if="hover" class="dl-chart-tip" :style="{ left: `${tipLeft}%` }">
        <strong>{{ format(hover.value) }}</strong>
        <span>{{ longDate(hover.date) }}</span>
      </div>
    </div>

    <p v-if="days.length" class="dl-chart-caption">
      {{ format(total) }} downloads in the last {{ period }} days ·
      {{ channelLabels[filter] }}
    </p>
    <p v-else-if="downloads" class="dl-chart-caption">
      Download history is unavailable right now.
    </p>
  </div>
</template>

<style scoped>
.download-chart {
  margin: 1rem auto 4rem;
  max-width: 720px;
  text-align: left;
}

.dl-chart-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.dl-chart-title {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.dl-tabs {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
}

.dl-tabs-filters {
  margin-top: 0.75rem;
}

.dl-tabs button {
  border: 0;
  border-radius: 6px;
  padding: 0.2rem 0.6rem;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  background: transparent;
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s;
}

.dl-tabs button:hover {
  color: var(--vp-c-text-1);
}

.dl-tabs button[aria-pressed="true"] {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-elv);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.dl-chart-plot {
  position: relative;
  margin-top: 1rem;
  color: var(--vp-c-text-1);
}

.dl-chart-plot svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.dl-chart-grid line {
  stroke: var(--vp-c-divider);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.dl-chart-y text,
.dl-chart-x text {
  fill: var(--vp-c-text-3);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}

.dl-chart-area {
  pointer-events: none;
}

.dl-chart-line {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}

.dl-chart-cursor {
  stroke: currentColor;
  stroke-opacity: 0.25;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.dl-chart-dot {
  fill: currentColor;
  stroke: var(--vp-c-bg);
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}

.dl-chart-tip {
  position: absolute;
  top: 4px;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-elv);
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  pointer-events: none;
  transform: translateX(-50%);
}

.dl-chart-tip strong {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.dl-chart-tip span {
  color: var(--vp-c-text-3);
}

.dl-chart-caption {
  margin: 0.75rem 0 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}
</style>
