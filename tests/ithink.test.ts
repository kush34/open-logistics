import { beforeEach, describe, expect, it, vi } from "vitest";
import { IthinkAPIError, Ithink, IthinkClient } from "../src/index.js";

const mockFetch = vi.fn();
global.fetch = mockFetch as typeof fetch;

const credentials = {
  accessToken: "ithink-access-token",
  secretKey: "ithink-secret-key",
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

function requestBody(call: unknown): { data: Record<string, unknown> } {
  const [, init] = call as [string, RequestInit];
  return JSON.parse(String(init.body)) as { data: Record<string, unknown> };
}

const shipment = {
  order: "ORD-1001",
  order_date: "2026-08-10",
  total_amount: 999,
  name: "John Doe",
  add: "123 Example St",
  pin: "400001",
  city: "Mumbai",
  state: "MH",
  country: "India",
  phone: "9999999999",
  billing_name: "John Doe",
  billing_add: "123 Example St",
  billing_pin: "400001",
  billing_phone: "9999999999",
  products: [
    {
      product_name: "Shoes",
      product_quantity: 1,
      product_price: 999,
    },
  ],
  shipment_length: 10,
  shipment_width: 10,
  shipment_height: 5,
  weight: 0.5,
  return_address_id: 24,
};

describe("IthinkClient", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("rejects missing credentials at construction time", () => {
    expect(() => new IthinkClient({ accessToken: "", secretKey: "x" })).toThrow(
      "iThink accessToken is required",
    );
    expect(() => new IthinkClient({ accessToken: "x", secretKey: "" })).toThrow(
      "iThink secretKey is required",
    );
  });

  it("creates an order with credentials inside the JSON data wrapper", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        status: "success",
        status_code: 200,
        data: {
          "1": {
            status: "Success",
            remark: "",
            waybill: "1369010531020",
            refnum: "ORD-1001",
            logistic_name: "delhivery",
            tracking_url:
              "https://ithinklogistics.co.in/postship/tracking/1369010531020",
          },
        },
      }),
    );

    const client = new IthinkClient(credentials);
    const result = await client.createOrder({
      shipments: [shipment],
      pickup_address_id: 24,
      logistics: "Delhivery",
    });

    expect(result.success).toBe(true);
    expect(result.waybill).toBe("1369010531020");
    expect(result.order_id).toBe("ORD-1001");
    expect(result.shipments).toHaveLength(1);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://my.ithinklogistics.com/api_v3/order/add.json");
    const headers = new Headers(init.headers);
    expect(headers.get("Content-Type")).toBe("application/json");

    const body = requestBody(mockFetch.mock.calls[0]);
    expect(body.data.access_token).toBe("ithink-access-token");
    expect(body.data.secret_key).toBe("ithink-secret-key");
    expect(body.data.pickup_address_id).toBe(24);
    expect(body.data.logistics).toBe("Delhivery");
    expect((body.data.shipments as Array<{ order: string }>)[0].order).toBe(
      "ORD-1001",
    );
  });

  it("throws a provider error on failed order creation", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ html_message: "Pincode not serviceable" }, false, 422),
    );

    const client = new IthinkClient(credentials);
    await expect(
      client.createOrder({ shipments: [shipment], pickup_address_id: 24 }),
    ).rejects.toMatchObject({
      name: "IthinkAPIError",
      statusCode: 422,
      message: "Pincode not serviceable",
    });
  });

  it("maps tracking responses and forwards the AWB list", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        status_code: 200,
        data: {
          "1369010033902": {
            awb_no: "1369010033902",
            logistic: "Delhivery",
            order_type: "forward",
            current_status: "In Transit",
            current_status_code: "UD",
            expected_delivery_date: "2026-08-12",
            scan_details: [
              {
                status: "Manifested",
                status_code: "UD",
                scan_location: "HQ (Haryana)",
                scan_date_time: "2026-08-10 14:05:57",
              },
            ],
          },
        },
      }),
    );

    const client = new IthinkClient(credentials);
    const result = await client.trackByWaybill("1369010033902");

    expect(result.waybills).toEqual(["1369010033902"]);
    expect(result.currentStatus).toBe("In Transit");
    expect(result.statusCode).toBe("UD");
    expect(result.scans).toHaveLength(1);

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api_v3/order/track.json");
    const body = requestBody(mockFetch.mock.calls[0]);
    expect(body.data.awb_number_list).toBe("1369010033902");
  });

  it("maps serviceability and rate responses", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        status: "success",
        data: {
          "400067": {
            delhivery: {
              prepaid: "Y",
              cod: "N",
              pickup: "Y",
              district: "MUMBAI",
              state_code: "MH",
              sort_code: "MUM/MAL",
            },
            xpressbees: {
              prepaid: "Y",
              cod: "Y",
              pickup: "Y",
              district: "MAHARASHTRA",
            },
          },
        },
      }),
    );

    const client = new IthinkClient(credentials);
    const serviceability = await client.checkServiceability({
      pincode: "400067",
    });

    expect(serviceability.pincode).toBe("400067");
    expect(serviceability.serviceable).toBe(true);
    expect(serviceability.couriers).toHaveLength(2);
    expect(serviceability.couriers[0].prepaid).toBe(true);
    expect(serviceability.couriers[0].cod).toBe(false);

    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        status: "success",
        zone: "A",
        expected_delivery_date: "1 to 2 Days",
        data: [
          {
            logistic_name: "Xpressbees",
            prepaid: "Y",
            cod: "Y",
            pickup: "Y",
            rate: 153.4,
            logistics_zone: "A",
            delivery_tat: "1",
          },
          {
            logistic_name: "Delhivery",
            prepaid: "Y",
            cod: "N",
            pickup: "Y",
            rev_pickup: "Y",
            rate: 160,
            logistics_zone: "A",
            delivery_tat: "2",
          },
        ],
      }),
    );

    const rate = await client.calculateRate({
      from_pincode: "400092",
      to_pincode: "400061",
      shipping_length_cms: 22,
      shipping_width_cms: 12,
      shipping_height_cms: 12,
      shipping_weight_kg: 2,
      payment_method: "cod",
      product_mrp: 1200,
    });

    expect(rate.zone).toBe("A");
    expect(rate.expectedDeliveryDate).toBe("1 to 2 Days");
    expect(rate.rates).toHaveLength(2);
    expect(rate.rates[0].rate).toBe(153.4);
    expect(rate.rates[1].reversePickup).toBe(true);
    expect(rate.rates[1].cod).toBe(false);

    const body = requestBody(mockFetch.mock.calls[1]);
    expect(body.data.from_pincode).toBe("400092");
    expect(body.data.payment_method).toBe("cod");
    expect(body.data.product_mrp).toBe(1200);
  });

  it("generates labels and manifests", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        status: "success",
        status_code: 200,
        file_name: "https://my.ithinklogistics.com/uploads/shipping/label.pdf",
      }),
    );
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        status: "success",
        status_code: 200,
        file_name:
          "https://my.ithinklogistics.com/uploads/shipping/manifest.pdf",
      }),
    );

    const client = new IthinkClient(credentials);
    const label = await client.generateLabel(["86210010463", "86210010464"]);
    const manifest = await client.generateManifest("86210005902");

    expect(label.success).toBe(true);
    expect(label.url).toContain("label.pdf");
    expect(manifest.url).toContain("manifest.pdf");

    const [labelUrl] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(labelUrl).toContain("/api_v3/shipping/label.json");
    const labelBody = requestBody(mockFetch.mock.calls[0]);
    expect(labelBody.data.awb_numbers).toBe("86210010463,86210010464");
    expect(labelBody.data.page_size).toBe("A4");

    const manifestBody = requestBody(mockFetch.mock.calls[1]);
    expect(manifestBody.data.awb_numbers).toBe("86210005902");
  });

  it("cancels shipments through the cancellation endpoint", async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        status: "success",
        status_code: 200,
        data: {
          "1": { status: "Success", remark: "", refnum: "ORD-1001" },
        },
      }),
    );

    const client = new IthinkClient(credentials);
    const cancel = await client.cancelOrder("86210010463");

    expect(cancel.success).toBe(true);
    expect(cancel.waybills).toEqual(["86210010463"]);

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api_v3/order/cancel.json");
    const body = requestBody(mockFetch.mock.calls[0]);
    expect(body.data.awb_numbers).toBe("86210010463");
  });

  it("throws an IthinkAPIError for plain-text failures", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      headers: new Headers({ "content-type": "text/plain" }),
      text: async () => "Authentication failed",
      json: async () => ({ message: "Authentication failed" }),
    } as Response);

    const client = new IthinkClient(credentials);
    await expect(
      client.request("/api_v3/order/track.json", { awb_number_list: "X" }),
    ).rejects.toBeInstanceOf(IthinkAPIError);
  });

  it("throws IthinkAPIError for error bodies returned with HTTP 200", async () => {
    mockFetch.mockResolvedValue(
      jsonResponse({
        status: "error",
        status_code: 400,
        html_message: "Invalid AWB",
      }),
    );

    const client = new IthinkClient(credentials);

    await expect(client.trackByWaybill("MISSING")).rejects.toMatchObject({
      name: "IthinkAPIError",
      statusCode: 400,
      message: "Invalid AWB",
    });
    await expect(
      client.calculateRate({
        from_pincode: "400092",
        to_pincode: "400061",
        shipping_weight_kg: 2,
        payment_method: "cod",
        product_mrp: 1200,
      }),
    ).rejects.toBeInstanceOf(IthinkAPIError);
    await expect(
      client.checkServiceability({ pincode: "400067" }),
    ).rejects.toBeInstanceOf(IthinkAPIError);

    const order = await client.createOrder({
      shipments: [shipment],
      pickup_address_id: 24,
    });
    expect(order.success).toBe(false);
    expect(order.message).toBe("Invalid AWB");
  });

  it("treats a status_code >= 400 without a status key as a failure", async () => {
    mockFetch.mockResolvedValue(jsonResponse({ status_code: 400 }));

    const client = new IthinkClient(credentials);
    await expect(client.trackByWaybill("MISSING")).rejects.toMatchObject({
      name: "IthinkAPIError",
      statusCode: 400,
    });
  });

  it("rejects batches above the documented limits before calling iThink", async () => {
    const client = new IthinkClient(credentials);
    const awbs = (count: number) =>
      Array.from({ length: count }, (_, index) => `8621000${index}`);
    const ithink = new Ithink(credentials);

    await expect(client.trackByWaybills(awbs(11))).rejects.toThrow(
      "at most 10",
    );
    await expect(
      client.createOrder({
        shipments: Array.from({ length: 11 }, () => shipment),
        pickup_address_id: 24,
      }),
    ).rejects.toThrow("at most 10");
    await expect(ithink.orders.cancelMany(awbs(101))).rejects.toThrow(
      "at most 100",
    );
    await expect(client.generateLabel(awbs(101))).rejects.toThrow(
      "at most 100",
    );

    expect(mockFetch).not.toHaveBeenCalled();
  });
});
