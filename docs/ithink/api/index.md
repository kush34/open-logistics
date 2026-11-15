---
description: "iThink Logistics API reference: client setup, orders, shipments, tracking, rates, and serviceability."
---

# iThink Logistics API reference

iThink-specific API pages live here.

## Resources

- [Client](/ithink/api/client)
- [Orders](/ithink/api/orders)
- [Shipments](/ithink/api/shipments)
- [Tracking](/ithink/api/tracking)
- [Rates](/ithink/api/rates)
- [Serviceability](/ithink/api/serviceability)
- [Errors](/shiprocket/api/errors)

## Resource facades

The same operations are also available through the `Ithink` facade, which owns
one client and groups methods into resources. `OpenLogistics({ provider:
"ithink", ... })` is the recommended entry point.

- `orders`: `create`, `cancel`, `cancelMany`
- `shipments`: `generateLabel`, `generateManifest`
- `tracking`: `byWaybill`, `byWaybills`
- `rates`: `calculate`
- `serviceability`: `check`

```ts
import { Ithink } from "open-logistics";

const sdk = new Ithink({ accessToken: "...", secretKey: "..." });
const shipment = await sdk.orders.create({ ... });
const tracking = await sdk.tracking.byWaybill("86210010463");
```
