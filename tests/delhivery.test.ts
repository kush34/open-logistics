import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  DelhiveryAPIError,
  DelhiveryClient,
} from "../src/index.js";

const mockFetch = vi.fn();
global.fetch = mockFetch as typeof fetch;

const credentials = {
  token: "delhivery-token",
  clientName: "Open Logistics",
};

function jsonResponse(
  body: unknown,
  ok = true,
  status = 200
): Response {
  return {
    ok,
    status,
    statusText: ok ? "OK" : "Bad Request",
    headers: new Headers({ "content-type": "application/json" }),
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response;
}

describe("DelhiveryClient", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("rejects missing credentials at construction time", () => {
    expect(() => new DelhiveryClient({ token: "", clientName: "x" })).toThrow(
      "Delhivery token is required"
    );
    expect(() => new DelhiveryClient({ token: "x", clientName: "" })).toThrow(
      "Delhivery clientName is required"
    );
  });

  it("creates an order with the expected auth header and payload wrapper", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        success: true,
        order_id: "ORD-1001",
        waybill: "WB-123",
        status: "Manifested",
        shipment_id: "S-1",
      })
    );

    const client = new DelhiveryClient(credentials);
    const result = await client.createOrder({
      order_id: "ORD-1001",
      pickup_location: { name: "Primary Warehouse" },
      package_type: "Pre-paid",
      name: "John Doe",
      add: "123 Example St",
      phone: "9999999999",
      pin: "400001",
      city: "Mumbai",
      state: "MH",
      country: "IN",
      products_desc: "Shoes",
      shipment_length: 10,
      shipment_width: 10,
      shipment_height: 10,
      weight: 500,
    });

    expect(result.waybill).toBe("WB-123");
    expect(result.order_id).toBe("ORD-1001");
    expect(mockFetch).toHaveBeenCalledTimes(1);

    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("https://staging-express.delhivery.com/api/cmu/create.json");
    const headers = new Headers(init.headers);
    expect(headers.get("Authorization")).toBe("Token delhivery-token");
    expect(headers.get("Content-Type")).toBe(
      "application/x-www-form-urlencoded;charset=UTF-8"
    );
    const body = new URLSearchParams(String(init.body));
    expect(body.get("format")).toBe("json");
    const shipments = JSON.parse(body.get("data") ?? "{}") as {
      shipments: Array<{ pickup_location: { name: string } }>;
    };
    expect(shipments.shipments[0].pickup_location.name).toBe("Primary Warehouse");
  });

  it("throws a provider error on failed order creation", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse(
        { message: "Validation failed", errors: { pin: ["invalid"] } },
        false,
        422
      )
    );

    const client = new DelhiveryClient(credentials);
    await expect(
      client.createOrder({
        order_id: "ORD-1002",
        pickup_location: { name: "Primary Warehouse" },
        package_type: "COD",
        name: "John Doe",
        add: "123 Example St",
        phone: "9999999999",
        pin: "400001",
      })
    ).rejects.toMatchObject({
      name: "DelhiveryAPIError",
      statusCode: 422,
      message: "Validation failed",
    });
  });

  it("maps tracking responses and forwards the waybill in the query string", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        tracking_data: {
          waybill: "WB-TRACK-1",
          status: "In Transit",
          status_code: "IT",
          scans: [
            {
              scan_date: "2026-08-10",
              status: "Manifested",
              location: "Delhi",
            },
          ],
        },
      })
    );

    const client = new DelhiveryClient(credentials);
    const result = await client.trackByWaybill("WB-TRACK-1");

    expect(result.waybills).toEqual(["WB-TRACK-1"]);
    expect(result.currentStatus).toBe("In Transit");
    expect(result.scans).toHaveLength(1);

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(new URL(url).searchParams.get("waybill")).toBe("WB-TRACK-1");
  });

  it("maps serviceability and rate responses", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        delivery_codes: [
          {
            postal_code: {
              city: "Mumbai",
              pin: 400001,
              pre_paid: "Y",
              cod: "N",
              pickup: "N",
              remarks: "",
            },
          },
        ],
      })
    );

    const client = new DelhiveryClient(credentials);
    const serviceability = await client.checkServiceability({ filter_codes: 400001 });

    expect(serviceability.serviceable).toBe(true);
    expect(serviceability.prepaid).toBe(true);
    expect(serviceability.cod).toBe(false);

    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        total_amount: 123.45,
        gross_amount: 100,
        tax_amount: 23.45,
      })
    );

    const rate = await client.calculateRate({
      md: "S",
      cgm: 500,
      o_pin: 110017,
      d_pin: 400001,
      ss: "Delivered",
      pt: "Pre-paid",
    });

    expect(rate.totalAmount).toBe(123.45);
    expect(rate.grossAmount).toBe(100);
    expect(rate.taxAmount).toBe(23.45);

    const [rateUrl] = mockFetch.mock.calls[1] as [string, RequestInit];
    const query = new URL(rateUrl).searchParams;
    expect(query.get("md")).toBe("S");
    expect(query.get("pt")).toBe("Pre-paid");
  });

  it("supports label generation and pickup requests", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        waybill: "WB-55",
        pdf_url: "https://example.test/label.pdf",
        packages_found: 1,
        packages: [{ waybill: "WB-55" }],
      })
    );
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        pickup_id: "PICKUP-1",
        message: "Created",
      }, true, 201)
    );

    const client = new DelhiveryClient(credentials);
    const label = await client.generateLabel("WB-55", true);
    const pickup = await client.createPickupRequest({
      pickup_time: "10:00:00",
      pickup_date: "2026-08-10",
      pickup_location: "Primary Warehouse",
      expected_package_count: 3,
    });

    expect(label.pdfUrl).toBe("https://example.test/label.pdf");
    expect(label.packagesFound).toBe(1);
    expect(pickup.pickup_id).toBe("PICKUP-1");

    const [labelUrl] = mockFetch.mock.calls[0] as [string, RequestInit];
    const labelQuery = new URL(labelUrl).searchParams;
    expect(labelQuery.get("wbns")).toBe("WB-55");
    expect(labelQuery.get("pdf")).toBe("True");
  });

  it("cancels and updates shipments through the edit endpoint", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ success: true, message: "Updated", waybill: "WB-1" })
    );
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ success: true, message: "Cancelled", waybill: "WB-1" })
    );

    const client = new DelhiveryClient(credentials);
    const update = await client.updateOrder({
      waybill: "WB-1",
      name: "Jane Doe",
      add: "Updated Address",
      phone: "8888888888",
      gm: 750,
    });
    const cancel = await client.cancelOrder("WB-1");

    expect(update.success).toBe(true);
    expect(cancel.waybill).toBe("WB-1");
  });

  it("creates waybill requests with client name and token query params", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ waybill: "WB-NEW-1" })
    );

    const client = new DelhiveryClient(credentials);
    const result = await client.fetchWaybill();

    expect(result.waybill).toBe("WB-NEW-1");

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    const query = new URL(url).searchParams;
    expect(query.get("client_name")).toBe("Open Logistics");
    expect(query.get("cl")).toBe("Open Logistics");
    expect(query.get("token")).toBe("delhivery-token");
  });

  it("throws a DelhiveryAPIError for malformed API responses", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      headers: new Headers({ "content-type": "text/plain" }),
      text: async () => "Authentication credentials were not provided",
      json: async () => ({ message: "Authentication credentials were not provided" }),
    } as Response);

    const client = new DelhiveryClient(credentials);
    await expect(
      client.request("GET", "/api/v1/packages/json/", {
        query: { waybill: "WB-FAIL" },
      })
    ).rejects.toMatchObject({
      name: "DelhiveryAPIError",
      statusCode: 401,
      message: "Authentication credentials were not provided",
    });
  });
});
