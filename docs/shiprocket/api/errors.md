---
description: "ShiprocketAPIError fields and examples for handling failed Shiprocket API requests in TypeScript."
---

# Shiprocket errors

Failed Shiprocket API requests throw `ShiprocketAPIError`, which carries the HTTP status and the provider's field errors. Delhivery failures throw `DelhiveryAPIError`, which also exposes the parsed response body; see the [error model](/concepts/error-model) for both classes.

## `ShiprocketAPIError`

Thrown for non-OK Shiprocket responses. The response body is parsed to build `message` and `errors` but is not stored on the error.

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
  await sdk.listOrders();
} catch (error) {
  if (error instanceof ShiprocketAPIError) {
    console.log(error.statusCode);
  }
}
```
