---
description: "Install and use the generated Open-Logistics Python and Rust clients, including imports, authentication, operation names, and differences from the TypeScript SDK."
---

# Python and Rust clients

The Python and Rust clients are generated from the OpenAPI specs in `specs/`
with `./scripts/gen.sh`. Method names come from `operationId`, so they match
across languages.

## Install

::: code-group

```bash [pip]
pip install open-logistics-sdk
```

```bash [cargo]
cargo add open-logistics
```

:::

## Python

```python
from open_logistics.shiprocket import ApiClient, AuthApi, AuthCredentials, Configuration, OrdersApi

configuration = Configuration(host="https://apiv2.shiprocket.in/v1/external")
with ApiClient(configuration) as api_client:
    auth = AuthApi(api_client).auth_login(AuthCredentials(email=..., password=...))
    configuration.access_token = auth.token
    order = OrdersApi(api_client).orders_create(payload)
```

Delhivery uses `api_key={"delhiveryToken": token}` plus
`api_key_prefix={"delhiveryToken": "Token"}`.

## Rust

```rust
let mut configuration = open_logistics::shiprocket::apis::configuration::Configuration::new();
let auth = open_logistics::shiprocket::apis::auth_api::auth_login(
    &configuration,
    AuthCredentials { email, password },
).await?;
configuration.bearer_access_token = Some(auth.token);
let order = open_logistics::shiprocket::apis::orders_api::orders_create(
    &configuration,
    payload,
).await?;
```

Delhivery sets `configuration.api_key = Some(ApiKey { prefix: Some("Token".into()), key: token })`.

## Method names

| TypeScript | Python | Rust |
| --- | --- | --- |
| `client.orders.create(...)` | `OrdersApi.orders_create(...)` | `orders_api::orders_create(...)` |
| `client.orders.list(...)` | `OrdersApi.orders_list(...)` | `orders_api::orders_list(...)` |
| `client.tracking.byAWB(...)` | `TrackingApi.tracking_by_awb(...)` | `tracking_api::tracking_by_awb(...)` |

## Differences from the TypeScript SDK

- Delhivery responses are returned raw. Tracking exposes `ShipmentData`;
  `rates_calculate` returns the provider's charge estimates; packing slips expose
  `pdf_url` and `packages_found`.
- Credentials are not injected into query parameters for Delhivery waybill
  helpers. Pass `cl`, `client_name`, and `token` explicitly when your account
  requires them.
- OpenAPI cannot describe two operations on the same path and method, so some
  TypeScript convenience aliases collapse. For example, Delhivery
  `createOrder`, `updateOrder`, and `cancelOrder` map to `orders_create` and
  `orders_edit`.

The generated sources live in `packages/python/open-logistics` and
`packages/rust/open-logistics`; do not edit them by hand. Change the specs and
regenerate with `./scripts/gen.sh`.
