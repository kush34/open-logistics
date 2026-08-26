import type { ShiprocketClient } from "../client.js";
import type { RateCheckParams } from "../types/index.js";

export class Rates {
  constructor(private client: ShiprocketClient) {}

  check(params: RateCheckParams): Promise<unknown> {
    return this.client.request(
      "GET",
      "/courier/serviceability",
      undefined,
      params as unknown as Record<string, string | number>
    );
  }
}
