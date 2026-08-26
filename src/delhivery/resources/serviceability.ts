import type { DelhiveryClient } from "../client.js";
import type {
  DelhiveryServiceabilityQuery,
  DelhiveryServiceabilityResponse,
} from "../types/index.js";

export class Serviceability {
  constructor(private client: DelhiveryClient) {}

  check(
    params: DelhiveryServiceabilityQuery
  ): Promise<DelhiveryServiceabilityResponse> {
    return this.client
      .request<unknown>("GET", "/c/api/pin-codes/json/", {
        query: params as Record<string, string | number | boolean | undefined | null>,
      })
      .then((response) => this.mapServiceabilityResponse(response));
  }

  private mapServiceabilityResponse(
    response: unknown
  ): DelhiveryServiceabilityResponse {
    const obj = this.toObject(response);
    const deliveryCodes = this.extractDeliveryCodes(obj);
    const first = deliveryCodes[0]?.postal_code;

    return {
      serviceable: deliveryCodes.length > 0 && this.isServiceable(first),
      prepaid: this.truthyFlag(first?.pre_paid),
      cod: this.truthyFlag(first?.cod ?? first?.cash),
      pickup: this.truthyFlag(first?.pickup),
      remarks: first?.remarks?.trim() ? first.remarks : null,
      delivery_codes: deliveryCodes,
      raw: response,
    };
  }

  private extractDeliveryCodes(
    obj: Record<string, unknown>
  ): DelhiveryServiceabilityResponse["delivery_codes"] {
    const deliveryCodes = obj.delivery_codes;
    if (!Array.isArray(deliveryCodes)) {
      return [];
    }

    return deliveryCodes.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const postalCode = this.toPostalCodeObject(
        (item as Record<string, unknown>).postal_code
      );
      return postalCode ? [{ postal_code: postalCode }] : [];
    });
  }

  private isServiceable(
    postalCode?: {
      pre_paid?: string;
      cod?: string;
      cash?: string;
      pickup?: string;
      remarks?: string;
    }
  ): boolean {
    if (!postalCode) return false;
    return this.truthyFlag(postalCode.pre_paid) || this.truthyFlag(postalCode.cod ?? postalCode.cash);
  }

  private truthyFlag(value?: string | null): boolean {
    return typeof value === "string" && value.toUpperCase() === "Y";
  }

  private toObject(value: unknown): Record<string, unknown> {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
    return {};
  }

  private toPostalCodeObject(
    value: unknown
  ): {
    city?: string;
    cod?: string;
    inc?: string;
    district?: string;
    pin?: number;
    max_amount?: number;
    pre_paid?: string;
    cash?: string;
    state_code?: string;
    max_weight?: number;
    pickup?: string;
    repl?: string;
    covid_zone?: string | null;
    country_code?: string;
    is_oda?: string;
    remarks?: string;
  } | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return null;
    }

    return value as {
      city?: string;
      cod?: string;
      inc?: string;
      district?: string;
      pin?: number;
      max_amount?: number;
      pre_paid?: string;
      cash?: string;
      state_code?: string;
      max_weight?: number;
      pickup?: string;
      repl?: string;
      covid_zone?: string | null;
      country_code?: string;
      is_oda?: string;
      remarks?: string;
    };
  }
}
