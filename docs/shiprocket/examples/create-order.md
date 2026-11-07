---
description: "Shiprocket create-order example with ShiprocketClient credentials, a full payload, and the returned order response."
---

# Example: create an order

Create a Shiprocket order with `ShiprocketClient`. The client authenticates with
your email and password on the first request, caches the bearer token, and
reuses it for later calls.

```ts
import { ShiprocketClient } from "open-logistics";

const sdk = new ShiprocketClient({
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});

const order = await sdk.createOrder({
  order_id: "ORD-001",
  order_date: "2026-01-01 10:00",
  pickup_location: "Primary",
  billing_customer_name: "John",
  billing_address: "123 Street",
  billing_city: "Mumbai",
  billing_pincode: "400001",
  billing_state: "Maharashtra",
  billing_country: "India",
  billing_email: "john@example.com",
  billing_phone: "9999999999",
  shipping_is_billing: true,
  order_items: [{ name: "Item", sku: "SKU1", units: 1, selling_price: 500 }],
  payment_method: "prepaid",
  sub_total: 500,
  length: 10,
  breadth: 10,
  height: 10,
  weight: 0.5,
});

console.log(order);
```

The response is an `OrderResponse` containing the Shiprocket order identifiers
and status. Use the returned `order_id` and `shipment_id` with
[shipments](/shiprocket/api/shipments) and [tracking](/shiprocket/api/tracking).
