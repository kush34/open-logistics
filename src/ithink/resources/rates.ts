import type { IthinkClient } from "../client.js";
import type {
  IthinkRateQuery,
  IthinkRateResponse,
  IthinkCourierRate,
} from "../types/index.js";
import {
  isRecord,
  pickNumber,
  pickString,
  toObject,
  truthyFlag,
} from "./helpers.js";

export class Rates {
  constructor(private client: IthinkClient) {}

  calculate(params: IthinkRateQuery): Promise<IthinkRateResponse> {
    return this.client
      .request<unknown>(
        "/api_v3/rate/check.json",
        {
          from_pincode: params.from_pincode,
          to_pincode: params.to_pincode,
          shipping_length_cms: params.shipping_length_cms,
          shipping_width_cms: params.shipping_width_cms,
          shipping_height_cms: params.shipping_height_cms,
          shipping_weight_kg: params.shipping_weight_kg,
          order_type: params.order_type,
          payment_method: params.payment_method,
          product_mrp: params.product_mrp,
        },
        { throwOnErrorBody: true },
      )
      .then((response) => this.mapRateResponse(response));
  }

  private mapRateResponse(response: unknown): IthinkRateResponse {
    const obj = toObject(response);
    const rates = Array.isArray(obj.data)
      ? obj.data
      : Object.values(toObject(obj.data));

    return {
      zone: pickString(obj, ["zone"]),
      expectedDeliveryDate: pickString(obj, ["expected_delivery_date"]),
      rates: rates.filter(isRecord).map((entry): IthinkCourierRate => {
        const rate = toObject(entry);
        return {
          courier: pickString(rate, ["logistic_name", "logistic", "courier"]),
          serviceType: pickString(rate, ["logistic_service_type"]),
          rate: pickNumber(rate, ["rate", "total_amount"]),
          prepaid: truthyFlag(rate.prepaid),
          cod: truthyFlag(rate.cod),
          pickup: truthyFlag(rate.pickup),
          reversePickup: truthyFlag(rate.rev_pickup),
          zone: pickString(rate, ["logistics_zone", "zone"]),
          deliveryTat: pickString(rate, ["delivery_tat"]),
          raw: entry,
        };
      }),
      raw: response,
    };
  }
}
