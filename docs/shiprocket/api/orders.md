---
description: "Create, list, fetch, and cancel Shiprocket orders with ShiprocketClient and typed request payloads."
---

# Shiprocket orders

`ShiprocketClient` exposes order creation, listing, lookup, and cancellation methods. Each method returns the parsed Shiprocket response.

## Methods

| Method | Returns |
| --- | --- |
| `createOrder(payload)` | `OrderResponse` |
| `listOrders(page = 1, perPage = 20)` | `PaginatedResponse<OrderResponse>` |
| `getOrder(orderId)` | `OrderResponse` |
| `cancelOrders(ids)` | `{ message: string }` |

## `createOrder(payload)`

Sends an ad hoc order to Shiprocket's `orders/create/adhoc` endpoint.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `order_id` | `string` | yes | Your order reference |
| `order_date` | `string` | yes | `YYYY-MM-DD HH:mm` |
| `pickup_location` | `string` | yes | Registered pickup location |
| `billing_customer_name` | `string` | yes | Customer name |
| `billing_address` | `string` | yes | Billing address |
| `billing_city` | `string` | yes | Billing city |
| `billing_pincode` | `string` | yes | Billing pincode |
| `billing_state` | `string` | yes | Billing state |
| `billing_country` | `string` | yes | Billing country |
| `billing_email` | `string` | yes | Billing email |
| `billing_phone` | `string` | yes | Billing phone |
| `shipping_is_billing` | `boolean` | yes | Reuse billing details for shipping |
| `order_items` | `OrderItem[]` | yes | Name, SKU, units, and selling price |
| `payment_method` | `"prepaid" \| "COD"` | yes | Use the exact casing shown |
| `sub_total` | `number` | yes | Order subtotal |
| `length` / `breadth` / `height` / `weight` | `number` | yes | Package dimensions and weight |

```ts
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
```

## `listOrders(page, perPage)`

Returns `data` plus `meta.pagination` with `total`, `count`, `per_page`,
`current_page`, and `total_pages`.

## `getOrder(orderId)` and `cancelOrders(ids)`

`getOrder` takes a numeric order id. `cancelOrders` accepts an array of numeric
order ids and returns a message from Shiprocket.

See [Create order example](/shiprocket/examples/create-order) and the
[orders guide](/shiprocket/guides/orders) for the full flow.
