import type { DelhiveryClient } from "../client.js";
import type {
  DelhiveryRateQuery,
  DelhiveryRateResponse,
} from "../types/index.js";

export class Rates {
  constructor(private client: DelhiveryClient) {}

  calculate(params: DelhiveryRateQuery): Promise<DelhiveryRateResponse> {
    return this.client
      .request<unknown>("GET", "/api/kinko/v1/invoice/charges/.json", {
        query: {
          md: params.md,
          cgm: params.cgm,
          o_pin: params.o_pin,
          d_pin: params.d_pin,
          ss: params.ss,
          pt: params.pt,
        },
      })
      .then((response) => this.mapRateResponse(response));
  }

  private mapRateResponse(response: unknown): DelhiveryRateResponse {
    const obj = this.toObject(response);
    return {
      totalAmount: this.pickNumber(obj, ["total_amount", "totalAmount", "amount", "total"]),
      grossAmount: this.pickNumber(obj, ["gross_amount", "grossAmount"]),
      taxAmount: this.pickNumber(obj, ["tax_amount", "taxAmount", "tax"]),
      currency: "INR",
      raw: response,
    };
  }

  private toObject(value: unknown): Record<string, unknown> {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
    return {};
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
}
