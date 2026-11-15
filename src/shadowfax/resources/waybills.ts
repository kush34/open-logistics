import type { ShadowfaxClient } from "../client.js";
import type {
  ShadowfaxAwbPoolQuery,
  ShadowfaxAwbPoolResponse,
  ShadowfaxAwbRequestPayload,
  ShadowfaxAwbRequestResponse,
  ShadowfaxAwbResultResponse,
} from "../types/index.js";

export class Waybills {
  constructor(private client: ShadowfaxClient) {}

  /** Pool replenishment — may return AWBs already sitting in your unused pool. */
  generatePool(
    params: ShadowfaxAwbPoolQuery = {},
  ): Promise<ShadowfaxAwbPoolResponse> {
    return this.client.generateAwbs(params);
  }

  /** Always-fresh AWBs. Submit, then poll `poll()` with the returned request ID. */
  request(
    payload: ShadowfaxAwbRequestPayload = {},
  ): Promise<ShadowfaxAwbRequestResponse> {
    return this.client.requestAwbs(payload);
  }

  poll(requestId: number): Promise<ShadowfaxAwbResultResponse> {
    return this.client.pollAwbs(requestId);
  }
}
