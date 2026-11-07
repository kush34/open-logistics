---
description: "Delhivery create-order example with DelhiveryClient: credentials, shipment payload, and the waybill returned by the API."
---

# Delhivery create order

Create a B2C order with `DelhiveryClient`. The client adds your `clientName` as
the shipment `client`, wraps the payload in Delhivery's `format=json` envelope,
and normalizes the response.

```ts
import { DelhiveryClient } from "open-logistics";

const sdk = new DelhiveryClient({
  token: process.env.DELHIVERY_TOKEN!,
  clientName: process.env.DELHIVERY_CLIENT_NAME!,
});

const shipment = await sdk.createOrder({
  order_id: "ORD-001",
  pickup_location: { name: "Primary Warehouse" },
  package_type: "Pre-paid",
  name: "John Doe",
  add: "123 Street",
  phone: "9999999999",
  pin: "400001",
  city: "Mumbai",
  state: "MH",
  products_desc: "Shoes",
});

console.log(shipment.success, shipment.waybill, shipment.order_id);
```

The response exposes `success`, `message`, `order_id`, `waybill`, `status`,
`shipment_id`, and `raw`. If Delhivery returns a waybill in the create response,
you can feed that into:

- `sdk.trackByWaybill()`
- `sdk.generateLabel()`
- `sdk.createPickupRequest()`
