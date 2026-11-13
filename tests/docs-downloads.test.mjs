import { afterEach, describe, expect, it, vi } from "vitest";
import {
  channelStats,
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
    expect(await channelStats("pypi", { now })).toEqual({
      lifetime: 12,
      monthly: 12,
    });
  });

  it("falls back when a response has no usable rows", async () => {
    vi.stubGlobal("fetch", async () =>
      new Response(JSON.stringify({ error: "not found" })),
    );
    await expect(channelStats("pypi", { now })).rejects.toThrow();
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
