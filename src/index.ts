import { ShiprocketClient } from "./client.js";
import { Orders } from "./resources/orders.js";
import { Shipments } from "./resources/shipments.js";
import { Courier } from "./resources/courier.js";
import { Tracking } from "./resources/tracking.js";
import { Rates } from "./resources/rates.js";
import type { AuthCredentials } from "./types/index.js";

export class Shiprocket {
  public orders: Orders;
  public shipments: Shipments;
  public courier: Courier;
  public tracking: Tracking;
  public rates: Rates;

  constructor(credentials: AuthCredentials) {
    const client = new ShiprocketClient(credentials);
    this.orders = new Orders(client);
    this.shipments = new Shipments(client);
    this.courier = new Courier(client);
    this.tracking = new Tracking(client);
    this.rates = new Rates(client);
  }
}

// Named exports
export { ShiprocketAPIError } from "./client.js";
export * from "./types/index.js";
