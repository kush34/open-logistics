---
description: "Create, cancel, and bulk-cancel iThink Logistics orders with IthinkClient, including payload fields and response shapes."
---

# iThink Logistics orders

`IthinkClient` exposes order creation and cancellation. Each call returns a
normalized object with `success`, `message`, and `raw`, so you can read
convenience fields or fall back to the provider payload.

## `createOrder(payload)`

Posts to `/api_v3/order/add.json`. Up to 10 shipments can be created in one
request; a longer list throws an `Error` before the request is sent.

A failure body returned with HTTP 200 does not throw: `createOrder` returns
`success: false` with the provider `message` and the per-shipment results.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `shipments` | `IthinkShipmentPayload[]` | yes | One entry per package, maximum 10 |
| `pickup_address_id` | `number \| string` | yes | Warehouse ID registered with iThink |
| `logistics` | `string` | no | Preferred courier, for example `Delhivery` |
| `s_type` | `string` | no | Courier service type, for example `surface` |
| `order_type` | `"forward" \| "reverse"` | no | Defaults to forward |

Each shipment requires `order`, `order_date`, `total_amount`, `name`, `add`,
`pin`, `phone`, billing fields, `products`, dimensions, `weight`, and
`return_address_id`. `payment_mode` is `"COD"` or `"Prepaid"`; iThink treats a
missing value as COD.

```ts
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

console.log(order.waybill, order.order_id, order.tracking_url);
```

Response fields: `success`, `message`, `order_id`, `waybill`, `tracking_url`,
`shipments` (one normalized result per shipment), and `raw`.

## `cancelOrder(waybill)`

Cancels one shipment through `/api_v3/order/cancel.json`.

```ts
const cancel = await sdk.cancelOrder("86210010463");
console.log(cancel.success, cancel.waybills);
```

## `cancelMany(waybills)`

Cancels up to 100 AWBs in one request. The SDK joins the list with commas and
throws an `Error` before calling iThink for a longer list.

```ts
const cancel = await sdk.orders.cancelMany(["86210010463", "86210010464"]);
```

Response fields: `success`, `message`, `waybills`, and `raw`.
