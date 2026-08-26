import type { ShiprocketClient } from "../client.js";
import type {
  CreateOrderPayload,
  OrderResponse,
  PaginatedResponse,
} from "../types/index.js";

export class Orders {
  constructor(private client: ShiprocketClient) {}

  create(payload: CreateOrderPayload): Promise<OrderResponse> {
    return this.client.request("POST", "/orders/create/adhoc", payload);
  }

  list(page = 1, perPage = 20): Promise<PaginatedResponse<OrderResponse>> {
    return this.client.request("GET", "/orders", undefined, {
      page,
      per_page: perPage,
    });
  }

  get(orderId: number): Promise<OrderResponse> {
    return this.client.request("GET", `/orders/show/${orderId}`);
  }

  cancel(ids: number[]): Promise<{ message: string }> {
    return this.client.request("POST", "/orders/cancel", {
      ids,
    });
  }
}
