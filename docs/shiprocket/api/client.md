---
description: "Create a ShiprocketClient with email and password, and call orders, shipments, tracking, courier, and rate methods."
---

# Shiprocket client

`OpenLogistics` with `provider: "shiprocket"` is the recommended entry point. It
exposes the same operations grouped into resources. `ShiprocketClient` remains
the direct, flat-method client exported from the package root.

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

## Resource facades

The same operations are also available through the `Shiprocket` facade, which owns one client and groups methods into resources. The facade is deprecated in favour of `OpenLogistics({ provider: "shiprocket", ... })` and will be removed after two more releases.

- `orders`: `create`, `list`, `get`, `cancel`
- `shipments`: `generatePickup`, `generateLabel`, `generateManifest`, `printManifest`
- `courier`: `serviceability`, `assignAWB`, `list`
- `tracking`: `byAWB`, `byShipmentId`, `byOrderId`
- `rates`: `check`

```ts
import { Shiprocket } from "open-logistics";

const sdk = new Shiprocket({ email: "...", password: "..." });
const order = await sdk.orders.create({ ... });
const tracking = await sdk.tracking.byAWB("1234567890");
```

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
