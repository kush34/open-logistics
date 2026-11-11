import { Delhivery } from "./delhivery/index.js";
import { Shiprocket } from "./shiprocket/index.js";
import type { DelhiveryCredentials } from "./delhivery/types/index.js";
import type { AuthCredentials } from "./shiprocket/types/index.js";

export type OpenLogisticsProvider = "shiprocket" | "delhivery";

export type OpenLogisticsConfig =
  | ({ provider: "shiprocket" } & AuthCredentials)
  | ({ provider: "delhivery" } & DelhiveryCredentials);

type Facade<P extends OpenLogisticsProvider> = P extends "shiprocket"
  ? Shiprocket
  : Delhivery;

type Resource<P extends OpenLogisticsProvider, K extends PropertyKey> =
  Facade<P> extends infer F
    ? F extends Record<K, infer R>
      ? R
      : undefined
    : never;

/**
 * Provider-agnostic entry point. `provider` decides which vendor API each
 * resource call goes to. Resources the provider does not offer are `undefined`.
 */
export class OpenLogistics<
  P extends OpenLogisticsProvider = OpenLogisticsProvider
> {
  public orders!: Resource<P, "orders">;
  public shipments!: Resource<P, "shipments">;
  public tracking!: Resource<P, "tracking">;
  public rates!: Resource<P, "rates">;
  public courier!: Resource<P, "courier">;
  public serviceability!: Resource<P, "serviceability">;
  public waybills!: Resource<P, "waybills">;

  constructor(config: OpenLogisticsConfig & { provider: P }) {
    if (config.provider === "shiprocket") {
      Object.assign(this, new Shiprocket(config as AuthCredentials));
    } else {
      Object.assign(this, new Delhivery(config as DelhiveryCredentials));
    }
  }
}
