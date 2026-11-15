---
description: "iThink Logistics create-order example with IthinkClient: credentials, shipment payload, and the waybill returned by the API."
---

# iThink Logistics create order

Create an order with `IthinkClient`. The client wraps your shipments in iThink's
`data` envelope and adds your `access_token` and `secret_key`.

```ts
import { IthinkClient } from "open-logistics";

const sdk = new IthinkClient({
  accessToken: process.env.ITHINK_ACCESS_TOKEN!,
  secretKey: process.env.ITHINK_SECRET_KEY!,
});

const order = await sdk.createOrder({
  pickup_address_id: 24,
  logistics: "Delhivery",
  shipments: [
    {
      order: "ORD-001",
      order_date: "2026-08-10",
      total_amount: 999,
      name: "John Doe",
      add: "123 Street",
      pin: "400001",
      city: "Mumbai",
      state: "MH",
      country: "India",
      phone: "9999999999",
      billing_name: "John Doe",
      billing_add: "123 Street",
      billing_pin: "400001",
      billing_phone: "9999999999",
      products: [
        { product_name: "Shoes", product_quantity: 1, product_price: 999 },
      ],
      shipment_length: 10,
      shipment_width: 10,
      shipment_height: 5,
      weight: 0.5,
      payment_mode: "Prepaid",
      return_address_id: 24,
    },
  ],
});

console.log(order.success, order.waybill, order.order_id);
```

The response exposes `success`, `message`, `order_id`, `waybill`,
`tracking_url`, `shipments`, and `raw`. If iThink returns a waybill, you can
feed it into:

- `sdk.trackByWaybill()`
- `sdk.generateLabel()`
- `sdk.generateManifest()`
