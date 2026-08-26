# Architecture

Open-Logistics is the package name. The current repository architecture exposes provider-specific facades for Shiprocket and Delhivery.

## Structure

- `Shiprocket` is the public facade for Shiprocket
- `Delhivery` is the public facade for Delhivery B2C
- `ShiprocketClient` handles authentication and HTTP requests for Shiprocket
- `DelhiveryClient` handles static-token HTTP requests for Delhivery
- Resource classes wrap Shiprocket endpoints:
  - `orders`
  - `shipments`
  - `courier`
  - `tracking`
  - `rates`
- Resource classes wrap Delhivery endpoints:
  - `orders`
  - `shipments`
  - `tracking`
  - `rates`
  - `serviceability`
  - `waybills`

## Request flow

```text
Shiprocket.orders.create()
  -> ShiprocketClient.request()
  -> authenticate if needed
  -> add bearer token
  -> call Shiprocket API
  -> parse JSON
  -> return typed response or throw ShiprocketAPIError

Delhivery.orders.create()
  -> DelhiveryClient.request()
  -> add static Token header
  -> call Delhivery API
  -> parse JSON or text
  -> return typed response or throw DelhiveryAPIError
```

## Important behavior

- Authentication is cached in memory for Shiprocket
- Delhivery uses a static token, so there is no login or token refresh flow
- Responses are generally returned as Shiprocket payloads without deep normalization

## Not implemented

- Multi-vendor provider registry
- Routing strategies such as cheapest, fastest, preferred, or fallback
- Webhook helpers
- Cross-provider normalization
