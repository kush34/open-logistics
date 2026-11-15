import { IthinkClient, IthinkAPIError } from "./client.js";
import { Orders } from "./resources/orders.js";
import { Shipments } from "./resources/shipments.js";
import { Tracking } from "./resources/tracking.js";
import { Rates } from "./resources/rates.js";
import { Serviceability } from "./resources/serviceability.js";
import type { IthinkCredentials } from "./types/index.js";

/**
 * iThink Logistics facade owning `orders`, `shipments`, `tracking`, `rates`,
 * and `serviceability` resources.
 *
 * @deprecated Use `OpenLogistics` with `provider: "ithink"`.
 * Kept for two more releases.
 */
export class Ithink {
  public orders: Orders;
  public shipments: Shipments;
  public tracking: Tracking;
  public rates: Rates;
  public serviceability: Serviceability;

  constructor(credentials: IthinkCredentials) {
    const client = new IthinkClient(credentials);
    this.orders = new Orders(client);
    this.shipments = new Shipments(client);
    this.tracking = new Tracking(client);
    this.rates = new Rates(client);
    this.serviceability = new Serviceability(client);
  }
}

export { IthinkClient, IthinkAPIError };
export * from "./types/index.js";
