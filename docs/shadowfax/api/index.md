---
description: "Shadowfax API reference: client setup, orders, shipments, tracking, rates, serviceability, and waybills."
---

# Shadowfax API reference

Shadowfax-specific API pages live here. All pages cover the Forward Logistics
API; see the [overview](/shadowfax/) for what is out of scope.

## Resources

- [Client](/shadowfax/api/client)
- [Orders](/shadowfax/api/orders)
- [Shipments](/shadowfax/api/shipments)
- [Tracking](/shadowfax/api/tracking)
- [Rates](/shadowfax/api/rates)
- [Serviceability](/shadowfax/api/serviceability)
- [Waybills](/shadowfax/api/waybills)
- [Errors](/concepts/error-model)

## Resource facades

The same operations are also available through the `Shadowfax` facade, which
owns one client and groups methods into resources. The facade is deprecated in
favour of `OpenLogistics({ provider: "shadowfax", ... })` and will be removed
after two more releases.

- `orders`: `create`, `update`, `cancel`
- `shipments`: `generateLabel`, `fetchPod`
- `tracking`: `byWaybill`, `byWaybills`
- `rates`: `calculate`
- `serviceability`: `check`
- `waybills`: `generatePool`, `request`, `poll`

```ts
import { Shadowfax } from "open-logistics";

const sdk = new Shadowfax({ token: "..." });
const shipment = await sdk.orders.create({ ... });
const tracking = await sdk.tracking.byWaybill("SF1234567890");
```
