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

  it("sends iThink resource calls to the iThink API", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        status_code: 200,
        data: { AWB1: { awb_no: "AWB1", current_status: "In Transit" } },
      })
    );

    const sdk = new OpenLogistics({
      provider: "ithink",
      accessToken: "ithink-access-token",
      secretKey: "ithink-secret-key",
    });
    await sdk.tracking.byWaybill("AWB1");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toContain("/api_v3/order/track.json");
    const body = JSON.parse(String(init.body)) as {
      data: { access_token: string };
    };
    expect(body.data.access_token).toBe("ithink-access-token");
  });

  it("sends shadowfax resource calls to the Shadowfax API", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        message: "Success",
        order_details: { awb_number: "SF1", status: "ofd" },
        tracking_details: [],
      })
    );

    const sdk = new OpenLogistics({
      provider: "shadowfax",
      token: "shadowfax-token",
    });
    await sdk.tracking.byWaybill("SF1");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, init] = mockFetch.mock.calls[0];
    expect(String(url)).toContain("/v4/clients/orders/SF1/track/");
    expect(new Headers(init.headers).get("Authorization")).toBe(
      "Token shadowfax-token"
    );
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

  it("leaves iThink-only gaps undefined for iThink", () => {
    const sdk = new OpenLogistics({
      provider: "ithink",
      accessToken: "ithink-access-token",
      secretKey: "ithink-secret-key",
    });

    expect(sdk.courier).toBeUndefined();
    expect(sdk.waybills).toBeUndefined();
    expect(sdk.serviceability).toBeDefined();
  });

  it("exposes shadowfax tracking, rates, and waybills but no courier", () => {
    const sdk = new OpenLogistics({
      provider: "shadowfax",
      token: "shadowfax-token",
    });

    expect(sdk.courier).toBeUndefined();
    expect(sdk.tracking).toBeDefined();
    expect(sdk.rates).toBeDefined();
    expect(sdk.waybills).toBeDefined();
    expect(sdk.serviceability).toBeDefined();
  });
});
