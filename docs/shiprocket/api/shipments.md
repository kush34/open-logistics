# Shiprocket shipments

## `ShiprocketClient#generatePickup(payload)`

Returns a pickup creation response with pickup status and appointment date.

## `ShiprocketClient#generateLabel(payload)`

Returns a label generation response with `label_created` and `url`.

## `ShiprocketClient#generateManifest(payload)`

Returns a manifest URL.

## `ShiprocketClient#printManifest(orderId)`

Prints a manifest for a single order id.

## Types

See `GeneratePickupPayload`, `GenerateLabelPayload`, and `GenerateManifestPayload` in `src/shiprocket/types/index.ts`.
