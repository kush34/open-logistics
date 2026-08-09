# Errors API

## `ShiprocketAPIError`

Thrown for non-OK Shiprocket responses after the response body is parsed.

### Fields

- `message: string`
- `statusCode: number`
- `errors?: Record<string, string[]>`

## Auth errors

Authentication failures currently throw a plain `Error` with a human-readable message.

## Example

```ts
import { ShiprocketAPIError } from "open-logistics";

try {
  await sdk.orders.list();
} catch (error) {
  if (error instanceof ShiprocketAPIError) {
    console.log(error.statusCode);
  }
}
```
