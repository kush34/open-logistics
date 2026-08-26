import type { ShiprocketClient } from "../client.js";
import type { TrackByAWBResponse } from "../types/index.js";

export class Tracking {
  constructor(private client: ShiprocketClient) {}

  byAWB(awbCode: string): Promise<TrackByAWBResponse> {
    return this.client.request("GET", `/courier/track/awb/${awbCode}`);
  }

  byShipmentId(shipmentId: number): Promise<TrackByAWBResponse> {
    return this.client.request("GET", `/courier/track/shipment/${shipmentId}`);
  }

  byOrderId(orderId: string): Promise<TrackByAWBResponse> {
    return this.client.request("GET", `/orders/track/${orderId}`);
  }
}
