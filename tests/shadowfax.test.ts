import { beforeEach, describe, expect, it, vi } from "vitest";
import { ShadowfaxAPIError, ShadowfaxClient } from "../src/index.js";

const mockFetch = vi.fn();
global.fetch = mockFetch as typeof fetch;

const credentials = {
  token: "shadowfax-token",
};

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    statusText: ok ? "OK" : "Bad Request",
    headers: new Headers({ "content-type": "application/json" }),
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response;
}

const orderPayload = {
  customer_details: {
    name: "Rahul Sharma",
    contact: "9876543210",
    address_line_1: "42 MG Road, Koramangala",
    city: "BANGALORE",
    pincode: 560034,
    state: "Karnataka",
  },
  order_details: {
    client_order_id: "FWD-2026-001",
    product_value: 1299,
    payment_mode: "prepaid" as const,
    cod_amount: 0,
    order_service: "Regular",
  },
  pickup_details: {
    pickup_type: "seller" as const,
    name: "TechStore Pvt Ltd",
    contact: "9876543211",
    address_line_1: "15 Industrial Area Phase 2",
    city: "BANGALORE",
    pincode: 560058,
  },
  return_details: {
    return_type: "seller" as const,
    name: "TechStore Pvt Ltd",
    contact: "9876543211",
    address_line_1: "15 Industrial Area Phase 2",
    city: "BANGALORE",
    pincode: 560058,
  },
  product_details: [
    {
      sku_name: "Wireless Bluetooth Headphones",
      sku_id: "SKU-HEADPHONE-001",
      price: 1299,
      category: "Electronics",
    },
  ],
};

describe("ShadowfaxClient", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("rejects missing credentials at construction time", () => {
    expect(() => new ShadowfaxClient({ token: "" })).toThrow(
      "Shadowfax token is required",
    );
  });

  it("creates an order against the production base URL with a token header", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        message: "Success",
        data: {
          id: 123456,
          client_order_id: "FWD-2026-001",
          awb_number: "SF1234567890",
          status: "new",
          status_display: "New",
        },
        errors: null,
      }),
    );

    const client = new ShadowfaxClient(credentials);
    const result = await client.createOrder(orderPayload);

    expect(result.success).toBe(true);
    expect(result.awb_number).toBe("SF1234567890");
    expect(result.client_order_id).toBe("FWD-2026-001");
    expect(result.status_display).toBe("New");
    expect(result.errors).toBeNull();

    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://dale.shadowfax.in/api/v3/clients/orders/");
    const headers = new Headers(init.headers);
    expect(headers.get("Authorization")).toBe("Token shadowfax-token");
    expect(headers.get("Content-Type")).toBe("application/json");
    const body = JSON.parse(String(init.body)) as typeof orderPayload;
    expect(body.order_details.client_order_id).toBe("FWD-2026-001");
    expect(body.return_details.return_type).toBe("seller");
    expect(body.product_details[0].price).toBe(1299);
  });

  it("treats HTTP 200 with message Failure as a failed order", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        message: "Failure",
        errors: "Payment Mode is Required",
      }),
    );

    const client = new ShadowfaxClient(credentials);
    const result = await client.createOrder(orderPayload);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Failure");
    expect(result.errors).toBe("Payment Mode is Required");
    expect(result.awb_number).toBeNull();
  });

  it("throws a ShadowfaxAPIError on rejected requests", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ message: "Invalid AWB Number" }, false, 400),
    );

    const client = new ShadowfaxClient(credentials);
    await expect(client.trackByAwb("SF-BAD")).rejects.toMatchObject({
      name: "ShadowfaxAPIError",
      statusCode: 400,
      message: "Invalid AWB Number",
    });

    const error = new ShadowfaxAPIError("x", 400, { message: "x" });
    expect(error.name).toBe("ShadowfaxAPIError");
  });

  it("maps single tracking and sends the AWB in the path", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        message: "Success",
        order_details: {
          awb_number: "SF1234567890",
          client_order_id: "FWD-2026-001",
          status: "recd_at_fwd_hub",
          status_display: "Received At Forward Hub",
        },
        tracking_details: [
          {
            created: "2026-06-09T10:30:00Z",
            location: "BANGALORE HUB",
            status_id: "picked",
            status: "Picked Up",
            remarks: "Item picked up from seller",
            awb_number: "SF1234567890",
          },
        ],
      }),
    );

    const client = new ShadowfaxClient(credentials);
    const result = await client.trackByAwb("SF1234567890");

    expect(result.waybills).toEqual(["SF1234567890"]);
    expect(result.currentStatus).toBe("Received At Forward Hub");
    expect(result.statusCode).toBe("recd_at_fwd_hub");
    expect(result.scans).toHaveLength(1);
    expect(result.order_details?.client_order_id).toBe("FWD-2026-001");

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(
      "https://dale.shadowfax.in/api/v4/clients/orders/SF1234567890/track/",
    );
  });

  it("bulk tracks up to 50 orders in one POST", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        message: "Success",
        data: [
          {
            message: "Success",
            order_details: { awb_number: "SF1", status: "ofd" },
            tracking_details: [{ status: "Out For Delivery" }],
          },
          {
            message: "Success",
            order_details: { awb_number: "SF2", status: "delivered" },
            tracking_details: [],
          },
        ],
      }),
    );

    const client = new ShadowfaxClient(credentials);
    const result = await client.trackBulk(["SF1", "SF2"]);

    expect(result.results).toHaveLength(2);
    expect(result.results[0].statusCode).toBe("ofd");
    expect(result.results[1].awb_number).toBe("SF2");

    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://dale.shadowfax.in/api/v4/clients/bulk_track/");
    expect(JSON.parse(String(init.body))).toEqual({
      awb_numbers: ["SF1", "SF2"],
    });
  });

  it("checks serviceability with a comma separated pincode list", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse([
        { code: 560034, services: ["Marketplace", "Surface_Mkt"] },
        { code: 110005, services: ["Marketplace"] },
      ]),
    );

    const client = new ShadowfaxClient({
      token: "shadowfax-token",
      baseUrl: "https://dale.staging.shadowfax.in/api/",
    });
    const result = await client.checkServiceability({
      service: "seller_pickup",
      pincodes: ["560034", 110005],
    });

    expect(result.serviceable).toBe(true);
    expect(result.pincodes).toHaveLength(2);
    expect(result.pincodes[0].services).toContain("Surface_Mkt");

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    const parsed = new URL(url);
    expect(
      `${parsed.origin}${parsed.pathname}`,
    ).toBe("https://dale.staging.shadowfax.in/api/v1/clients/serviceability/");
    expect(parsed.searchParams.get("service")).toBe("seller_pickup");
    expect(parsed.searchParams.get("pincodes")).toBe("560034,110005");
  });

  it("reports no serviceability when the pincode list is empty", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse([]));

    const client = new ShadowfaxClient(credentials);
    const result = await client.checkServiceability({
      service: "marketplace",
      pincodes: 560034,
    });

    expect(result.serviceable).toBe(false);
    expect(result.pincodes).toEqual([]);
  });

  it("omits the pincodes parameter when given an empty array", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse([]));

    const client = new ShadowfaxClient(credentials);
    await client.checkServiceability({ service: "marketplace", pincodes: [] });

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(new URL(url).searchParams.has("pincodes")).toBe(false);
  });

  it("calculates rates and totals the pre-GST amount with GST", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        message: "Success",
        zone: "E",
        shipping_rate: "69.00",
        gst: "12.42",
      }),
    );

    const client = new ShadowfaxClient(credentials);
    const rate = await client.calculateRate({
      origin_pincode: 560001,
      destination_pincode: 110001,
      service: "forward",
      weight: 1.5,
    });

    expect(rate.success).toBe(true);
    expect(rate.zone).toBe("E");
    expect(rate.shippingRate).toBe(69);
    expect(rate.taxAmount).toBe(12.42);
    expect(rate.totalAmount).toBeCloseTo(81.42);

    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://dale.shadowfax.in/api/v1/clients/rate_calculator/");
    expect(JSON.parse(String(init.body))).toEqual({
      origin_pincode: 560001,
      destination_pincode: 110001,
      service: "forward",
      weight: 1.5,
    });
  });

  it("marks a rate as unavailable when the API returns null amounts", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        message: "Rate not available for this origin and destination",
        zone: null,
        shipping_rate: null,
        gst: null,
      }),
    );

    const client = new ShadowfaxClient(credentials);
    const rate = await client.calculateRate({
      origin_pincode: 560001,
      destination_pincode: 999999,
      service: "forward",
    });

    expect(rate.success).toBe(false);
    expect(rate.totalAmount).toBeNull();
    expect(rate.zone).toBeNull();
  });

  it("generates a label and fetches POD details", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        message: "Success",
        data: {
          label_url:
            "https://bucket.storage.googleapis.com/clients/labels/store/SF1_labels.pdf",
        },
      }),
    );
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        message: "Success",
        pod_details: {
          SF1: {
            recipient: "Customer",
            recipient_name: "Rahul Sharma",
            recipient_signature: [],
          },
          SF2: {},
        },
      }),
    );

    const client = new ShadowfaxClient(credentials);
    const label = await client.generateLabel("SF1", "prn");
    const pod = await client.fetchPod(["SF1", "SF2"]);

    expect(label.labelUrl).toContain("SF1_labels.pdf");
    expect(label.awb_number).toBe("SF1");
    expect(pod.pod_details.SF1.recipient_name).toBe("Rahul Sharma");
    expect(pod.pod_details.SF2).toEqual({});

    const [labelUrl, labelInit] = mockFetch.mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(labelUrl).toBe(
      "https://dale.shadowfax.in/api/client/generate_label/",
    );
    expect(JSON.parse(String(labelInit.body))).toEqual({
      awb_number: "SF1",
      file_type: "prn",
    });

    const [podUrl, podInit] = mockFetch.mock.calls[1] as [string, RequestInit];
    expect(podUrl).toBe("https://dale.shadowfax.in/api/v1/clients/pod_details/");
    expect(JSON.parse(String(podInit.body))).toEqual({
      awb_numbers: ["SF1", "SF2"],
    });
  });

  it("cancels and updates orders through the v3 endpoints", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        responseMsg: "Request has been marked as cancelled",
        responseCode: 200,
      }),
    );
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ message: "Request accepted." }),
    );

    const client = new ShadowfaxClient(credentials);
    const cancel = await client.cancelOrder("SF1", "Customer requested");
    const update = await client.updateOrder({
      awb_number: "SF1",
      delivery_details: { contact: "9999888877" },
    });

    expect(cancel.success).toBe(true);
    expect(cancel.message).toBe("Request has been marked as cancelled");
    expect(cancel.request_id).toBe("SF1");
    expect(update.success).toBe(true);
    expect(update.message).toBe("Request accepted.");

    const [cancelUrl, cancelInit] = mockFetch.mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(cancelUrl).toBe(
      "https://dale.shadowfax.in/api/v3/clients/orders/cancel/",
    );
    expect(JSON.parse(String(cancelInit.body))).toEqual({
      request_id: "SF1",
      cancel_remarks: "Customer requested",
    });

    const [updateUrl] = mockFetch.mock.calls[1] as [string, RequestInit];
    expect(updateUrl).toBe(
      "https://dale.shadowfax.in/api/v3/clients/order_update/",
    );
  });

  it("supports pooled, fresh, and polled AWB generation", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        message: "Success",
        awb_numbers: ["SF10000001", "SF10000002"],
      }),
    );
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        status: "SUCCESS",
        request_id: 1,
        message: "Request created successfully",
        delay_time: 120,
      }),
    );
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        awb_numbers: ["SF10000003"],
        status: "SUCCESS",
        retry_flag: false,
      }),
    );

    const client = new ShadowfaxClient(credentials);
    const pool = await client.generateAwbs({ count: 2 });
    const request = await client.requestAwbs({
      awb_count: 1,
      request_type: "fwd",
    });
    const poll = await client.pollAwbs(1);

    expect(pool.awb_numbers).toEqual(["SF10000001", "SF10000002"]);
    expect(request.request_id).toBe(1);
    expect(request.delay_time).toBe(120);
    expect(poll.awb_numbers).toEqual(["SF10000003"]);
    expect(poll.retry_flag).toBe(false);

    const [poolUrl] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(poolUrl).toBe(
      "https://dale.shadowfax.in/api/v3/clients/generate_marketplace_awb/",
    );
    const [pollUrl] = mockFetch.mock.calls[2] as [string, RequestInit];
    expect(pollUrl).toBe("https://dale.shadowfax.in/api/v1/clients/awb/1/");
  });

  it("throws a ShadowfaxAPIError for auth failures with a plain text body", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      headers: new Headers({ "content-type": "text/plain" }),
      text: async () => "Authentication credentials were not provided.",
      json: async () => ({}),
    } as Response);

    const client = new ShadowfaxClient(credentials);
    await expect(client.trackByAwb("SF1")).rejects.toMatchObject({
      name: "ShadowfaxAPIError",
      statusCode: 401,
      message: "Authentication credentials were not provided.",
    });
  });
});
