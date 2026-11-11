# open-logistics

Open-Logistics is the package name for a TypeScript SDK that currently ships Shiprocket and Delhivery client APIs.

## Install

```bash
npm install open-logistics
```

## Minimal usage

```ts
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({
  provider: "delhivery", // or "shiprocket"
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
provider does not offer (for example `courier` on Delhivery, `waybills` on
Shiprocket) are `undefined`.

The provider-specific `Shiprocket` and `Delhivery` facades from earlier versions
still work and will be removed after two more releases.

## Public surface

| Export                                    | Description                              |
| ----------------------------------------- | ---------------------------------------- |
| `OpenLogistics`                           | Provider-agnostic client; `provider` selects the vendor |
| `ShiprocketClient`                        | Shiprocket client API (auth + direct methods) |
| `DelhiveryClient`                         | Delhivery B2C client API (direct methods)     |
| `Shiprocket`                              | Shiprocket facade owning `orders`, `shipments`, `courier`, `tracking`, `rates` resources |
| `Delhivery`                               | Delhivery facade owning `orders`, `shipments`, `tracking`, `rates`, `serviceability`, `waybills` resources |
| `ShiprocketAPIError`                      | Normalized API error                     |
| `DelhiveryAPIError`                       | Normalized Delhivery API error           |
| Types from `src/shiprocket/types/index.ts` | Shiprocket request and response shapes  |
| Types from `src/delhivery/types/index.ts` | Delhivery request and response shapes    |

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

