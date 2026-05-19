import type { ShiprocketClient } from "../client.js";
import type {
  GeneratePickupPayload,
  GenerateLabelPayload,
  GenerateManifestPayload,
} from "../types/index.js";

export class Shipments {
  constructor(private client: ShiprocketClient) {}

  generatePickup(payload: GeneratePickupPayload): Promise<{ pickup_status: number; response: { data: { appointment_delivery_date: string } } }> {
    return this.client.request("POST", "/courier/generate/pickup", payload);
  }

  generateLabel(payload: GenerateLabelPayload): Promise<{ label_created: number; url: string }> {
    return this.client.request("POST", "/courier/generate/label", payload);
  }

  generateManifest(payload: GenerateManifestPayload): Promise<{ manifest_url: string }> {
    return this.client.request("POST", "/manifests/generate", payload);
  }

  printManifest(orderId: number): Promise<{ manifest_url: string }> {
    return this.client.request("POST", "/manifests/print", { order_ids: [orderId] });
  }
}
