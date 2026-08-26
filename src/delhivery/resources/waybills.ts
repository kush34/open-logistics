import type { DelhiveryClient } from "../client.js";
import type {
  DelhiveryBulkWaybillResponse,
  DelhiveryWaybillFetchQuery,
  DelhiveryWaybillResponse,
} from "../types/index.js";

export class Waybills {
  constructor(private client: DelhiveryClient) {}

  fetchOne(): Promise<DelhiveryWaybillResponse> {
    return this.client
      .request<unknown>("GET", "/waybill/api/fetch/json/", {
        query: {
          cl: this.client.clientName,
          client_name: this.client.clientName,
          token: this.client.token,
        },
      })
      .then((response) => this.mapSingle(response));
  }

  fetchBulk(
    params: DelhiveryWaybillFetchQuery
  ): Promise<DelhiveryBulkWaybillResponse> {
    const query = {
      cl: this.client.clientName,
      client_name: this.client.clientName,
      token: this.client.token,
      action: params.action ?? "next",
      count: params.count,
      wbn: params.wbn,
    };

    return this.client
      .request<unknown>("GET", "/waybill/api/bulk/json/", {
        query,
      })
      .then((response) => this.mapBulk(response));
  }

  private mapSingle(response: unknown): DelhiveryWaybillResponse {
    const obj = this.toObject(response);
    return {
      waybill: this.pickString(obj, ["waybill", "wbn", "awb", "awb_code"]),
      raw: response,
    };
  }

  private mapBulk(response: unknown): DelhiveryBulkWaybillResponse {
    const obj = this.toObject(response);
    const candidates = [obj.waybills, obj.waybill, obj.data, obj.results];
    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return {
          waybills: candidate.map(String).filter(Boolean),
          raw: response,
        };
      }
    }

    const single = this.pickString(obj, ["waybill", "wbn", "awb", "awb_code"]);
    return {
      waybills: single ? [single] : [],
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
}
