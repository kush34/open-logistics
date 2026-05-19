import { describe, it, expect, vi, beforeEach } from "vitest";
import { Shiprocket } from "../src/index.js";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

const credentials = { email: "test@example.com", password: "password" };

function mockAuth() {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => ({ token: "mock-token", email: credentials.email }),
  });
}

describe("Shiprocket SDK", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("authenticates and creates an order", async () => {
    mockAuth();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ order_id: 123, shipment_id: 456, status: "NEW" }),
    });

    const sdk = new Shiprocket(credentials);
    const order = await sdk.orders.create({
      order_id: "ORD-001",
      order_date: "2026-01-01 10:00",
      pickup_location: "Primary",
      billing_customer_name: "John",
      billing_address: "123 Street",
      billing_city: "Mumbai",
      billing_pincode: "400001",
      billing_state: "Maharashtra",
      billing_country: "India",
      billing_email: "john@example.com",
      billing_phone: "9999999999",
      shipping_is_billing: true,
      order_items: [{ name: "Item", sku: "SKU1", units: 1, selling_price: 500 }],
      payment_method: "prepaid",
      sub_total: 500,
      length: 10,
      breadth: 10,
      height: 10,
      weight: 0.5,
    });

    expect(order.order_id).toBe(123);
    expect(mockFetch).toHaveBeenCalledTimes(2); // auth + create
  });

  it("tracks by AWB", async () => {
    mockAuth();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ tracking_data: { track_status: 1 } }),
    });

    const sdk = new Shiprocket(credentials);
    const result = await sdk.tracking.byAWB("1234567890");
    expect(result.tracking_data.track_status).toBe(1);
  });

  it("throws ShiprocketAPIError on failure", async () => {
    mockAuth();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 422,
      json: async () => ({ message: "Validation failed", errors: {} }),
    });

    const sdk = new Shiprocket(credentials);
    await expect(sdk.orders.list()).rejects.toThrow("Validation failed");
  });
});
