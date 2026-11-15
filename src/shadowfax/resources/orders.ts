import type { ShadowfaxClient } from "../client.js";
import type {
  ShadowfaxCancelOrderResponse,
  ShadowfaxCreateOrderPayload,
  ShadowfaxCreateOrderResponse,
  ShadowfaxOrderUpdatePayload,
  ShadowfaxOrderUpdateResponse,
} from "../types/index.js";

export class Orders {
  constructor(private client: ShadowfaxClient) {}

  create(
    payload: ShadowfaxCreateOrderPayload,
  ): Promise<ShadowfaxCreateOrderResponse> {
    return this.client.createOrder(payload);
  }

  update(
    payload: ShadowfaxOrderUpdatePayload,
  ): Promise<ShadowfaxOrderUpdateResponse> {
    return this.client.updateOrder(payload);
  }

  cancel(
    requestId: string,
    cancelRemarks?: string,
  ): Promise<ShadowfaxCancelOrderResponse> {
    return this.client.cancelOrder(requestId, cancelRemarks);
  }
}
