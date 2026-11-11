---
description: "How Open-Logistics is structured: provider facades, resource modules, clients, and shared TypeScript types."
---

# Architecture

Open-Logistics is the package name. `OpenLogistics` is the recommended
TypeScript entry point: it takes a `provider` and delegates every resource call
to the matching provider facade. The provider-specific facades remain available.

## Structure

- `OpenLogistics` is the provider-agnostic public facade
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
OpenLogistics(provider)
  -> provider facade (Shiprocket or Delhivery)
  -> provider resource (orders, tracking, ...)
  -> provider client request
  -> provider response or provider error

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
