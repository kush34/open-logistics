import type { ShadowfaxClient } from "../client.js";
import type {
  ShadowfaxRateQuery,
  ShadowfaxRateResponse,
} from "../types/index.js";

export class Rates {
  constructor(private client: ShadowfaxClient) {}

  calculate(params: ShadowfaxRateQuery): Promise<ShadowfaxRateResponse> {
    return this.client.calculateRate(params);
  }
}
