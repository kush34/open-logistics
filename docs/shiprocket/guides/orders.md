---
description: "Create Shiprocket orders in TypeScript with the SDK, including required payload fields and responses."
---

# Shiprocket orders guide

`ShiprocketClient` exposes direct order methods for creating, listing, fetching,
and cancelling Shiprocket orders.

## Methods

- `createOrder(payload)`
- `listOrders(page = 1, perPage = 20)`
- `getOrder(orderId)`
- `cancelOrders(ids)`

## Pagination and cancellation

`listOrders()` returns `data` plus `meta.pagination` with `total`, `count`,
`per_page`, `current_page`, and `total_pages`. Pass page and page size
explicitly when iterating large order lists.

`cancelOrders()` accepts an array of numeric order ids and returns a
`{ message }` response from Shiprocket.

## Example

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

## Notes

- `createOrder` uses the Shiprocket `orders/create/adhoc` endpoint
- `cancelOrders` accepts an array of numeric order ids
