import type { IthinkClient } from "../client.js";
import type {
  IthinkTrackingResponse,
  IthinkTrackingScan,
  IthinkTrackingShipment,
} from "../types/index.js";
import {
  assertBatchSize,
  isRecord,
  pickString,
  toArray,
  toObject,
} from "./helpers.js";

export class Tracking {
  constructor(private client: IthinkClient) {}

  byWaybill(waybill: string): Promise<IthinkTrackingResponse> {
    return this.byWaybills([waybill]);
  }

  async byWaybills(waybills: string[]): Promise<IthinkTrackingResponse> {
    assertBatchSize(waybills.length, 10, "tracking");
    return this.client
      .request<unknown>(
        "/api_v3/order/track.json",
        { awb_number_list: waybills.join(",") },
        { throwOnErrorBody: true },
      )
      .then((response) => this.mapTrackingResponse(response, waybills));
  }

  private mapTrackingResponse(
    response: unknown,
    fallbackWaybills: string[],
  ): IthinkTrackingResponse {
    const obj = toObject(response);
    const shipments = Object.entries(toObject(obj.data))
      .filter(([, entry]) => isRecord(entry))
      .map(([awb, entry]) =>
        this.mapShipment(awb, entry as Record<string, unknown>),
      );

    const first = shipments[0];
    return {
      waybills:
        shipments.length > 0
          ? shipments.map((shipment) => shipment.awb)
          : fallbackWaybills,
      currentStatus: first?.currentStatus ?? null,
      statusCode: first?.statusCode ?? null,
      scans: first?.scans ?? [],
      shipments,
      raw: response,
    };
  }

  private mapShipment(
    awb: string,
    entry: Record<string, unknown>,
  ): IthinkTrackingShipment {
    return {
      awb: pickString(entry, ["awb_no", "awb"]) ?? awb,
      currentStatus: pickString(entry, ["current_status", "status"]),
      statusCode: pickString(entry, ["current_status_code", "status_code"]),
      courier: pickString(entry, ["logistic", "logistic_name"]),
      orderType: pickString(entry, ["order_type"]),
      expectedDeliveryDate: pickString(entry, [
        "expected_delivery_date",
        "promise_delivery_date",
      ]),
      scans: toArray(entry.scan_details)
        .filter(isRecord)
        .map((scan): IthinkTrackingScan => scan),
      raw: entry,
    };
  }
}
