import { afterEach, describe, expect, it, vi } from "vitest";
import {
  channelDays,
  dailySeries,
  lastCompleteDay,
  sanitizeDays,
  sanitizeStats,
  totals,
} from "../docs/.vitepress/downloads.mjs";

const now = new Date("2026-11-13T00:00:00Z");

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("download stats", () => {
  it("counts only the last 30 calendar days as monthly", () => {
    const days = [
      { date: "2026-10-14", downloads: 5 },
      { date: "2026-10-15", downloads: 7 },
      { date: "2026-11-13", downloads: 3 },
    ];
    expect(totals(days, now)).toEqual({ lifetime: 15, monthly: 10 });
  });

  it("rejects daily rows that are not sane counts", async () => {
    vi.stubGlobal("fetch", async () =>
      new Response(
        JSON.stringify({
          data: [
            { date: "2026-11-01", downloads: 10 },
            { date: "not-a-date", downloads: 5 },
            { date: "2026-11-02", downloads: -1 },
            { date: "2026-11-02", downloads: 2.5 },
            { date: "2026-11-03", downloads: 2 },
          ],
        }),
      ),
    );
    expect(totals(await channelDays("pypi", { now }), now)).toEqual({
      lifetime: 12,
      monthly: 12,
    });
  });

  it("falls back when a response has no usable rows", async () => {
    vi.stubGlobal("fetch", async () =>
      new Response(JSON.stringify({ error: "not found" })),
    );
    await expect(channelDays("pypi", { now })).rejects.toThrow();
  });

  it("drops invalid channels from a baked or cached snapshot", () => {
    expect(
      sanitizeStats({
        channels: {
          npm: { lifetime: 100, monthly: 20 },
          pypi: { lifetime: 10, monthly: 20 },
          crates: { lifetime: "9", monthly: 1 },
        },
      }),
    ).toEqual({ channels: { npm: { lifetime: 100, monthly: 20 } } });
    expect(sanitizeStats({})).toBeNull();
  });
});

describe("daily series", () => {
  it("sums the selected channels and fills gap days with zero", () => {
    const series = {
      npm: [
        { date: "2026-11-01", downloads: 2 },
        { date: "2026-11-03", downloads: 5 },
      ],
      pypi: [{ date: "2026-11-02", downloads: 7 }],
    };
    expect(dailySeries(series, ["npm"], 3, now)).toEqual([
      { date: "2026-11-01", value: 2 },
      { date: "2026-11-02", value: 0 },
      { date: "2026-11-03", value: 5 },
    ]);
    expect(dailySeries(series, ["npm", "pypi"], 3, now)).toEqual([
      { date: "2026-11-01", value: 2 },
      { date: "2026-11-02", value: 7 },
      { date: "2026-11-03", value: 5 },
    ]);
  });

  it("counts back from the newest date and ignores older days", () => {
    const series = {
      crates: [
        { date: "2026-10-01", downloads: 9 },
        { date: "2026-11-01", downloads: 1 },
        { date: "2026-11-02", downloads: 2 },
      ],
    };
    expect(dailySeries(series, ["crates"], 2, now)).toEqual([
      { date: "2026-11-01", value: 1 },
      { date: "2026-11-02", value: 2 },
    ]);
  });

  it("ends on the last complete day, not today", () => {
    const series = {
      npm: [
        { date: "2026-11-11", downloads: 4 },
        { date: "2026-11-12", downloads: 6 },
        { date: "2026-11-13", downloads: 0 },
      ],
    };
    expect(dailySeries(series, ["npm"], 2, now)).toEqual([
      { date: "2026-11-11", value: 4 },
      { date: "2026-11-12", value: 6 },
    ]);
  });

  it("returns nothing without usable input", () => {
    expect(dailySeries({}, ["npm"], 7, now)).toEqual([]);
    expect(dailySeries({ npm: [] }, ["npm"], 7, now)).toEqual([]);
    expect(dailySeries({}, ["npm"], 0, now)).toEqual([]);
  });

  it("drops unusable baked days", () => {
    expect(
      sanitizeDays([
        { date: "2026-11-01", downloads: 2 },
        { date: "2026-11-02", downloads: -1 },
        { date: "nope", downloads: 3 },
      ]),
    ).toEqual([{ date: "2026-11-01", downloads: 2 }]);
    expect(sanitizeDays(null)).toBeNull();
  });
});

describe("baked history", () => {
  it("ends snapshots on the last complete day", () => {
    expect(lastCompleteDay(now)).toBe("2026-11-12");
  });

  it("keeps a full window of complete days for the 90D chart", () => {
    const day = (offset) =>
      new Date(now.getTime() - offset * 864e5).toISOString().slice(0, 10);
    // 91 rows ending today; today is incomplete, so the snapshot holds 90
    // complete days and the 90D view needs no zero fill at its oldest edge.
    const rows = Array.from({ length: 91 }, (_, index) => ({
      date: day(90 - index),
      downloads: 1,
    }));
    const baked = rows
      .filter((row) => row.date <= lastCompleteDay(now))
      .slice(-90);
    expect(baked).toHaveLength(90);

    const series = dailySeries({ npm: baked }, ["npm"], 90, now);
    expect(series).toHaveLength(90);
    expect(series[0]).toEqual({ date: day(90), value: 1 });
    expect(series.at(-1)).toEqual({ date: day(1), value: 1 });
  });
});
