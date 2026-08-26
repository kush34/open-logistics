import type { DelhiveryClient } from "../client.js";
import type { DelhiveryPackingSlipResponse } from "../types/index.js";
import { PickupRequests } from "./pickup-requests.js";

export class Shipments {
  private pickupRequests: PickupRequests;

  constructor(private client: DelhiveryClient) {
    this.pickupRequests = new PickupRequests(client);
  }

  generateLabel(waybill: string, pdf = false): Promise<DelhiveryPackingSlipResponse> {
    return this.client
      .request<unknown>("GET", "/api/p/packing_slip", {
        query: {
          wbns: waybill,
          pdf: pdf ? "True" : undefined,
        },
      })
      .then((response) => this.mapLabelResponse(response, waybill));
  }

  createPickupRequest(
    payload: Parameters<PickupRequests["create"]>[0]
  ) {
    return this.pickupRequests.create(payload);
  }

  private mapLabelResponse(
    response: unknown,
    fallbackWaybill: string
  ): DelhiveryPackingSlipResponse {
    const obj = this.toObject(response);
    return {
      waybill: this.pickString(obj, ["waybill", "wbn"]) ?? fallbackWaybill,
      pdfUrl: this.pickString(obj, ["pdf_url", "pdfUrl", "url"]),
      packagesFound: this.pickNumber(obj, ["packages_found", "packagesFound"]),
      packages: this.pickArray(obj, ["packages"]),
      raw: response,
    };
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

  private pickNumber(
    obj: Record<string, unknown>,
    keys: string[]
  ): number | null {
    for (const key of keys) {
      const value = obj[key];
      if (typeof value === "number" && Number.isFinite(value)) return value;
      if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) {
        return Number(value);
      }
    }
    return null;
  }

  private pickArray(
    obj: Record<string, unknown>,
    keys: string[]
  ): unknown[] | null {
    for (const key of keys) {
      const value = obj[key];
      if (Array.isArray(value)) return value;
    }
    return null;
  }
}
