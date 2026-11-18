import { describe, expect, it } from "vitest";
import { parseTrackingWebhook } from "../src/index.js";

const token = "callback-secret";
const shiprocket = {
  awb: "19041424751540",
  current_status: "IN TRANSIT",
  current_status_id: 20,
  shipment_status: "IN TRANSIT",
  shipment_status_id: 18,
  current_timestamp: "23 05 2023 11:43:52",
  scans: [{ status: "X-UCI" }],
};

function request(payload: unknown, headers: Record<string, string>) {
  return { rawBody: JSON.stringify(payload), headers: new Headers(headers) };
}

describe("parseTrackingWebhook", () => {
  it("preserves Shiprocket's two status codes and scan history", () => {
    expect(parseTrackingWebhook("shiprocket", request(shiprocket, { "X-API-Key": token }), { token }))
      .toEqual({
        ok: true,
        event: {
          provider: "shiprocket",
          waybill: shiprocket.awb,
          statusCode: "20",
          statusLabel: "IN TRANSIT",
          shipmentStatusCode: "18",
          shipmentStatusLabel: "IN TRANSIT",
          occurredAt: shiprocket.current_timestamp,
          raw: shiprocket,
        },
      });
  });

  it("maps Delhivery's default nested Scan Push payload", () => {
    const payload = {
      Shipment: {
        AWB: "00123456",
        NSLCode: "X-UCI",
        Status: {
          Status: "Manifested",
          StatusType: "UD",
          StatusDateTime: "2019-01-09T17:10:42.767",
        },
      },
    };

    expect(parseTrackingWebhook(
      "delhivery", request(payload, { Authorization: `Bearer ${token}` }),
      { header: "authorization", token: `Bearer ${token}` },
    )).toEqual({
      ok: true,
      event: {
        provider: "delhivery",
        waybill: "00123456",
        statusCode: "X-UCI",
        statusLabel: "Manifested",
        occurredAt: "2019-01-09T17:10:42.767",
        raw: payload,
      },
    });
  });

  it("accepts the Shadowfax example without a timestamp", () => {
    const payload = {
      awb_number: "SF1234567890",
      client_order_id: "FWD-2026-001",
      status: "Received At Forward Hub",
      status_id: "recd_at_fwd_hub",
    };
    expect(parseTrackingWebhook(
      "shadowfax", request(payload, { "X-Callback-Token": token }),
      { header: "x-callback-token", token },
    )).toMatchObject({
      ok: true,
      event: {
        provider: "shadowfax",
        waybill: payload.awb_number,
        statusCode: payload.status_id,
        statusLabel: payload.status,
      },
    });
  });

  it("accepts unknown status codes in a configured Shadowfax template", () => {
    const payload = { tracking_id: "SF123", state: "new_provider_code", at: "2026-06-09 18:45:00" };
    expect(parseTrackingWebhook(
      "shadowfax", request(payload, { "X-Callback-Token": token }),
      {
        header: "x-callback-token", token,
        fields: { waybill: "tracking_id", statusCode: "state", occurredAt: "at" },
      },
    )).toMatchObject({
      ok: true,
      event: { waybill: "SF123", statusCode: "new_provider_code", occurredAt: payload.at },
    });
  });

  it("rejects missing, incorrect, and empty credentials before parsing", () => {
    for (const [received, expected] of [[null, token], ["callback-secrex", token], ["short", token]] as const) {
      const headers = new Headers(received === null ? {} : { "x-api-key": received });
      expect(parseTrackingWebhook("shiprocket", { headers, rawBody: "{" }, { token: expected }))
        .toEqual({ ok: false, reason: "unauthorized" });
    }
  });

  it("throws for invalid server configuration", () => {
    const req = request({}, {});
    expect(() => parseTrackingWebhook("shiprocket", req, { token: "" })).toThrow(TypeError);
    expect(() => parseTrackingWebhook("delhivery", req, { header: "bad header", token })).toThrow(TypeError);
    expect(() => parseTrackingWebhook("shadowfax", req, { header: "", token })).toThrow(TypeError);
  });

  it("accepts shipment-only status and trims identifying fields", () => {
    expect(parseTrackingWebhook("shiprocket", request({ awb: " 123 ", shipment_status_id: 0 }, { "x-api-key": token }), { token }))
      .toMatchObject({ ok: true, event: { waybill: "123", shipmentStatusCode: "0" } });
  });

  it.each(["delhivery", "shadowfax"] as const)("rejects unauthorized %s requests", (provider) => {
    expect(parseTrackingWebhook(provider, request({}, { authorization: "wrong" }), { header: "authorization", token }))
      .toEqual({ ok: false, reason: "unauthorized" });
  });

  it.each(["{", "null", "[]", '{"current_status":"Picked"}', '{"awb":"123"}'])(
    "rejects malformed or incomplete body %s",
    (rawBody) => {
      const headers = new Headers({ "x-api-key": token });
      expect(parseTrackingWebhook("shiprocket", { headers, rawBody }, { token }))
        .toEqual({ ok: false, reason: "invalid_payload" });
    },
  );
});
