import { DelhiveryClient, DelhiveryAPIError } from "./client.js";
import { Orders } from "./resources/orders.js";
import { Shipments } from "./resources/shipments.js";
import { Tracking } from "./resources/tracking.js";
import { Rates } from "./resources/rates.js";
import { Serviceability } from "./resources/serviceability.js";
import { Waybills } from "./resources/waybills.js";
import type { DelhiveryCredentials } from "./types/index.js";

export class Delhivery {
  public orders: Orders;
  public shipments: Shipments;
  public tracking: Tracking;
  public rates: Rates;
  public serviceability: Serviceability;
  public waybills: Waybills;

  constructor(credentials: DelhiveryCredentials) {
    const client = new DelhiveryClient(credentials);
    this.orders = new Orders(client);
    this.shipments = new Shipments(client);
    this.tracking = new Tracking(client);
    this.rates = new Rates(client);
    this.serviceability = new Serviceability(client);
    this.waybills = new Waybills(client);
  }
}

export { DelhiveryClient, DelhiveryAPIError };
export * from "./types/index.js";
