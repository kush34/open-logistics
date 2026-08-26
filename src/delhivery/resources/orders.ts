import type { DelhiveryClient } from "../client.js";
import type {
  DelhiveryCancelOrderResponse,
  DelhiveryOrderCreateResponse,
  DelhiveryOrderUpdatePayload,
  DelhiveryOrderUpdateResponse,
  DelhiveryShipmentPayload,
} from "../types/index.js";

export class Orders {
  constructor(private client: DelhiveryClient) {}

  create(payload: DelhiveryShipmentPayload): Promise<DelhiveryOrderCreateResponse> {
    const shipment = this.normalizeShipmentPayload(payload);
    const body = new URLSearchParams({
      format: "json",
      data: JSON.stringify({ shipments: [shipment] }),
    });

    return this.client.request<unknown>("POST", "/api/cmu/create.json", {
      body,
    }).then((response) => this.mapCreateResponse(response));
  }

  update(
    payload: DelhiveryOrderUpdatePayload
  ): Promise<DelhiveryOrderUpdateResponse> {
    return this.client.request<unknown>("POST", "/api/p/edit", {
      body: payload,
    }).then((response) => this.mapUpdateResponse(response));
  }

  cancel(waybill: string): Promise<DelhiveryCancelOrderResponse> {
    return this.client.request<unknown>("POST", "/api/p/edit", {
      body: { waybill, cancellation: true as const },
    }).then((response) => this.mapCancelResponse(response, waybill));
  }

  private normalizeShipmentPayload(
    payload: DelhiveryShipmentPayload
  ): DelhiveryShipmentPayload {
    const normalized: DelhiveryShipmentPayload = {
      ...payload,
      client: payload.client ?? this.client.clientName,
      pickup_location: {
        name: payload.pickup_location.name,
      },
    };

    if (normalized.address === undefined && normalized.add !== undefined) {
      normalized.address = normalized.add;
    }

    if (normalized.add === undefined && normalized.address !== undefined) {
      normalized.add = normalized.address;
    }

    if (normalized.weight !== undefined && normalized.gm === undefined) {
      normalized.gm = normalized.weight;
    }

    if (normalized.product_details === undefined && normalized.products_desc !== undefined) {
      normalized.product_details = normalized.products_desc;
    }

    if (normalized.payment_mode === undefined) {
      normalized.payment_mode = normalized.package_type;
    }

    return normalized;
  }

  private mapCreateResponse(response: unknown): DelhiveryOrderCreateResponse {
    const obj = this.toObject(response);
    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["message", "status", "remarks", "detail"]),
      order_id: this.pickString(obj, ["order_id", "orderId", "orderid"]),
      waybill: this.pickString(obj, ["waybill", "awb", "awb_code", "wbn"]),
      status: this.pickString(obj, ["status", "shipment_status"]),
      shipment_id: this.pickString(obj, ["shipment_id", "shipmentId"]),
      raw: response,
    };
  }

  private mapUpdateResponse(response: unknown): DelhiveryOrderUpdateResponse {
    const obj = this.toObject(response);
    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["message", "status", "remarks", "detail"]),
      waybill: this.pickString(obj, ["waybill", "awb", "awb_code", "wbn"]),
      raw: response,
    };
  }

  private mapCancelResponse(response: unknown, waybill: string): DelhiveryCancelOrderResponse {
    const obj = this.toObject(response);
    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["message", "status", "remarks", "detail"]),
      waybill: this.pickString(obj, ["waybill", "awb", "awb_code", "wbn"]) ?? waybill,
      raw: response,
    };
  }

  private toObject(value: unknown): Record<string, unknown> {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
    return {};
  }

  private isSuccess(obj: Record<string, unknown>): boolean {
    const status = obj.status ?? obj.success ?? obj.ok;
    if (typeof status === "boolean") return status;
    if (typeof status === "number") return status >= 200 && status < 300;
    if (typeof status === "string") {
      return ["ok", "success", "created", "updated"].includes(status.toLowerCase());
    }
    return true;
  }

  private pickString(
    obj: Record<string, unknown>,
    keys: string[]
  ): string | null {
    for (const key of keys) {
      const value = obj[key];
      if (typeof value === "string" && value.trim()) return value;
      if (typeof value === "number" && Number.isFinite(value)) return String(value);
    }
    return null;
  }
}
