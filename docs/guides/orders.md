# Orders

The `orders` resource wraps Shiprocket order operations.

## Methods

- `create(payload)`
- `list(page = 1, perPage = 20)`
- `get(orderId)`
- `cancel(ids)`

## Example

```ts
const order = await sdk.orders.create({
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

- `create` uses the Shiprocket `orders/create/adhoc` endpoint
- `cancel` accepts an array of numeric order ids
