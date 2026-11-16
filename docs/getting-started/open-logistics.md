---
description: "Use the OpenLogistics client to call Shiprocket, Delhivery, or iThink Logistics through one typed resource surface, with the provider selected at construction. Examples in TypeScript, Python, and Rust."
---

# OpenLogistics client

`OpenLogistics` is the provider-agnostic entry point in the TypeScript SDK. You
create one instance per provider, set `provider`, and then call resources the
same way for any vendor. The provider you choose decides which API receives
every request.

::: info Python and Rust are provider-specific
`OpenLogistics` exists only in the TypeScript SDK. The Python and Rust tabs on
this page show the same flows through each provider's own module
(`open_logistics.<provider>` / `open_logistics::<provider>`), generated from the
same OpenAPI specs.
:::

::: code-group

```ts [TypeScript]
import { OpenLogistics } from "open-logistics";
```

```python [Python]
from open_logistics import delhivery, ithink, shadowfax, shiprocket
```

```rust [Rust]
use open_logistics::{delhivery, ithink, shadowfax, shiprocket};
```

:::

## Why use it

- **One import.** No need to pick between provider classes at the import site;
  the choice moves into configuration.
- **One resource vocabulary.** `orders`, `shipments`, `tracking`, and `rates`
  exist on every provider, so code that uses those resources barely changes
  between vendors.
- **Provider-specific types.** Request payloads and responses stay typed for the
  selected vendor. A Delhivery payload is not accepted by a Shiprocket instance.
- **Predictable surface.** Resources the selected provider does not implement are
  `undefined` and are rejected by TypeScript when `provider` is a literal.

The first, second, and fourth points are TypeScript conveniences. The generated
Python and Rust clients keep the provider-specific types but expose one module
per provider, so the module name is what selects the API.

## Delhivery

::: code-group

```ts [TypeScript]
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({
  provider: "delhivery",
  token: process.env.DELHIVERY_TOKEN!,
  clientName: process.env.DELHIVERY_CLIENT_NAME!,
});

const order = await openLogistics.orders.create({
  order_id: "ORD-001",
  pickup_location: { name: "Primary Warehouse" },
  package_type: "Pre-paid",
  name: "John Doe",
  add: "123 Street",
  phone: "9999999999",
  pin: "400001",
});

const tracking = await openLogistics.tracking.byWaybill(order.waybill!);
```

```python [Python]
import json
import os

from open_logistics.delhivery import (
    ApiClient,
    Configuration,
    DelhiveryPickupLocation,
    DelhiveryShipmentPayload,
    OrdersApi,
    TrackingApi,
)

configuration = Configuration(
    host="https://track.delhivery.com",
    api_key={"delhiveryToken": os.environ["DELHIVERY_TOKEN"]},
    api_key_prefix={"delhiveryToken": "Token"},
)
with ApiClient(configuration) as api_client:
    order = OrdersApi(api_client).orders_create(
        format="json",
        data=json.dumps(
            {
                "shipments": [
                    DelhiveryShipmentPayload(
                        order_id="ORD-001",
                        client=os.environ["DELHIVERY_CLIENT_NAME"],
                        pickup_location=DelhiveryPickupLocation(
                            name="Primary Warehouse"
                        ),
                        package_type="Pre-paid",
                        name="John Doe",
                        add="123 Street",
                        phone="9999999999",
                        pin="400001",
                    ).to_dict()
                ]
            }
        ),
    )

    tracking = TrackingApi(api_client).tracking_fetch(waybill=order.waybill)
```

```rust [Rust]
use open_logistics::delhivery::apis::{
    configuration::{ApiKey, Configuration},
    orders_api, tracking_api,
};
use open_logistics::delhivery::models::{
    delhivery_shipment_payload::PackageType, DelhiveryPickupLocation, DelhiveryShipmentPayload,
};

let mut configuration = Configuration::new();
configuration.api_key = Some(ApiKey {
    prefix: Some("Token".into()),
    key: std::env::var("DELHIVERY_TOKEN").expect("DELHIVERY_TOKEN"),
});

let mut shipment = DelhiveryShipmentPayload::new(
    "ORD-001".into(),
    DelhiveryPickupLocation::new("Primary Warehouse".into()),
    PackageType::PrePaid,
    "John Doe".into(),
    "9999999999".into(),
    "400001".into(),
);
shipment.client = Some(std::env::var("DELHIVERY_CLIENT_NAME").expect("DELHIVERY_CLIENT_NAME"));
shipment.add = Some("123 Street".into());

let data = serde_json::json!({ "shipments": [shipment] }).to_string();
let order = orders_api::orders_create(&configuration, "json", &data).await?;
let tracking = tracking_api::tracking_fetch(&configuration, order.waybill.as_deref(), None).await?;

println!("{:?}", tracking.shipment_data);
```

:::

Delhivery credentials are the same as `new DelhiveryClient(...)`: a static API
`token` and your registered `clientName`. An optional `baseUrl` overrides the
default host. The generated clients take the token as
`api_key["delhiveryToken"]` with the `Token` prefix, and send
`format=json` with a JSON string of `{"shipments": [...]}`.

## Shadowfax

::: code-group

```ts [TypeScript]
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({
  provider: "shadowfax",
  token: process.env.SHADOWFAX_TOKEN!,
});

const order = await openLogistics.orders.create({
  customer_details: {
    name: "Rahul Sharma",
    contact: "9876543210",
    address_line_1: "42 MG Road, Koramangala",
    city: "BANGALORE",
    pincode: 560034,
  },
  order_details: {
    client_order_id: "FWD-001",
    product_value: 1299,
    payment_mode: "prepaid",
    cod_amount: 0,
  },
  pickup_details: { ... },
  return_details: { ... },
  product_details: [{ sku_name: "Headphones", sku_id: "SKU-1", price: 1299 }],
});

if (order.success) {
  await openLogistics.tracking.byWaybill(order.awb_number!);
}
```

```python [Python]
import os

from open_logistics.shadowfax import (
    ApiClient,
    Configuration,
    OrdersApi,
    ShadowfaxCreateOrderPayload,
    ShadowfaxCustomerDetails,
    ShadowfaxOrderInfo,
    ShadowfaxPickupAddress,
    ShadowfaxReturnAddress,
    ShadowfaxSkuItem,
    TrackingApi,
)

configuration = Configuration(
    api_key={"shadowfaxToken": os.environ["SHADOWFAX_TOKEN"]},
    api_key_prefix={"shadowfaxToken": "Token"},
)
with ApiClient(configuration) as api_client:
    order = OrdersApi(api_client).orders_create(
        ShadowfaxCreateOrderPayload(
            customer_details=ShadowfaxCustomerDetails(
                name="Rahul Sharma",
                contact="9876543210",
                address_line_1="42 MG Road, Koramangala",
                city="BANGALORE",
                pincode="560034",
            ),
            order_details=ShadowfaxOrderInfo(
                client_order_id="FWD-001",
                product_value=1299,
                payment_mode="prepaid",
                cod_amount=0,
            ),
            pickup_details=ShadowfaxPickupAddress(
                pickup_type="seller",
                name="TechStore Pvt Ltd",
                contact="9876543211",
                address_line_1="15 Industrial Area Phase 2",
                city="BANGALORE",
                pincode="560058",
            ),
            return_details=ShadowfaxReturnAddress(
                return_type="seller",
                name="TechStore Pvt Ltd",
                contact="9876543211",
                address_line_1="15 Industrial Area Phase 2",
                city="BANGALORE",
                pincode="560058",
            ),
            product_details=[
                ShadowfaxSkuItem(
                    sku_name="Headphones",
                    sku_id="SKU-1",
                    price=1299,
                )
            ],
        )
    )

    # Forward creation reports rejections with HTTP 200; the message says which.
    # The AWB arrives inside `data`; the top-level fields mirror it in some responses.
    details = order.data or order
    if (order.message or "").lower() != "failure" and details.awb_number:
        tracking = TrackingApi(api_client).tracking_fetch(details.awb_number)
```

```rust [Rust]
use open_logistics::shadowfax::apis::{
    configuration::{ApiKey, Configuration},
    orders_api, tracking_api,
};
use open_logistics::shadowfax::models::{
    shadowfax_order_info::PaymentMode, shadowfax_pickup_address::PickupType,
    shadowfax_return_address::ReturnType, ShadowfaxCreateOrderPayload, ShadowfaxCustomerDetails,
    ShadowfaxOrderInfo, ShadowfaxPickupAddress, ShadowfaxReturnAddress, ShadowfaxSkuItem,
};

let mut configuration = Configuration::new();
configuration.api_key = Some(ApiKey {
    prefix: Some("Token".into()),
    key: std::env::var("SHADOWFAX_TOKEN").expect("SHADOWFAX_TOKEN"),
});

let order = orders_api::orders_create(
    &configuration,
    ShadowfaxCreateOrderPayload {
        customer_details: ShadowfaxCustomerDetails {
            name: "Rahul Sharma".into(),
            contact: "9876543210".into(),
            address_line_1: "42 MG Road, Koramangala".into(),
            city: "BANGALORE".into(),
            pincode: "560034".into(),
            ..Default::default()
        },
        order_details: ShadowfaxOrderInfo {
            client_order_id: "FWD-001".into(),
            product_value: 1299.0,
            payment_mode: PaymentMode::Prepaid,
            cod_amount: 0.0,
            ..Default::default()
        },
        pickup_details: ShadowfaxPickupAddress {
            pickup_type: PickupType::Seller,
            name: Some("TechStore Pvt Ltd".into()),
            contact: Some("9876543211".into()),
            address_line_1: "15 Industrial Area Phase 2".into(),
            city: "BANGALORE".into(),
            pincode: "560058".into(),
            ..Default::default()
        },
        return_details: ShadowfaxReturnAddress {
            return_type: ReturnType::Seller,
            name: Some("TechStore Pvt Ltd".into()),
            contact: Some("9876543211".into()),
            address_line_1: "15 Industrial Area Phase 2".into(),
            city: Some("BANGALORE".into()),
            pincode: "560058".into(),
            ..Default::default()
        },
        product_details: vec![ShadowfaxSkuItem {
            sku_name: "Headphones".into(),
            sku_id: "SKU-1".into(),
            price: 1299.0,
            ..Default::default()
        }],
        ..Default::default()
    },
)
.await?;

// Forward creation reports rejections with HTTP 200; the message says which.
if order.message.as_deref() != Some("Failure") {
    // The AWB arrives inside `data`; the top-level fields mirror it in some responses.
    let awb_number = order
        .data
        .as_ref()
        .and_then(|data| data.awb_number.as_deref())
        .or(order.awb_number.as_deref());
    if let Some(awb_number) = awb_number {
        let tracking = tracking_api::tracking_fetch(&configuration, awb_number).await?;
        println!("{:?}", tracking.status);
    }
}
```

:::

Shadowfax credentials are a static `token`; there is no login step or refresh
flow. An optional `baseUrl` overrides the default production host (use
`https://dale.staging.shadowfax.in/api` for staging). Forward order creation
returns HTTP 200 for rejections, so check the mapped `success` flag in
TypeScript, and `message` in the generated clients.

## Shiprocket

::: code-group

```ts [TypeScript]
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({
  provider: "shiprocket",
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});

const rates = await openLogistics.courier.serviceability({
  pickup_postcode: "400001",
  delivery_postcode: "110001",
  weight: 0.5,
});
```

```python [Python]
import os

from open_logistics.shiprocket import (
    ApiClient,
    AuthApi,
    AuthCredentials,
    Configuration,
    CourierApi,
)

configuration = Configuration(host="https://apiv2.shiprocket.in/v1/external")
with ApiClient(configuration) as api_client:
    # The generated client has no token cache, so log in once and reuse the token.
    auth = AuthApi(api_client).auth_login(
        AuthCredentials(
            email=os.environ["SHIPROCKET_EMAIL"],
            password=os.environ["SHIPROCKET_PASSWORD"],
        )
    )
    configuration.access_token = auth.token

    rates = CourierApi(api_client).courier_serviceability(
        pickup_postcode="400001",
        delivery_postcode="110001",
        weight=0.5,
    )
```

```rust [Rust]
use open_logistics::shiprocket::apis::{
    auth_api, configuration::Configuration, courier_api,
};
use open_logistics::shiprocket::models::AuthCredentials;

let mut configuration = Configuration::new();
// The generated client has no token cache, so log in once and reuse the token.
let auth = auth_api::auth_login(
    &configuration,
    AuthCredentials::new(
        std::env::var("SHIPROCKET_EMAIL").expect("SHIPROCKET_EMAIL"),
        std::env::var("SHIPROCKET_PASSWORD").expect("SHIPROCKET_PASSWORD"),
    ),
)
.await?;
configuration.bearer_access_token = Some(auth.token);

let rates = courier_api::courier_serviceability(
    &configuration,
    "400001",
    "110001",
    0.5,
    None,
    None,
)
.await?;

println!("{:?}", rates);
```

:::

Shiprocket credentials are the same as `new ShiprocketClient(...)`: `email` and
`password`. In TypeScript, authentication, token caching, and the refresh-on-`401`
retry run exactly as they do for the `ShiprocketClient` facade. The generated
clients have no token cache: call `auth_login` (`auth_api::auth_login` in Rust)
once and reuse the token. Order creation is the same flow as the other
providers; see the
[create-order example](/shiprocket/examples/create-order) for the full payload.

## iThink Logistics

::: code-group

```ts [TypeScript]
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({
  provider: "ithink",
  accessToken: process.env.ITHINK_ACCESS_TOKEN!,
  secretKey: process.env.ITHINK_SECRET_KEY!,
});

const order = await openLogistics.orders.create({
  pickup_address_id: 24,
  shipments: [{ ... }],
});

const tracking = await openLogistics.tracking.byWaybill(order.waybill!);
```

```python [Python]
import os

from open_logistics.ithink import (
    ApiClient,
    Configuration,
    IthinkOrderCreateData,
    IthinkOrderCreateRequest,
    IthinkProduct,
    IthinkShipmentPayload,
    IthinkTrackingRequest,
    IthinkTrackingRequestData,
    OrdersApi,
    TrackingApi,
)

access_token = os.environ["ITHINK_ACCESS_TOKEN"]
secret_key = os.environ["ITHINK_SECRET_KEY"]

configuration = Configuration(host="https://my.ithinklogistics.com")
with ApiClient(configuration) as api_client:
    order = OrdersApi(api_client).orders_create(
        IthinkOrderCreateRequest(
            data=IthinkOrderCreateData(
                access_token=access_token,
                secret_key=secret_key,
                pickup_address_id="24",
                shipments=[
                    IthinkShipmentPayload(
                        order="ORD-001",
                        order_date="2026-08-10",
                        total_amount=999,
                        name="John Doe",
                        add="123 Street",
                        pin="400001",
                        city="Mumbai",
                        state="MH",
                        country="India",
                        phone="9999999999",
                        billing_name="John Doe",
                        billing_add="123 Street",
                        billing_pin="400001",
                        billing_phone="9999999999",
                        products=[
                            IthinkProduct(
                                product_name="Shoes",
                                product_quantity=1,
                                product_price=999,
                            )
                        ],
                        shipment_length=10,
                        shipment_width=10,
                        shipment_height=5,
                        weight=0.5,
                        payment_mode="Prepaid",
                        return_address_id="24",
                    )
                ],
            )
        )
    )

    # iThink keys the `data` entries positionally ("1", "2", ...); the client
    # order id is in each entry's `refnum`. Single shipment: take the entry.
    waybill = next(iter((order.data or {}).values()), {}).get("waybill")
    if waybill:
        tracking = TrackingApi(api_client).tracking_fetch(
            IthinkTrackingRequest(
                data=IthinkTrackingRequestData(
                    access_token=access_token,
                    secret_key=secret_key,
                    awb_number_list=waybill,
                )
            )
        )
```

```rust [Rust]
use open_logistics::ithink::apis::{configuration::Configuration, orders_api, tracking_api};
use open_logistics::ithink::models::{
    ithink_shipment_payload::PaymentMode, IthinkOrderCreateData, IthinkOrderCreateRequest,
    IthinkProduct, IthinkShipmentPayload, IthinkTrackingRequest, IthinkTrackingRequestData,
};

let access_token = std::env::var("ITHINK_ACCESS_TOKEN").expect("ITHINK_ACCESS_TOKEN");
let secret_key = std::env::var("ITHINK_SECRET_KEY").expect("ITHINK_SECRET_KEY");

let configuration = Configuration::new();
let order = orders_api::orders_create(
    &configuration,
    IthinkOrderCreateRequest::new(IthinkOrderCreateData {
        access_token: access_token.clone(),
        secret_key: secret_key.clone(),
        pickup_address_id: "24".into(),
        shipments: vec![IthinkShipmentPayload {
            order: "ORD-001".into(),
            order_date: "2026-08-10".into(),
            total_amount: 999.0,
            name: "John Doe".into(),
            add: "123 Street".into(),
            pin: "400001".into(),
            city: Some("Mumbai".into()),
            state: Some("MH".into()),
            country: Some("India".into()),
            phone: "9999999999".into(),
            billing_name: "John Doe".into(),
            billing_add: "123 Street".into(),
            billing_pin: "400001".into(),
            billing_phone: "9999999999".into(),
            products: vec![IthinkProduct::new("Shoes".into(), 1, 999.0)],
            shipment_length: 10.0,
            shipment_width: 10.0,
            shipment_height: 5.0,
            weight: 0.5,
            payment_mode: Some(PaymentMode::Prepaid),
            return_address_id: "24".into(),
            ..Default::default()
        }],
        ..Default::default()
    }),
)
.await?;

// iThink keys the `data` entries positionally ("1", "2", ...); the client
// order id is in each entry's `refnum`. Single shipment: take the entry.
let waybill = order
    .data
    .as_ref()
    .and_then(|data| data.values().next())
    .and_then(|shipment| shipment.get("waybill"))
    .and_then(|waybill| waybill.as_str());

if let Some(waybill) = waybill {
    let tracking = tracking_api::tracking_fetch(
        &configuration,
        IthinkTrackingRequest::new(IthinkTrackingRequestData::new(
            access_token,
            secret_key,
            waybill.to_string(),
        )),
    )
    .await?;
    println!("{:?}", tracking.status);
}
```

:::

iThink credentials are the same as `new IthinkClient(...)`: an `accessToken` and
`secretKey` issued by the iThink Logistics team. An optional `baseUrl` overrides
the default production host. The generated clients have no auth header: both
values travel inside the `data` object of every request, so they are plain
fields on the request models.

## What each provider supports

All providers expose `orders`, `shipments`, `tracking`, and `rates`, but the
methods inside those resources differ. `courier` belongs to Shiprocket;
`serviceability` belongs to Delhivery, iThink, and Shadowfax; `waybills` belongs
to Delhivery and Shadowfax.

| Resource         | Shiprocket                                                   | Delhivery                                    | iThink                                       | Shadowfax                                    |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `orders`         | `create`, `list`, `get`, `cancel`                            | `create`, `update`, `cancel`                 | `create`, `cancel`, `cancelMany`             | `create`, `update`, `cancel`                 |
| `shipments`      | `generatePickup`, `generateLabel`, `generateManifest`, `printManifest` | `generateLabel`, `createPickupRequest` | `generateLabel`, `generateManifest` | `generateLabel`, `fetchPod` |
| `tracking`       | `byAWB`, `byShipmentId`, `byOrderId`                         | `byWaybill`, `byOrderId`, `byWaybills`       | `byWaybill`, `byWaybills`                    | `byWaybill`, `byWaybills`                    |
| `rates`          | `check`                                                      | `calculate`                                  | `calculate`                                  | `calculate`                                  |
| `courier`        | `serviceability`, `assignAWB`, `list`                        | —                                            | —                                            | —                                            |
| `serviceability` | —                                                            | `check`                                      | `check`                                      | `check`                                      |
| `waybills`       | —                                                            | `fetchOne`, `fetchBulk`                      | —                                            | `generatePool`, `request`, `poll`            |

Accessing a resource that the selected provider does not offer returns
`undefined` at runtime. With a literal `provider` value, TypeScript flags the
access before the code runs. In Python and Rust there is no `OpenLogistics`
instance to check: the resource simply does not exist in that provider's module.

::: code-group

```ts [TypeScript]
const openLogistics = new OpenLogistics({
  provider: "delhivery",
  token: "...",
  clientName: "...",
});

openLogistics.courier; // undefined; TypeScript reports the error
```

```python [Python]
from open_logistics.delhivery import OrdersApi, TrackingApi  # no courier module

from open_logistics.shiprocket import CourierApi
```

```rust [Rust]
use open_logistics::delhivery::apis::{orders_api, tracking_api}; // no courier module

use open_logistics::shiprocket::apis::courier_api;
```

:::

## Switching providers

Only the constructor changes in TypeScript. Shared resources keep the same
names:

::: code-group

```ts [TypeScript]
const openLogistics = new OpenLogistics({
  provider: "shiprocket",
  email: "...",
  password: "...",
});

await openLogistics.tracking.byAWB("1234567890");
```

```python [Python]
from open_logistics.shiprocket import TrackingApi

tracking = TrackingApi(api_client).tracking_by_awb("1234567890")
```

```rust [Rust]
let tracking = tracking_api::tracking_by_awb(&configuration, "1234567890").await?;
```

:::

In Python and Rust the import selects the provider, and the operation keeps the
name from that provider's spec: `tracking_by_awb` for Shiprocket, `tracking_fetch`
for the other three. One instance talks to one provider. To use both in the same
process, create two instances. There is no fallback chain, cheapest-route
selection, or automatic failover between providers; see
[Providers](/concepts/providers).

## Backward compatibility

`OpenLogistics` sits on top of the existing provider facades, so nothing that
already works has changed:

- `Shiprocket`, `Delhivery`, `Ithink`, `Shadowfax`, `ShiprocketClient`,
  `DelhiveryClient`, `IthinkClient`, and `ShadowfaxClient` are still exported.
- `Shiprocket`, `Delhivery`, `Ithink`, and `Shadowfax` are marked deprecated and
  will be removed after two more releases. The clients stay for lower-level, direct-method use.
- Existing code keeps working through the migration window.

### Migrating from a provider facade

TypeScript only: the generated Python and Rust clients never had these
deprecated facades.

```ts
// Before
import { Delhivery } from "open-logistics";
const delhivery = new Delhivery({ token, clientName });
await delhivery.orders.create(payload);

// After
import { OpenLogistics } from "open-logistics";
const openLogistics = new OpenLogistics({ provider: "delhivery", token, clientName });
await openLogistics.orders.create(payload);
```

The method calls do not change; only the constructor and the variable name do.

## FAQ

### Is OpenLogistics a provider registry or router?

No. It is a typed facade over the existing provider facades. The provider is fixed when you construct the instance, and there is no registry, fallback chain, or automatic routing.

### Can one OpenLogistics instance call both providers?

No. Create one instance per provider. Each instance owns a single provider client with its own credentials and token state.

### Why is a resource undefined on my instance?

The selected provider does not offer that resource. For example, courier is Shiprocket-only, while waybills is offered by Delhivery and Shadowfax only. Check the support table above.

### Is OpenLogistics available in Python and Rust?

Not yet. It is a TypeScript entry point. The generated Python and Rust clients stay provider-specific and expose each provider as its own module. The Python and Rust tabs above show those modules.
