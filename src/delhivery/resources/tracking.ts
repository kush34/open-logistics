import type { DelhiveryClient } from "../client.js";
import type {
  DelhiveryTrackingResponse,
  DelhiveryTrackingScan,
} from "../types/index.js";

export class Tracking {
  constructor(private client: DelhiveryClient) {}

  byWaybill(waybill: string): Promise<DelhiveryTrackingResponse> {
    return this.client
      .request<unknown>("GET", "/api/v1/packages/json/", {
        query: { waybill },
      })
      .then((response) => this.mapTrackingResponse(response, waybill));
  }

  byOrderId(orderId: string): Promise<DelhiveryTrackingResponse> {
    return this.client
      .request<unknown>("GET", "/api/v1/packages/json/", {
        query: { ref_nos: orderId },
      })
      .then((response) => this.mapTrackingResponse(response, orderId));
  }

  byWaybills(waybills: string[]): Promise<DelhiveryTrackingResponse> {
    return this.client
      .request<unknown>("GET", "/api/v1/packages/json/", {
        query: { waybill: waybills.join(",") },
      })
      .then((response) => this.mapTrackingResponse(response, waybills.join(",")));
  }

  private mapTrackingResponse(
    response: unknown,
    fallbackWaybill: string
  ): DelhiveryTrackingResponse {
    const obj = this.toObject(response);
    const shipment = this.extractShipment(obj);
    const scans = this.extractScans(obj, shipment);
    const waybills = this.extractWaybills(obj, fallbackWaybill);

    return {
      waybills,
      currentStatus: this.pickString(shipment, ["status", "current_status", "status_name", "status_code"]),
      statusCode: this.pickString(shipment, ["status_code", "statusCode"]),
      scans,
      raw: response,
    };
  }

  private extractShipment(obj: Record<string, unknown>): Record<string, unknown> {
    const candidates = [
      this.toObject(obj.tracking_data),
      this.toObject(obj.data),
      this.toObject(obj.packages),
      this.toObject(obj.package),
      obj,
    ];

    for (const candidate of candidates) {
      if (Object.keys(candidate).length > 0) return candidate;
    }
    return obj;
  }

  private extractScans(
    obj: Record<string, unknown>,
    shipment: Record<string, unknown>
  ): DelhiveryTrackingScan[] {
    const candidateArrays = [
      obj.scans,
      obj.scan,
      obj.events,
      shipment.scans,
      shipment.scan,
      shipment.events,
      obj.shipment_track_activities,
      shipment.shipment_track_activities,
    ];

    for (const candidate of candidateArrays) {
      if (Array.isArray(candidate)) {
        return candidate.filter((item): item is DelhiveryTrackingScan => {
          return item !== null && typeof item === "object";
        });
      }
    }
    return [];
  }

  private extractWaybills(
    obj: Record<string, unknown>,
    fallbackWaybill: string
  ): string[] {
    const candidateArrays = [obj.waybills, obj.waybill, obj.ref_nos];
    for (const candidate of candidateArrays) {
      if (Array.isArray(candidate)) {
        return candidate.map(String).filter(Boolean);
      }
      if (typeof candidate === "string" && candidate.trim()) {
        return candidate.split(",").map((part) => part.trim()).filter(Boolean);
      }
    }
    return fallbackWaybill ? fallbackWaybill.split(",").map((part) => part.trim()).filter(Boolean) : [];
  }

  private toObject(value: unknown): Record<string, unknown> {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
    return {};
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
