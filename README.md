# open-logistics

Community TypeScript SDK for the [Shiprocket API](https://apidocs.shiprocket.in/).

## Install

```bash
npm install open-logistics
```

## Usage

```ts
import { Shiprocket } from "shiprocket-sdk";

const sr = new Shiprocket({
  email: "your@email.com",
  password: "yourpassword",
});

// Create order
const order = await sr.orders.create({ ... });

// Track shipment
const tracking = await sr.tracking.byAWB("1234567890");

// Check serviceability
const rates = await sr.courier.serviceability({
  pickup_postcode: "400001",
  delivery_postcode: "110001",
  weight: 0.5,
  cod: 0,
});

// Assign AWB
await sr.courier.assignAWB({
  shipment_id: "456",
  courier_id: "1",
});

// Generate pickup
await sr.shipments.generatePickup({ shipment_id: [456] });

// Generate label
await sr.shipments.generateLabel({ shipment_id: [456] });
```

## Error handling

```ts
import { ShiprocketAPIError } from "shiprocket-sdk";

try {
  await sr.orders.create({ ... });
} catch (err) {
  if (err instanceof ShiprocketAPIError) {
    console.error(err.statusCode, err.message, err.errors);
  }
}
```

## Resources

| Resource | Methods |
|---|---|
| `orders` | `create`, `list`, `get`, `cancel` |
| `shipments` | `generatePickup`, `generateLabel`, `generateManifest`, `printManifest` |
| `courier` | `serviceability`, `assignAWB`, `list` |
| `tracking` | `byAWB`, `byShipmentId`, `byOrderId` |
| `rates` | `check` |

## Contributing

PRs welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md).
