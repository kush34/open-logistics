---
description: "Create, update, and cancel Delhivery orders with DelhiveryClient, including payload fields and response shapes."
---

# Delhivery orders

`DelhiveryClient` exposes three order methods. Each one returns a normalized
object with `success`, `message`, and `raw`, so you can read convenience fields
or fall back to the provider payload.

## `createOrder(payload)`

Posts to `/api/cmu/create.json` using Delhivery's `format=json` wrapper. The
client adds `client` from your credentials and normalizes `address`/`add` and
`weight`/`gm`.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `order_id` | `string` | yes | Your order reference |
| `pickup_location` | `{ name: string }` | yes | Registered warehouse name |
| `package_type` | `"COD" \| "Pre-paid" \| "Pickup"` | yes | Also used as `payment_mode` when omitted |
| `name` | `string` | yes | Consignee name |
| `add` / `address` | `string` | yes | Consignee address; either field works |
| `phone` | `string` | yes | Consignee phone |
| `pin` | `string` | yes | Destination pincode |
| `gm` / `weight` | `number` | no | Weight in grams |
| `cod_amount` | `number` | COD only | Amount to collect |
| `shipment_length` / `shipment_width` / `shipment_height` | `number` | no | Dimensions in cm |
| `shipment` | `DelhiveryShipmentItem[]` | no | Item-level details |

```ts
const order = await sdk.createOrder({
  order_id: "ORD-001",
  pickup_location: { name: "Primary Warehouse" },
  package_type: "Pre-paid",
  name: "John Doe",
  add: "123 Street",
  phone: "9999999999",
  pin: "400001",
  gm: 500,
});

console.log(order.waybill, order.status, order.raw);
```

Response fields: `success`, `message`, `order_id`, `waybill`, `status`,
`shipment_id`, `raw`.

## `updateOrder(payload)`

Updates an existing Delhivery shipment. `waybill` is required; all other fields
are optional (`name`, `add`, `phone`, `product_details`, dimensions, `cod`,
`gm`, `pt`). The SDK posts to `/api/p/edit`.

```ts
await sdk.updateOrder({ waybill: "1234567890", gm: 750 });
```

## `cancelOrder(waybill)`

Cancels a shipment through the same edit endpoint using
`{ waybill, cancellation: true }`.

```ts
await sdk.cancelOrder("1234567890");
```
