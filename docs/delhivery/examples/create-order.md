---
description: "Delhivery create-order example in TypeScript, Python, and Rust: credentials, shipment payload, and the waybill returned by the API."
---

# Delhivery create order

Create a B2C order with `DelhiveryClient`. The client adds your `clientName` as
the shipment `client`, wraps the payload in Delhivery's `format=json` envelope,
and normalizes the response. The generated Python and Rust clients post the same
form envelope: build a shipment, serialize `{"shipments": [...]}` to a JSON
string, and pass it as `data`.

::: code-group

```ts [TypeScript]
import { DelhiveryClient } from "open-logistics";

const sdk = new DelhiveryClient({
  token: process.env.DELHIVERY_TOKEN!,
  clientName: process.env.DELHIVERY_CLIENT_NAME!,
});

const shipment = await sdk.createOrder({
  order_id: "ORD-001",
  pickup_location: { name: "Primary Warehouse" },
  package_type: "Pre-paid",
  name: "John Doe",
  add: "123 Street",
  phone: "9999999999",
  pin: "400001",
  city: "Mumbai",
  state: "MH",
  products_desc: "Shoes",
});

console.log(shipment.success, shipment.waybill, shipment.order_id);
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
)

configuration = Configuration(
    host="https://track.delhivery.com",
    api_key={"delhiveryToken": os.environ["DELHIVERY_TOKEN"]},
    api_key_prefix={"delhiveryToken": "Token"},
)
with ApiClient(configuration) as api_client:
    shipment = DelhiveryShipmentPayload(
        order_id="ORD-001",
        client=os.environ["DELHIVERY_CLIENT_NAME"],
        pickup_location=DelhiveryPickupLocation(name="Primary Warehouse"),
        package_type="Pre-paid",
        name="John Doe",
        add="123 Street",
        phone="9999999999",
        pin="400001",
        city="Mumbai",
        state="MH",
        products_desc="Shoes",
    )
    order = OrdersApi(api_client).orders_create(
        format="json",
        data=json.dumps({"shipments": [shipment.to_dict()]}),
    )

if not order.success:
    raise RuntimeError(f"{order.message}: {order.rmk}")

print(order.waybill, order.order_id)
```

```rust [Rust]
use open_logistics::delhivery::apis::{
    configuration::{ApiKey, Configuration},
    orders_api,
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
shipment.client =
    Some(std::env::var("DELHIVERY_CLIENT_NAME").expect("DELHIVERY_CLIENT_NAME"));
shipment.add = Some("123 Street".into());
shipment.city = Some("Mumbai".into());
shipment.state = Some("MH".into());
shipment.products_desc = Some("Shoes".into());

let data = serde_json::json!({ "shipments": [shipment] }).to_string();
let order = orders_api::orders_create(&configuration, "json", &data).await?;

if order.success == Some(false) {
    panic!("Delhivery rejected the order: {:?}", order.rmk);
}

println!("{:?} {:?}", order.waybill, order.order_id);
```

:::

The Rust example uses `serde_json` to build the `data` string; add
`serde_json = "1"` to your `Cargo.toml`.

The TypeScript response exposes `success`, `message`, `order_id`, `waybill`,
`status`, `shipment_id`, and `raw`. The generated clients expose the same
provider fields except `raw`; unmodeled fields land in `additional_properties`.
If Delhivery returns a waybill in the create response, you can feed that into:

- `sdk.trackByWaybill()`
- `sdk.generateLabel()`
- `sdk.createPickupRequest()`
