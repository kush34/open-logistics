# Error handling

The recommended error handling path is to catch `ShiprocketAPIError` for API failures and treat plain `Error` as auth or runtime failure.

```ts
import { ShiprocketAPIError } from "open-logistics";

try {
  await sdk.orders.create(payload);
} catch (error) {
  if (error instanceof ShiprocketAPIError) {
    if (error.statusCode === 422) {
      // Validation failure
    }
  }
}
```

## What the SDK does not do

- It does not classify errors into retryable and non-retryable buckets
- It does not expose a unified error code enum
- It does not normalize transport errors
