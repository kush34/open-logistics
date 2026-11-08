---
description: "Generate Shiprocket pickups, labels, and manifests with ShiprocketClient shipment methods."
---

# Shiprocket shipments

`ShiprocketClient` generates pickups, labels, and manifests for existing Shiprocket shipments.

## `generatePickup(payload)`

Schedules a pickup for one or more shipments.

```ts
const pickup = await sdk.generatePickup({ shipment_id: [123456] });
console.log(pickup);
```

`GeneratePickupPayload` accepts `shipment_id: number[]`. The response includes
the pickup status and appointment date from Shiprocket.

## `generateLabel(payload)`

Creates shipping labels and returns `label_created` plus a label `url`.

```ts
const label = await sdk.generateLabel({ shipment_id: [123456] });
console.log(label.label_created, label.url);
```

## `generateManifest(payload)`

Generates a manifest for one or more shipments and returns the manifest URL.

## `printManifest(orderId)`

Returns `{ manifest_url }` for a single numeric order id.

```ts
const manifest = await sdk.printManifest(987654);
console.log(manifest.manifest_url);
```

Payload types (`GeneratePickupPayload`, `GenerateLabelPayload`, and
`GenerateManifestPayload`) each accept `shipment_id: number[]`.

See the [shipments guide](/shiprocket/guides/shipments) for a walkthrough.
