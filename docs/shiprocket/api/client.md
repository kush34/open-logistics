# Shiprocket client

The public Shiprocket entry point is the `ShiprocketClient` class exported from the package root.

## Constructor

```ts
new ShiprocketClient(credentials: AuthCredentials)
```

## Credentials

```ts
interface AuthCredentials {
  email: string;
  password: string;
}
```

## Exposed methods

- `createOrder(payload)`
- `listOrders(page?, perPage?)`
- `getOrder(orderId)`
- `cancelOrders(ids)`
- `generatePickup(payload)`
- `generateLabel(payload)`
- `generateManifest(payload)`
- `printManifest(orderId)`
- `trackByAWB(awbCode)`
- `trackByShipmentId(shipmentId)`
- `trackByOrderId(orderId)`
- `checkServiceability(params)`
- `calculateRates(params)`
- `assignAWB(payload)`
- `listCouriers()`

## Example

```ts
import { ShiprocketClient } from "open-logistics";

const sdk = new ShiprocketClient({
  email: "your@email.com",
  password: "yourpassword",
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
```
