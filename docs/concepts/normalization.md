# Normalization

The SDK uses a mix of TypeScript interfaces, raw provider responses, and Delhivery response mapping.

## What is normalized

- Request shapes for supported operations are typed in `src/shiprocket/types/index.ts` and `src/delhivery/types/index.ts`
- `ShiprocketAPIError` and `DelhiveryAPIError` normalize API failures into consistent error classes
- Delhivery responses are mapped into stable shapes (field-name aliases resolved, e.g. `waybill` / `awb` / `wbn`), and every mapped Delhivery response carries the original payload in `raw`

## What is not normalized

- Many Shiprocket responses are returned as Shiprocket JSON payloads
- Several Shiprocket methods return `unknown`
- There is no vendor-to-vendor mapping layer

## Practical consequence

Consumers should inspect the documented response type for each method, but they should not assume the SDK performs broad shape translation beyond the declared interfaces.
