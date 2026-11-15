import type { ShadowfaxClient } from "../client.js";
import type {
  ShadowfaxServiceabilityQuery,
  ShadowfaxServiceabilityResponse,
} from "../types/index.js";

export class Serviceability {
  constructor(private client: ShadowfaxClient) {}

  check(
    params: ShadowfaxServiceabilityQuery,
  ): Promise<ShadowfaxServiceabilityResponse> {
    return this.client.checkServiceability(params);
  }
}
