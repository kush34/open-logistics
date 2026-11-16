---
description: "Install and use the generated Open-Logistics Python and Rust clients, including imports, authentication, operation names, and differences from the TypeScript SDK."
---

# Python and Rust clients

The Python and Rust clients are generated from the OpenAPI specs in `specs/`
with `./scripts/gen.sh`. Method names come from `operationId`, so they match
across languages.

The `OpenLogistics` provider-agnostic entry point is TypeScript-only for now.
Python and Rust keep one module per provider; see the
[OpenLogistics client](/getting-started/open-logistics) for the TypeScript
surface.

```text
open_logistics.shiprocket
open_logistics.delhivery
open_logistics.ithink
open_logistics.shadowfax
```

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
`api_key_prefix={"delhiveryToken": "Token"}`. Shadowfax uses
`api_key={"shadowfaxToken": token}` with the same `Token` prefix.

iThink has no header or query auth: `access_token` and `secret_key` are fields
on every request model, inside the `data` object iThink expects.

```python
from open_logistics.ithink import (
    ApiClient,
    Configuration,
    IthinkOrderCreateData,
    IthinkOrderCreateRequest,
    OrdersApi,
)

configuration = Configuration(host="https://my.ithinklogistics.com")
with ApiClient(configuration) as api_client:
    request = IthinkOrderCreateRequest(
        data=IthinkOrderCreateData(
            access_token=..., secret_key=..., shipments=[...], pickup_address_id="24"
        )
    )
    order = OrdersApi(api_client).orders_create(request)
```

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
Shadowfax uses the same `ApiKey` value. iThink takes `access_token` and
`secret_key` as request-model fields instead, because it authenticates in the
JSON body.

## Method names

| TypeScript | Python | Rust |
| --- | --- | --- |
| `client.orders.create(...)` | `OrdersApi.orders_create(...)` | `orders_api::orders_create(...)` |
| `client.orders.list(...)` | `OrdersApi.orders_list(...)` | `orders_api::orders_list(...)` |
| `client.tracking.byAWB(...)` | `TrackingApi.tracking_by_awb(...)` | `tracking_api::tracking_by_awb(...)` |
| `client.tracking.byWaybill(...)` | `TrackingApi.tracking_fetch(...)` | `tracking_api::tracking_fetch(...)` |
| `client.rates.calculate(...)` | `RatesApi.rates_calculate(...)` | `rates_api::rates_calculate(...)` |

## Differences from the TypeScript SDK

- Every provider returns raw payloads. For iThink, order and tracking responses
  put per-shipment results under `data`, keyed by shipment or AWB. Shadowfax
  returns its `message`, `responseCode`, and `status` fields as-is, and can
  report a failure with HTTP 200. Check those fields yourself.
- Delhivery responses are returned raw. Tracking exposes `ShipmentData`;
  `rates_calculate` returns the provider's charge estimates; packing slips
  expose `pdf_url` and `packages_found`.
- Credentials are not injected into query parameters for Delhivery waybill
  helpers. Pass `cl`, `client_name`, and `token` explicitly when your account
  requires them.
- iThink credentials are request-model fields, not configuration. There is no
  SDK-side error normalization for the generated clients either: a 200 response
  with `status: "error"` is returned, not raised.
- Request fields the TypeScript SDK accepts as `number | string` are modeled as
  strings here; generated clients do not coerce types. Pass `"24"`, not `24`,
  for `pickup_address_id` and similar IDs. Shadowfax `pincodes` is one
  comma-separated string, not an array.
- `serviceability_check` returns the provider payload directly. For Shadowfax
  that is the array of pincodes; for iThink it is the `data` map keyed by
  pincode and courier.
- Shadowfax `tracking_fetch` takes the AWB as a path parameter, so the generated
  clients return one tracking payload rather than the TypeScript wrapper's
  normalized `waybills` and `scans` fields.
- Response fields that providers send as either numbers or numeric strings
  (`status_code`, `responseCode`, `shipping_rate`, `gst`, `request_id`,
  `delay_time`, pincode `code`) are untyped, so both forms parse. In Python
  they are `Optional[Any]`; in Rust they are `Option<Option<Value>>`, where the
  outer option means the field was missing and the inner one means it was null.
- OpenAPI cannot describe two operations on the same path and method, so some
  TypeScript convenience aliases collapse. For example, Delhivery
  `createOrder`, `updateOrder`, and `cancelOrder` map to `orders_create` and
  `orders_edit`; iThink `trackByWaybill` and `trackByWaybills` both map to
  `tracking_fetch`.

The generated sources live in `packages/python/open-logistics` and
`packages/rust/open-logistics`; do not edit them by hand. Change the specs and
regenerate with `./scripts/gen.sh`.

## FAQ

### Which languages are supported?

TypeScript (npm package `open-logistics`), Python (PyPI distribution `open-logistics-sdk`, import `open_logistics`), and Rust (crate `open-logistics`).

### Are the Python and Rust clients generated from the same API?

Yes. Both are generated from the OpenAPI specs in `specs/` with `./scripts/gen.sh`, using `operationId` values for method names.

### Do the Python and Rust clients return the same responses as TypeScript?

No. They use the same operation names, but return raw provider payloads, while the TypeScript SDK returns normalized responses for some resources. See [normalization](/concepts/normalization).

### Do I need to install the TypeScript SDK to use Python or Rust?

No. Each language has its own package and calls the provider APIs directly.
