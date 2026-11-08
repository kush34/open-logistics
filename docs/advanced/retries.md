---
description: "Retry behavior in the Open-Logistics SDK: automatic Shiprocket token refresh and request retry on HTTP 401."
---

# Retries

The only retry behavior implemented today is an automatic refresh-and-retry when Shiprocket returns `401`.

## Flow

1. Request is sent with a cached bearer token
2. If Shiprocket replies `401`, the token is refreshed
3. The same request is sent again

The client does not cap the number of refreshes, so a request that keeps returning `401` keeps refreshing. Treat repeated failures as a credentials or account problem.

## Not implemented

- Exponential backoff
- Retry caps by status code
- Configurable retry policies
