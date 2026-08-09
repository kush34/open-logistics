# Architecture

Open-Logistics is the package name, but the current repository architecture is a single-provider Shiprocket SDK.

## Structure

- `Shiprocket` is the public facade
- `ShiprocketClient` handles authentication and HTTP requests
- Resource classes wrap Shiprocket endpoints:
  - `orders`
  - `shipments`
  - `courier`
  - `tracking`
  - `rates`

## Request flow

```text
Shiprocket.orders.create()
  -> ShiprocketClient.request()
  -> authenticate if needed
  -> add bearer token
  -> call Shiprocket API
  -> parse JSON
  -> return typed response or throw ShiprocketAPIError
```

## Important behavior

- Authentication is cached in memory
- The client retries once after a `401`
- Responses are generally returned as Shiprocket payloads without deep normalization

## Not implemented

- Multi-vendor provider registry
- Routing strategies such as cheapest, fastest, preferred, or fallback
- Webhook helpers
- Cross-provider normalization
