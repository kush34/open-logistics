# Normalization

The SDK uses a mix of TypeScript interfaces and raw Shiprocket responses.

## What is normalized

- Request shapes for supported operations are typed in `src/types/index.ts`
- `ShiprocketAPIError` normalizes API failures into a consistent error class

## What is not normalized

- Many responses are returned as Shiprocket JSON payloads
- Several methods return `unknown`
- There is no vendor-to-vendor mapping layer

## Practical consequence

Consumers should inspect the documented response type for each method, but they should not assume the SDK performs broad shape translation beyond the declared interfaces.
