---
description: "The Open-Logistics error model: ShiprocketAPIError, DelhiveryAPIError, IthinkAPIError, and ShadowfaxAPIError fields, status codes, and when each is thrown."
---

# Error model

The SDK has four dedicated public error classes: `ShiprocketAPIError`,
`DelhiveryAPIError`, `IthinkAPIError`, and `ShadowfaxAPIError`.

## `ShiprocketAPIError`

Fields:

- `message`
- `statusCode`
- `errors?`

## `DelhiveryAPIError`

Fields:

- `message`
- `statusCode`
- `body?` — the parsed Delhivery response body, if any

## `IthinkAPIError`

Fields:

- `message`
- `statusCode`
- `body?` — the parsed iThink response body, if any

iThink can report a failure with HTTP `200` and an error body (`status: "error"`
or `status_code >= 400`). Tracking, rates, and serviceability throw
`IthinkAPIError` for these, with `statusCode` taken from the body's
`status_code` when present. Orders, cancellation, and documents return
`success: false` instead. See the [iThink client](/ithink/api/client) page.

## `ShadowfaxAPIError`

Fields:

- `message`
- `statusCode`
- `body?` — the parsed Shadowfax response body, if any

Shadowfax order creation returns HTTP `200` for rejected orders. The SDK does
not throw for these; check `success` and `message` on the response. See the
[Shadowfax client](/shadowfax/api/client) page.

## Error sources

- Authentication failures (plain `Error`: `Auth failed: ...` for Shiprocket login, `Delhivery token is required` / `Delhivery clientName is required` for missing Delhivery credentials, `iThink accessToken is required` / `iThink secretKey is required` for missing iThink credentials, `Shadowfax token is required` for a missing Shadowfax token)
- Shiprocket API response failures (`ShiprocketAPIError`)
- Delhivery API response failures (`DelhiveryAPIError`)
- iThink API response failures (`IthinkAPIError`)
- iThink batches above the documented limits (plain `Error`, thrown before the request)
- Shadowfax API response failures (`ShadowfaxAPIError`)
- Network failures raised by `fetch`

## Retry behavior

- The Shiprocket client refreshes the token and retries when a request returns `401`, with no cap on refreshes
- The Delhivery, iThink, and Shadowfax clients perform no retries
- Other failures are not retried

## Example

```ts
import { ShiprocketAPIError } from "open-logistics";

try {
  await sdk.orders.list();
} catch (error) {
  if (error instanceof ShiprocketAPIError) {
    console.log(error.statusCode);
    console.log(error.message);
    console.log(error.errors);
  }
}
```
