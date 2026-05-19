import type { ShiprocketClient } from "../client.js";
import type {
  ServiceabilityParams,
  AssignAWBPayload,
} from "../types/index.js";

export class Courier {
  constructor(private client: ShiprocketClient) {}

  serviceability(params: ServiceabilityParams): Promise<unknown> {
    return this.client.request(
      "GET",
      "/courier/serviceability",
      undefined,
      params as unknown as Record<string, string | number>
    );
  }

  assignAWB(payload: AssignAWBPayload): Promise<{ awb_assign_status: number; response: { data: { awb_code: string; courier_name: string } } }> {
    return this.client.request("POST", "/courier/assign/awb", payload);
  }

  list(): Promise<unknown> {
    return this.client.request("GET", "/courier/courierListWithCounts");
  }
}
