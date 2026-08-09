# Shipments API

## `shipments.generatePickup(payload)`

Returns a pickup creation response with pickup status and appointment date.

## `shipments.generateLabel(payload)`

Returns a label generation response with `label_created` and `url`.

## `shipments.generateManifest(payload)`

Returns a manifest URL.

## `shipments.printManifest(orderId)`

Prints a manifest for a single order id.

## Types

See `GeneratePickupPayload`, `GenerateLabelPayload`, and `GenerateManifestPayload` in `src/types/index.ts`.
