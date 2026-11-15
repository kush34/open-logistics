---
description: "Shadowfax create-order example with ShadowfaxClient: credentials, forward order payload, and the AWB returned by the API."
---

# Shadowfax create order

Create a forward order with `ShadowfaxClient`. Shadowfax expects flat
`customer_details`, `order_details`, `pickup_details`, `return_details`, and
`product_details` blocks, and returns the AWB in `data.awb_number`.

```ts
import { ShadowfaxClient } from "open-logistics";

const sdk = new ShadowfaxClient({
  token: process.env.SHADOWFAX_TOKEN!,
});

const order = await sdk.createOrder({
  customer_details: {
    name: "Rahul Sharma",
    contact: "9876543210",
    address_line_1: "42 MG Road, Koramangala",
    city: "BANGALORE",
    pincode: 560034,
  },
  order_details: {
    client_order_id: "FWD-001",
    product_value: 1299,
    payment_mode: "prepaid",
    cod_amount: 0,
    order_service: "Regular",
  },
  pickup_details: {
    pickup_type: "seller",
    name: "TechStore Pvt Ltd",
    contact: "9876543211",
    address_line_1: "15 Industrial Area Phase 2",
    city: "BANGALORE",
    pincode: 560058,
  },
  return_details: {
    return_type: "seller",
    name: "TechStore Pvt Ltd",
    contact: "9876543211",
    address_line_1: "15 Industrial Area Phase 2",
    city: "BANGALORE",
    pincode: 560058,
  },
  product_details: [
    {
      sku_name: "Wireless Bluetooth Headphones",
      sku_id: "SKU-HEADPHONE-001",
      price: 1299,
      category: "Electronics",
    },
  ],
});

if (!order.success) {
  throw new Error(`${order.message}: ${JSON.stringify(order.errors)}`);
}

console.log(order.awb_number, order.status);
```

The response exposes `success`, `message`, `awb_number`, `client_order_id`,
`status`, `status_display`, `data`, `errors`, and `raw`. Feed the AWB into:

- `sdk.trackByAwb()`
- `sdk.generateLabel()`
- `sdk.updateOrder()`
- `sdk.cancelOrder()`

A rejection still arrives as HTTP 200, so branch on `order.success`, not the
HTTP status.
