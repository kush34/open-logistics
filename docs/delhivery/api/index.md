# Delhivery API reference

Delhivery-specific API pages live here.

## Resources

- [Client](/delhivery/api/client)
- [Orders](/delhivery/api/orders)
- [Shipments](/delhivery/api/shipments)
- [Tracking](/delhivery/api/tracking)
- [Rates](/delhivery/api/rates)
- [Serviceability](/delhivery/api/serviceability)
- [Waybills](/delhivery/api/waybills)
- [Errors](/shiprocket/api/errors)

## Resource facades

The same operations are also available through the `Delhivery` facade, which owns one client and groups methods into resources:

- `orders`: `create`, `update`, `cancel`
- `shipments`: `generateLabel`, `createPickupRequest`
- `tracking`: `byWaybill`, `byOrderId`, `byWaybills`
- `rates`: `calculate`
- `serviceability`: `check`
- `waybills`: `fetchOne`, `fetchBulk`

```ts
import { Delhivery } from "open-logistics";

const sdk = new Delhivery({ token: "...", clientName: "..." });
const shipment = await sdk.orders.create({ ... });
const tracking = await sdk.tracking.byWaybill("1234567890");
```
