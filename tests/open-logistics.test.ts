import { beforeEach, describe, expect, it, vi } from "vitest";
import { OpenLogistics } from "../src/index.js";

const mockFetch = vi.fn();
global.fetch = mockFetch as typeof fetch;

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    statusText: "OK",
    headers: new Headers({ "content-type": "application/json" }),
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response;
}

describe("OpenLogistics", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("sends delhivery resource calls to the Delhivery API", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ ShipmentData: [] }));

    const sdk = new OpenLogistics({
      provider: "delhivery",
      token: "delhivery-token",
      clientName: "Open Logistics",
    });
    await sdk.tracking.byWaybill("AWB1");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toContain("/api/v1/packages/json/");
    expect(new Headers(init.headers).get("Authorization")).toBe(
      "Token delhivery-token"
    );
  });

  it("sends shiprocket resource calls to the Shiprocket API", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ token: "shiprocket-token" }));
    mockFetch.mockResolvedValueOnce(jsonResponse({ data: [] }));

    const sdk = new OpenLogistics({
      provider: "shiprocket",
      email: "test@example.com",
      password: "password",
    });
    await sdk.orders.list();

    const urls = mockFetch.mock.calls.map(([url]) => String(url));
    expect(urls[0]).toContain("/auth/login");
    expect(urls[1]).toContain("/orders?page=1&per_page=20");
  });

  it("leaves resources the selected provider does not offer undefined", () => {
    const sdk = new OpenLogistics({
      provider: "delhivery",
      token: "delhivery-token",
      clientName: "Open Logistics",
    });

    expect(sdk.courier).toBeUndefined();
    expect(sdk.waybills).toBeDefined();
  });
});
