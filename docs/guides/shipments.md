# Shipments

The `shipments` resource covers label and manifest generation plus pickup creation.

## Methods

- `generatePickup(payload)`
- `generateLabel(payload)`
- `generateManifest(payload)`
- `printManifest(orderId)`

## Example

```ts
await sdk.shipments.generatePickup({ shipment_id: [456] });
await sdk.shipments.generateLabel({ shipment_id: [456] });
await sdk.shipments.generateManifest({ shipment_id: [456] });
await sdk.shipments.printManifest(456);
```

## Notes

- Shipment identifiers are passed as arrays for pickup, label, and manifest generation
- `printManifest` wraps the order id in `order_ids`
