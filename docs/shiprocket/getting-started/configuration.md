# Configuration

The current Shiprocket client accepts only Shiprocket credentials.

```ts
new ShiprocketClient({
  email: "your@email.com",
  password: "yourpassword",
});
```

## What is configurable today

- Authentication credentials
- Request payloads for each client method
- Pagination values for `listOrders(page, perPage)`

## What is not configurable yet

- Global retry policy
- Per-provider configuration
- Provider selection or fallback routing
- Timeout settings
- Base URL overrides

## Practical guidance

If you need those controls, they are gaps in the current implementation rather than hidden options.
