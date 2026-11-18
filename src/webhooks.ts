import { createHash, timingSafeEqual } from "node:crypto";

type ShadowfaxFields = Partial<Record<
  "waybill" | "statusCode" | "statusLabel" | "occurredAt",
  string
>>;

export interface TrackingWebhookConfig {
  shiprocket: { token: string };
  delhivery: { header: string; token: string };
  shadowfax: { header: string; token: string; fields?: ShadowfaxFields };
}

export type TrackingWebhookProvider = keyof TrackingWebhookConfig;

export interface TrackingWebhookRequest {
  headers: Pick<Headers, "get">;
  rawBody: string;
}

export interface TrackingWebhookEvent {
  provider: TrackingWebhookProvider;
  waybill: string;
  statusCode?: string;
  statusLabel?: string;
  /** Timestamp as sent by the provider, including its original timezone format. */
  occurredAt?: string;
  shipmentStatusCode?: string;
  shipmentStatusLabel?: string;
  raw: Record<string, unknown>;
}

export type TrackingWebhookResult =
  | { ok: true; event: TrackingWebhookEvent }
  | { ok: false; reason: "unauthorized" | "invalid_payload" };

function record(value: unknown): Record<string, unknown> | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
}

function nonEmpty(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function code(value: unknown): string | undefined {
  return typeof value === "number" && Number.isSafeInteger(value)
    ? String(value)
    : nonEmpty(value);
}

/** Verify an inbound tracking callback without creating an API client. */
export function parseTrackingWebhook(
  ...[provider, request, config]:
    | ["shiprocket", TrackingWebhookRequest, TrackingWebhookConfig["shiprocket"]]
    | ["delhivery", TrackingWebhookRequest, TrackingWebhookConfig["delhivery"]]
    | ["shadowfax", TrackingWebhookRequest, TrackingWebhookConfig["shadowfax"]]
): TrackingWebhookResult {
  const header = provider === "shiprocket" ? "x-api-key" : config.header;
  if (!nonEmpty(config.token) || typeof header !== "string" || !/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/.test(header)) {
    throw new TypeError("A nonempty webhook token and valid header name are required");
  }
  const received = request.headers.get(header);
  if (received === null) {
    return { ok: false, reason: "unauthorized" };
  }
  const actual = createHash("sha256").update(received).digest();
  const expected = createHash("sha256").update(config.token).digest();
  if (!timingSafeEqual(actual, expected)) {
    return { ok: false, reason: "unauthorized" };
  }

  let raw: Record<string, unknown> | undefined;
  try {
    raw = record(JSON.parse(request.rawBody));
  } catch {
    return { ok: false, reason: "invalid_payload" };
  }
  if (!raw) return { ok: false, reason: "invalid_payload" };

  let fields: Omit<TrackingWebhookEvent, "provider" | "raw" | "waybill">;
  let waybill: string | undefined;
  switch (provider) {
    case "shiprocket":
      waybill = nonEmpty(raw.awb);
      fields = {
        statusCode: code(raw.current_status_id),
        statusLabel: nonEmpty(raw.current_status),
        shipmentStatusCode: code(raw.shipment_status_id),
        shipmentStatusLabel: nonEmpty(raw.shipment_status),
        occurredAt: nonEmpty(raw.current_timestamp),
      };
      break;
    case "delhivery": {
      const shipment = record(raw.Shipment);
      const status = record(shipment?.Status);
      waybill = nonEmpty(shipment?.AWB);
      fields = {
        statusCode: nonEmpty(shipment?.NSLCode),
        statusLabel: nonEmpty(status?.Status),
        occurredAt: nonEmpty(status?.StatusDateTime),
      };
      break;
    }
    case "shadowfax": {
      const mapping = config.fields;
      waybill = nonEmpty(raw[mapping?.waybill ?? "awb_number"]);
      fields = {
        statusCode: code(raw[mapping?.statusCode ?? "status_id"]),
        statusLabel: nonEmpty(raw[mapping?.statusLabel ?? "status"]),
        occurredAt: nonEmpty(raw[mapping?.occurredAt ?? "last_updated"]),
      };
      break;
    }
  }
  if (!waybill || (!fields.statusCode && !fields.statusLabel && !fields.shipmentStatusCode && !fields.shipmentStatusLabel)) {
    return { ok: false, reason: "invalid_payload" };
  }
  return { ok: true, event: { provider, waybill, ...fields, raw } };
}
