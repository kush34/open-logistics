import type { IthinkClient } from "../client.js";
import type {
  IthinkServiceabilityQuery,
  IthinkServiceabilityResponse,
} from "../types/index.js";
import { isRecord, pickString, toObject, truthyFlag } from "./helpers.js";

export class Serviceability {
  constructor(private client: IthinkClient) {}

  check(
    params: IthinkServiceabilityQuery,
  ): Promise<IthinkServiceabilityResponse> {
    return this.client
      .request<unknown>(
        "/api_v3/pincode/check.json",
        { pincode: params.pincode },
        { throwOnErrorBody: true },
      )
      .then((response) => this.mapServiceabilityResponse(response));
  }

  private mapServiceabilityResponse(
    response: unknown,
  ): IthinkServiceabilityResponse {
    const obj = toObject(response);
    const entries = Object.entries(toObject(obj.data));
    const [pincode, courierMap] = entries[0] ?? [];

    const couriers = Object.entries(toObject(courierMap))
      .filter(([, value]) => isRecord(value))
      .map(([courier, value]) => {
        const details = value as Record<string, unknown>;
        return {
          courier,
          prepaid: truthyFlag(details.prepaid),
          cod: truthyFlag(details.cod),
          pickup: truthyFlag(details.pickup),
          district: pickString(details, ["district"]),
          state_code: pickString(details, ["state_code"]),
          sort_code: pickString(details, ["sort_code"]),
          raw: value,
        };
      });

    return {
      pincode: pincode ?? null,
      serviceable: couriers.some((courier) => courier.prepaid || courier.cod),
      couriers,
      raw: response,
    };
  }
}
