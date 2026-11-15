import { ShadowfaxClient, ShadowfaxAPIError } from "./client.js";
import { Orders } from "./resources/orders.js";
import { Shipments } from "./resources/shipments.js";
import { Tracking } from "./resources/tracking.js";
import { Rates } from "./resources/rates.js";
import { Serviceability } from "./resources/serviceability.js";
import { Waybills } from "./resources/waybills.js";
import type { ShadowfaxCredentials } from "./types/index.js";

/**
 * @deprecated Use `OpenLogistics` with `provider: "shadowfax"`.
 * Kept for two more releases.
 */
export class Shadowfax {
  public orders: Orders;
  public shipments: Shipments;
  public tracking: Tracking;
  public rates: Rates;
  public serviceability: Serviceability;
  public waybills: Waybills;

  constructor(credentials: ShadowfaxCredentials) {
    const client = new ShadowfaxClient(credentials);
    this.orders = new Orders(client);
    this.shipments = new Shipments(client);
    this.tracking = new Tracking(client);
    this.rates = new Rates(client);
    this.serviceability = new Serviceability(client);
    this.waybills = new Waybills(client);
  }
}

export { ShadowfaxClient, ShadowfaxAPIError };
export * from "./types/index.js";
