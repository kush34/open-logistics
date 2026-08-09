# Retries

The only retry behavior implemented today is a single automatic refresh-and-retry when Shiprocket returns `401`.

## Flow

1. Request is sent with a cached bearer token
2. If Shiprocket replies `401`, the token is refreshed
3. The same request is sent again once

## Not implemented

- Exponential backoff
- Retry caps by status code
- Configurable retry policies
