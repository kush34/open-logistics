import type { ShadowfaxClient } from "../client.js";
import type {
  ShadowfaxLabelResponse,
  ShadowfaxPodResponse,
} from "../types/index.js";

export class Shipments {
  constructor(private client: ShadowfaxClient) {}

  generateLabel(
    awbNumber: string,
    fileType: "pdf" | "prn" = "pdf",
  ): Promise<ShadowfaxLabelResponse> {
    return this.client.generateLabel(awbNumber, fileType);
  }

  fetchPod(awbNumbers: string[]): Promise<ShadowfaxPodResponse> {
    return this.client.fetchPod(awbNumbers);
  }
}
