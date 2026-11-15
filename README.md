# open-logistics

Open-Logistics is the package name for a TypeScript SDK that currently ships
Shiprocket, Delhivery, and iThink Logistics client APIs.

## Install

```bash
npm install open-logistics
```

## Minimal usage

```ts
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({
  provider: "delhivery", // or "shiprocket" / "ithink"
  token: process.env.DELHIVERY_TOKEN!,
  clientName: process.env.DELHIVERY_CLIENT_NAME!,
});

const order = await openLogistics.orders.create({
  order_id: "ORD-001",
  pickup_location: { name: "Primary Warehouse" },
  package_type: "Pre-paid",
  name: "John Doe",
  add: "123 Street",
  phone: "9999999999",
  pin: "400001",
});

const tracking = await openLogistics.tracking.byWaybill(order.waybill!);
```

`provider` decides which vendor API every resource call goes to. Resources a
provider does not offer (for example `courier` on Delhivery and iThink,
`waybills` on Shiprocket and iThink) are `undefined`.

The provider-specific `Shiprocket`, `Delhivery`, and `Ithink` facades are also
exported. They are deprecated in favour of `OpenLogistics` and will be removed
after two more releases.

## iThink Logistics

```ts
import { OpenLogistics } from "open-logistics";

const ithink = new OpenLogistics({
  provider: "ithink",
  accessToken: process.env.ITHINK_ACCESS_TOKEN!,
  secretKey: process.env.ITHINK_SECRET_KEY!,
});

const order = await ithink.orders.create({
  pickup_address_id: 24,
  shipments: [{ order: "ORD-001", /* ...shipment fields */ }],
});

const tracking = await ithink.tracking.byWaybill(order.waybill!);
```

The default host is `https://my.ithinklogistics.com`; pass `baseUrl:
"https://pre-alpha.ithinklogistics.com"` for staging.

## Public surface

| Export                                    | Description                              |
| ----------------------------------------- | ---------------------------------------- |
| `OpenLogistics`                           | Provider-agnostic client; `provider` selects the vendor |
| `ShiprocketClient`                        | Shiprocket client API (auth + direct methods) |
| `DelhiveryClient`                         | Delhivery B2C client API (direct methods)     |
| `IthinkClient`                            | iThink Logistics client API (direct methods)  |
| `Shiprocket`                              | Shiprocket facade owning `orders`, `shipments`, `courier`, `tracking`, `rates` resources |
| `Delhivery`                               | Delhivery facade owning `orders`, `shipments`, `tracking`, `rates`, `serviceability`, `waybills` resources |
| `Ithink`                                  | iThink facade owning `orders`, `shipments`, `tracking`, `rates`, `serviceability` resources |
| `ShiprocketAPIError`                      | Normalized API error                     |
| `DelhiveryAPIError`                       | Normalized Delhivery API error           |
| `IthinkAPIError`                          | Normalized iThink API error              |
| Types from `src/shiprocket/types/index.ts` | Shiprocket request and response shapes  |
| Types from `src/delhivery/types/index.ts` | Delhivery request and response shapes    |
| Types from `src/ithink/types/index.ts`    | iThink request and response shapes       |

## Documentation

The full documentation is available at:

https://open-logistics.vercel.app/

You can find the documentation source in the `docs/` directory.

## Other languages

Python and Rust clients are generated from the OpenAPI specs in `specs/`. Method
names come from `operationId`, so they match across languages (`orders_create`,
`tracking_by_awb`, …); see `packages/README.md` for usage.

```bash
./scripts/gen.sh          # regenerate specs/*.json + both clients
./scripts/gen.sh --check  # verify checked-in output matches the specs
```

Do not edit `packages/` by hand. Change `specs/*.yaml` and regenerate.

