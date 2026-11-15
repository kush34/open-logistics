---
description: "The Open-Logistics error model: ShiprocketAPIError, DelhiveryAPIError, and IthinkAPIError fields, status codes, and when each is thrown."
---

# Error model

The SDK has three dedicated public error classes: `ShiprocketAPIError`,
`DelhiveryAPIError`, and `IthinkAPIError`.

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

## Error sources

- Authentication failures (plain `Error`: `Auth failed: ...` for Shiprocket login, `Delhivery token is required` / `Delhivery clientName is required` for missing Delhivery credentials, `iThink accessToken is required` / `iThink secretKey is required` for missing iThink credentials)
- Shiprocket API response failures (`ShiprocketAPIError`)
- Delhivery API response failures (`DelhiveryAPIError`)
- iThink API response failures (`IthinkAPIError`)
- Network failures raised by `fetch`

## Retry behavior

- The Shiprocket client refreshes the token and retries when a request returns `401`, with no cap on refreshes
- The Delhivery and iThink clients perform no retries
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
