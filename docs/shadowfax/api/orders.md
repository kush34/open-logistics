---
description: "Create, update, and cancel Shadowfax forward orders with ShadowfaxClient, including payload fields and response shapes."
---

# Shadowfax orders

`ShadowfaxClient` exposes three order methods. Each one returns a normalized
object with `success`, `message`, and `raw`, so you can read convenience fields
or fall back to the provider payload.

## `createOrder(payload)`

Posts to `/v3/clients/orders/` with the flat, nested payload Shadowfax expects.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `customer_details` | `ShadowfaxCustomerDetails` | yes | Delivery name, contact, address, city, pincode |
| `order_details` | `ShadowfaxOrderInfo` | yes | `client_order_id`, `product_value`, `payment_mode`, `cod_amount` |
| `pickup_details` | `ShadowfaxPickupAddress` | yes | Pickup address; `pickup_type` is `seller`, `origin`, or `warehouse` |
| `return_details` | `ShadowfaxReturnAddress` | yes | `return_type` is `seller` or `origin` |
| `product_details` | `ShadowfaxSkuItem[]` | yes | At least one SKU |
| `order_type` | `"marketplace" \| "warehouse" \| "d2d" \| "hyperlocal"` | no | Defaults to `marketplace` |

```ts
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
    { sku_name: "Headphones", sku_id: "SKU-1", price: 1299 },
  ],
});

if (!order.success) {
  console.error(order.message, order.errors);
}
```

Response fields: `success`, `message`, `awb_number`, `client_order_id`,
`status`, `status_display`, `data`, `errors`, `raw`.

### HTTP 200 does not always mean success

Shadowfax returns HTTP 200 for validation failures, unserviceable pincodes, and
bad payment modes. `success` is `true` only when `message` is `"Success"` (or
the order data is accepted); `errors` carries the detail as either a string or a
field-keyed object.

`client_order_id` is idempotent inside Shadowfax's retry window: resubmitting the
same ID returns the existing order rather than creating a duplicate.

## `updateOrder(payload)`

Updates an existing order through `/v3/clients/order_update/`. `awb_number` is
required; `delivery_details`, `pickup_details`, `return_details`,
`order_details`, and `status_update` are optional. Send only what changes.

```ts
await sdk.updateOrder({
  awb_number: "SF1234567890",
  delivery_details: { contact: "9999888877" },
});

await sdk.updateOrder({
  awb_number: "SF1234567890",
  status_update: { status: "reopen_ndr" },
});
```

Response fields: `success`, `message`, `raw`.

## `cancelOrder(requestId, cancelRemarks?)`

Cancels through `/v3/clients/orders/cancel/`. `requestId` accepts an AWB number
or a `client_order_id`; the optional remark is sent as `cancel_remarks`.

```ts
const cancel = await sdk.cancelOrder("SF1234567890", "Customer requested");
console.log(cancel.success, cancel.message);
```

Response fields: `success`, `message`, `request_id`, `responseCode`, `raw`.
Cancellation cannot be undone. For multi-package (MPS) orders, cancel the parent
AWB only.
