# Error model

The SDK has one dedicated public error class: `ShiprocketAPIError`.

## `ShiprocketAPIError`

Fields:

- `message`
- `statusCode`
- `errors?`

## Error sources

- Authentication failures
- Shiprocket API response failures
- Network failures raised by `fetch`

## Retry behavior

- The client retries once when a request returns `401`
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
