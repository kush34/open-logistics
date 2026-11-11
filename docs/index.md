---
layout: home
title: Open-Logistics — Shiprocket and Delhivery SDK
titleTemplate: false
description: "Open-Logistics SDK documentation: one API for Shiprocket and Delhivery with TypeScript, Python, and Rust clients."
hero:
  text: One API for every Indian courier.
  tagline: Ship, track, and rate orders across Shiprocket and Delhivery with typed TypeScript, Python, and Rust clients.
  actions:
    - theme: brand
      text: Get started
      link: /getting-started/open-logistics
    - theme: alt
      text: API reference
      link: /shiprocket/api/client
---

## Overview

Open-Logistics is an MIT-licensed SDK that wraps the Shiprocket and Delhivery
logistics APIs in one typed interface. It ships a TypeScript package on npm plus
generated Python and Rust clients, and this site is its developer documentation.

Start with [installation](/getting-started/installation) and authentication, then move into the API reference and examples.

### Installation

::: code-group

```bash [npm]
npm install open-logistics
```

```bash [pip]
pip install open-logistics-sdk
```

```bash [cargo]
cargo add open-logistics
```

:::

### Minimal working example

::: code-group

```ts [TypeScript]
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({
  provider: "shiprocket",
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});

const tracking = await openLogistics.tracking.byAWB("1234567890");
```

```python [Python]
import os

from open_logistics.shiprocket import (
    ApiClient,
    AuthApi,
    AuthCredentials,
    Configuration,
    TrackingApi,
)

configuration = Configuration(host="https://apiv2.shiprocket.in/v1/external")
with ApiClient(configuration) as api_client:
    auth = AuthApi(api_client).auth_login(
        AuthCredentials(
            email=os.environ["SHIPROCKET_EMAIL"],
            password=os.environ["SHIPROCKET_PASSWORD"],
        )
    )
    configuration.access_token = auth.token
    tracking = TrackingApi(api_client).tracking_by_awb("1234567890")
```

```rust [Rust]
use open_logistics::shiprocket::apis::{
    auth_api, configuration::Configuration, tracking_api,
};
use open_logistics::shiprocket::models::AuthCredentials;

let mut configuration = Configuration::new();
let auth = auth_api::auth_login(
    &configuration,
    AuthCredentials {
        email: std::env::var("SHIPROCKET_EMAIL").expect("SHIPROCKET_EMAIL"),
        password: std::env::var("SHIPROCKET_PASSWORD").expect("SHIPROCKET_PASSWORD"),
    },
)
.await?;
configuration.bearer_access_token = Some(auth.token);

let tracking = tracking_api::tracking_by_awb(&configuration, "1234567890").await?;
```

:::

`OpenLogistics` is the TypeScript entry point: set `provider` to `"shiprocket"`
or `"delhivery"` and use the same resource names for either vendor. See the
[OpenLogistics client](/getting-started/open-logistics) guide. The Python and
Rust clients remain provider-specific.

### Core capabilities

- `OpenLogistics` provider-agnostic entry point
- `ShiprocketClient` direct methods
- `DelhiveryClient` direct methods
- Automatic token refresh on `401` for Shiprocket
- Static token auth for Delhivery
- Normalized `ShiprocketAPIError` for API failures
- Normalized `DelhiveryAPIError` for API failures

### Provider support

- Shiprocket
- Delhivery

### Start here

- [OpenLogistics client](/getting-started/open-logistics)
- [Shiprocket docs](/shiprocket/)
- [Delhivery docs](/delhivery/)
- [Python and Rust clients](/languages/)

## Frequently asked questions

### What is Open-Logistics?

Open-Logistics is a free, MIT-licensed SDK that wraps the Shiprocket and Delhivery logistics APIs in one typed interface. It is published for TypeScript, Python, and Rust.

### Which logistics providers are supported?

Shiprocket and Delhivery. Shiprocket covers orders, shipments, courier serviceability, tracking, rates, labels, and manifests. Delhivery covers B2C order creation and editing, cancellation, tracking, pincode serviceability, rates, labels, pickup requests, and waybills.

### Which programming languages can I use?

TypeScript, Python, and Rust. Install the TypeScript SDK with `npm install open-logistics`, the Python client with `pip install open-logistics-sdk` (import `open_logistics`), or the Rust client with `cargo add open-logistics`.

### Does the SDK handle authentication?

Yes. Shiprocket authenticates with an email and password, caches the token in memory, and refreshes it and retries the request when it returns `401`. Delhivery uses a static API token plus your registered client name, with no login endpoint or refresh flow.

### How do I choose between Shiprocket and Delhivery?

Use the `OpenLogistics` entry point and set `provider` to `"shiprocket"` or `"delhivery"` in the constructor. The chosen provider receives every resource call, and the payload and response types stay specific to that vendor.

### How are API errors surfaced?

Failed API calls throw `ShiprocketAPIError` or `DelhiveryAPIError` with the HTTP status. `ShiprocketAPIError` also carries the provider's field errors in `errors`; `DelhiveryAPIError` also carries the parsed response in `body`. Authentication and configuration problems throw a plain `Error`.

### Is Open-Logistics free to use?

Yes. The SDK is MIT-licensed with no paid tier. You still need your own Shiprocket or Delhivery account, and the providers' own pricing and rate limits apply.

### Can I use it in production?

The SDK is a thin typed wrapper over the provider APIs, so production suitability depends on your provider account, credentials, and rate limits. See [performance](/advanced/performance) and [retries](/advanced/retries) for the current behavior.

<DownloadStats />
