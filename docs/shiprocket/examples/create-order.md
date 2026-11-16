---
description: "Shiprocket create-order example in TypeScript, Python, and Rust with credentials, a full payload, and the returned order response."
---

# Example: create an order

Create a Shiprocket order with `ShiprocketClient`. The client authenticates with
your email and password on the first request, caches the bearer token, and
reuses it for later calls. The generated Python and Rust clients log in with
`auth_login` and pass the returned token to the request configuration.

::: code-group

```ts [TypeScript]
import { ShiprocketClient } from "open-logistics";

const sdk = new ShiprocketClient({
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});

const order = await sdk.createOrder({
  order_id: "ORD-001",
  order_date: "2026-01-01 10:00",
  pickup_location: "Primary",
  billing_customer_name: "John",
  billing_address: "123 Street",
  billing_city: "Mumbai",
  billing_pincode: "400001",
  billing_state: "Maharashtra",
  billing_country: "India",
  billing_email: "john@example.com",
  billing_phone: "9999999999",
  shipping_is_billing: true,
  order_items: [{ name: "Item", sku: "SKU1", units: 1, selling_price: 500 }],
  payment_method: "prepaid",
  sub_total: 500,
  length: 10,
  breadth: 10,
  height: 10,
  weight: 0.5,
});

console.log(order);
```

```python [Python]
import os

from open_logistics.shiprocket import (
    ApiClient,
    AuthApi,
    AuthCredentials,
    Configuration,
    CreateOrderPayload,
    OrderItem,
    OrdersApi,
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

    order = OrdersApi(api_client).orders_create(
        CreateOrderPayload(
            order_id="ORD-001",
            order_date="2026-01-01 10:00",
            pickup_location="Primary",
            billing_customer_name="John",
            billing_address="123 Street",
            billing_city="Mumbai",
            billing_pincode="400001",
            billing_state="Maharashtra",
            billing_country="India",
            billing_email="john@example.com",
            billing_phone="9999999999",
            shipping_is_billing=True,
            order_items=[
                OrderItem(name="Item", sku="SKU1", units=1, selling_price=500)
            ],
            payment_method="prepaid",
            sub_total=500,
            length=10,
            breadth=10,
            height=10,
            weight=0.5,
        )
    )

print(order.order_id, order.shipment_id, order.status)
```

```rust [Rust]
use open_logistics::shiprocket::apis::{
    auth_api, configuration::Configuration, orders_api,
};
use open_logistics::shiprocket::models::{
    create_order_payload::PaymentMethod, AuthCredentials, CreateOrderPayload, OrderItem,
};

let mut configuration = Configuration::new();
let auth = auth_api::auth_login(
    &configuration,
    AuthCredentials::new(
        std::env::var("SHIPROCKET_EMAIL").expect("SHIPROCKET_EMAIL"),
        std::env::var("SHIPROCKET_PASSWORD").expect("SHIPROCKET_PASSWORD"),
    ),
)
.await?;
configuration.bearer_access_token = Some(auth.token);

let order = orders_api::orders_create(
    &configuration,
    CreateOrderPayload {
        order_id: "ORD-001".into(),
        order_date: "2026-01-01 10:00".into(),
        pickup_location: "Primary".into(),
        billing_customer_name: "John".into(),
        billing_address: "123 Street".into(),
        billing_city: "Mumbai".into(),
        billing_pincode: "400001".into(),
        billing_state: "Maharashtra".into(),
        billing_country: "India".into(),
        billing_email: "john@example.com".into(),
        billing_phone: "9999999999".into(),
        shipping_is_billing: true,
        order_items: vec![OrderItem::new("Item".into(), "SKU1".into(), 1, 500.0)],
        payment_method: PaymentMethod::Prepaid,
        sub_total: 500.0,
        length: 10.0,
        breadth: 10.0,
        height: 10.0,
        weight: 0.5,
        ..Default::default()
    },
)
.await?;

println!("{} {} {}", order.order_id, order.shipment_id, order.status);
```

:::

The response is an `OrderResponse` containing the Shiprocket order identifiers
and status. Use the returned `order_id` and `shipment_id` with
[shipments](/shiprocket/api/shipments) and [tracking](/shiprocket/api/tracking).
