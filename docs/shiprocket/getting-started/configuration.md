---
description: "ShiprocketClient configuration: credentials, API base URL, and token lifecycle."
---

# Shiprocket configuration

The current Shiprocket client accepts only Shiprocket credentials.

```ts
new ShiprocketClient({
  email: "your@email.com",
  password: "yourpassword",
});
```

## What is configurable today

| Option | Type | Required | Notes |
| --- | --- | --- | --- |
| `email` | `string` | yes | Shiprocket account email |
| `password` | `string` | yes | Shiprocket account password |

- Authentication credentials
- Request payloads for each client method
- Pagination values for `listOrders(page, perPage)`

The API base URL is fixed at `https://apiv2.shiprocket.in/v1/external`. Cached
tokens are reused for roughly 10 days or until Shiprocket returns `401`.

## What is not configurable yet

- Global retry policy
- Per-provider configuration
- Provider selection or fallback routing
- Timeout settings
- Base URL overrides

## Practical guidance

If you need those controls, they are gaps in the current implementation rather than hidden options.
