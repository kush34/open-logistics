# Error model

The SDK has two dedicated public error classes: `ShiprocketAPIError` and `DelhiveryAPIError`.

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

## Error sources

- Authentication failures (plain `Error`: `Auth failed: ...` for Shiprocket login, `Delhivery token is required` / `Delhivery clientName is required` for missing Delhivery credentials)
- Shiprocket API response failures (`ShiprocketAPIError`)
- Delhivery API response failures (`DelhiveryAPIError`)
- Network failures raised by `fetch`

## Retry behavior

- The Shiprocket client retries once when a request returns `401`
- The Delhivery client performs no retries
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
