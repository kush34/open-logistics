# open-logistics

Open-Logistics is the package name for a TypeScript SDK that currently ships Shiprocket and Delhivery client APIs.

## Install

```bash
npm install open-logistics
```

## Minimal usage

```ts
import { ShiprocketClient, DelhiveryClient } from "open-logistics";

const shiprocket = new ShiprocketClient({
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});

const delhivery = new DelhiveryClient({
  token: process.env.DELHIVERY_TOKEN!,
  clientName: process.env.DELHIVERY_CLIENT_NAME!,
});

const order = await delhivery.createOrder({
  order_id: "ORD-001",
  pickup_location: { name: "Primary Warehouse" },
  package_type: "Pre-paid",
  name: "John Doe",
  add: "123 Street",
  phone: "9999999999",
  pin: "400001",
});
```

## Public surface

| Export                                    | Description                              |
| ----------------------------------------- | ---------------------------------------- |
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
