---
description: "iThink Logistics create-order example in TypeScript, Python, and Rust: credentials, shipment payload, and the returned payload."
---

# iThink Logistics create order

Create an order with `IthinkClient`. The client wraps your shipments in iThink's
`data` envelope and adds your `access_token` and `secret_key`. The generated
clients model the same envelope: `access_token` and `secret_key` are fields on
the request data, and `pickup_address_id` and `return_address_id` are strings.

::: code-group

```ts [TypeScript]
import { IthinkClient } from "open-logistics";

const sdk = new IthinkClient({
  accessToken: process.env.ITHINK_ACCESS_TOKEN!,
  secretKey: process.env.ITHINK_SECRET_KEY!,
});

const order = await sdk.createOrder({
  pickup_address_id: 24,
  logistics: "Delhivery",
  shipments: [
    {
      order: "ORD-001",
      order_date: "2026-08-10",
      total_amount: 999,
      name: "John Doe",
      add: "123 Street",
      pin: "400001",
      city: "Mumbai",
      state: "MH",
      country: "India",
      phone: "9999999999",
      billing_name: "John Doe",
      billing_add: "123 Street",
      billing_pin: "400001",
      billing_phone: "9999999999",
      products: [
        { product_name: "Shoes", product_quantity: 1, product_price: 999 },
      ],
      shipment_length: 10,
      shipment_width: 10,
      shipment_height: 5,
      weight: 0.5,
      payment_mode: "Prepaid",
      return_address_id: 24,
    },
  ],
});

console.log(order.success, order.waybill, order.order_id);
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
    OrdersApi,
)

configuration = Configuration(host="https://my.ithinklogistics.com")
with ApiClient(configuration) as api_client:
    order = OrdersApi(api_client).orders_create(
        IthinkOrderCreateRequest(
            data=IthinkOrderCreateData(
                access_token=os.environ["ITHINK_ACCESS_TOKEN"],
                secret_key=os.environ["ITHINK_SECRET_KEY"],
                pickup_address_id="24",
                logistics="Delhivery",
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

print(order.status, order.message, order.data)
```

```rust [Rust]
use open_logistics::ithink::apis::{configuration::Configuration, orders_api};
use open_logistics::ithink::models::{
    ithink_shipment_payload::PaymentMode, IthinkOrderCreateData, IthinkOrderCreateRequest,
    IthinkProduct, IthinkShipmentPayload,
};

let configuration = Configuration::new();
let order = orders_api::orders_create(
    &configuration,
    IthinkOrderCreateRequest::new(IthinkOrderCreateData {
        access_token: std::env::var("ITHINK_ACCESS_TOKEN").expect("ITHINK_ACCESS_TOKEN"),
        secret_key: std::env::var("ITHINK_SECRET_KEY").expect("ITHINK_SECRET_KEY"),
        pickup_address_id: "24".into(),
        logistics: Some("Delhivery".into()),
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
            products: vec![IthinkProduct::new(
                "Shoes".into(),
                1,
                999.0,
            )],
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

println!("{:?} {:?} {:?}", order.status, order.message, order.data);
```

:::

The TypeScript SDK normalizes the response to `success`, `message`, `order_id`,
`waybill`, `tracking_url`, and `shipments`. The generated clients return the raw
payload instead: `status`, `status_code`, `message`, and `data` keyed by
shipment. They do not raise when the provider sends `status: "error"` with HTTP
200, so check `status` yourself before using a result. If iThink returns a
waybill, you can feed it into:

- `sdk.trackByWaybill()`
- `sdk.generateLabel()`
- `sdk.generateManifest()`
