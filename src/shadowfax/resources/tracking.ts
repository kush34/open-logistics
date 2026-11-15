import type { ShadowfaxClient } from "../client.js";
import type {
  ShadowfaxBulkTrackingResponse,
  ShadowfaxTrackingResponse,
} from "../types/index.js";

export class Tracking {
  constructor(private client: ShadowfaxClient) {}

  byWaybill(awbNumber: string): Promise<ShadowfaxTrackingResponse> {
    return this.client.trackByAwb(awbNumber);
  }

  byWaybills(awbNumbers: string[]): Promise<ShadowfaxBulkTrackingResponse> {
    return this.client.trackBulk(awbNumbers);
  }
}
