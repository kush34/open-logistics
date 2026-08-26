# Shipments

`ShiprocketClient` exposes direct shipment methods.

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
- `printManifest` wraps the order id in `order_ids`
