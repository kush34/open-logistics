import type { IthinkClient } from "../client.js";
import type {
  IthinkCancelOrderResponse,
  IthinkCreateOrderRequest,
  IthinkOrderCreateResponse,
  IthinkOrderShipmentResult,
} from "../types/index.js";
import {
  assertBatchSize,
  isRecord,
  isSuccess,
  pickString,
  toObject,
} from "./helpers.js";

export class Orders {
  constructor(private client: IthinkClient) {}

  async create(
    payload: IthinkCreateOrderRequest,
  ): Promise<IthinkOrderCreateResponse> {
    assertBatchSize(payload.shipments.length, 10, "order create");
    return this.client
      .request<unknown>("/api_v3/order/add.json", {
        shipments: payload.shipments,
        pickup_address_id: payload.pickup_address_id,
        logistics: payload.logistics,
        s_type: payload.s_type,
        order_type: payload.order_type,
      })
      .then((response) => this.mapCreateResponse(response));
  }

  cancel(waybill: string): Promise<IthinkCancelOrderResponse> {
    return this.cancelMany([waybill]);
  }

  async cancelMany(waybills: string[]): Promise<IthinkCancelOrderResponse> {
    assertBatchSize(waybills.length, 100, "cancellation");
    return this.client
      .request<unknown>("/api_v3/order/cancel.json", {
        awb_numbers: waybills.join(","),
      })
      .then((response) => this.mapCancelResponse(response, waybills));
  }

  private mapCreateResponse(response: unknown): IthinkOrderCreateResponse {
    const obj = toObject(response);
    const shipments = Object.values(toObject(obj.data))
      .filter(isRecord)
      .map((entry) => this.mapShipment(entry));

    const first = shipments[0];
    return {
      success: isSuccess(obj) && shipments.every((item) => item.success),
      message:
        pickString(obj, ["html_message", "message", "error"]) ??
        first?.remark ??
        null,
      order_id: first?.order_id ?? null,
      waybill: first?.waybill ?? null,
      tracking_url: first?.tracking_url ?? null,
      shipments,
      raw: response,
    };
  }

  private mapShipment(
    entry: Record<string, unknown>,
  ): IthinkOrderShipmentResult {
    return {
      success: isSuccess(entry),
      status: pickString(entry, ["status"]),
      remark: pickString(entry, ["remark", "message"]),
      waybill: pickString(entry, ["waybill", "awb"]),
      order_id: pickString(entry, ["refnum", "order"]),
      logistic: pickString(entry, ["logistic_name", "logistic"]),
      tracking_url: pickString(entry, ["tracking_url"]),
      raw: entry,
    };
  }

  private mapCancelResponse(
    response: unknown,
    fallbackWaybills: string[],
  ): IthinkCancelOrderResponse {
    const obj = toObject(response);
    const entries = Object.values(toObject(obj.data)).filter(isRecord);

    return {
      success: isSuccess(obj) && entries.every((entry) => isSuccess(entry)),
      message:
        pickString(obj, ["html_message", "message", "error"]) ??
        pickString(entries[0] ?? {}, ["remark"]) ??
        null,
      waybills:
        fallbackWaybills.length > 0
          ? fallbackWaybills
          : entries
              .map((entry) => pickString(entry, ["waybill", "awb", "refnum"]))
              .filter((waybill): waybill is string => Boolean(waybill)),
      raw: response,
    };
  }
}
