import type { DelhiveryClient } from "../client.js";
import type {
  DelhiveryPickupRequestPayload,
  DelhiveryPickupRequestResponse,
} from "../types/index.js";

export class PickupRequests {
  constructor(private client: DelhiveryClient) {}

  create(
    payload: DelhiveryPickupRequestPayload
  ): Promise<DelhiveryPickupRequestResponse> {
    return this.client
      .request<unknown>("POST", "/fm/request/new/", {
        body: payload,
      })
      .then((response) => this.mapResponse(response));
  }

  private mapResponse(response: unknown): DelhiveryPickupRequestResponse {
    const obj = this.toObject(response);
    return {
      pickup_id: this.pickString(obj, ["pickup_id", "pickupId", "id"]),
      message: this.pickString(obj, ["message", "status", "remarks", "detail"]),
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
