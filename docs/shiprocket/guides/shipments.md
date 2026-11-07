---
description: "Shiprocket shipment workflows in the SDK: pickup generation, labels, and manifests."
---

# Shiprocket shipments guide

`ShiprocketClient` exposes direct shipment methods for pickups, labels, and
manifests.

## Methods

- `generatePickup(payload)`
- `generateLabel(payload)`
- `generateManifest(payload)`
- `printManifest(orderId)`

## Example

```ts
await sdk.generatePickup({ shipment_id: [456] });
await sdk.generateLabel({ shipment_id: [456] });
await sdk.generateManifest({ shipment_id: [456] });
await sdk.printManifest(456);
```

## Notes

- Shipment identifiers are passed as arrays for pickup, label, and manifest generation
- `generatePickup()` returns pickup status and appointment date
- `generateLabel()` returns `label_created` and `url`
- `printManifest` wraps the order id in `order_ids`
