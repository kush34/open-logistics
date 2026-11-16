---
description: "Shadowfax create-order example in TypeScript, Python, and Rust: credentials, forward order payload, and the AWB returned by the API."
---

# Shadowfax create order

Create a forward order with `ShadowfaxClient`. Shadowfax expects flat
`customer_details`, `order_details`, `pickup_details`, `return_details`, and
`product_details` blocks, and returns the AWB in `data.awb_number`. The
generated clients model each block separately; pincodes and contacts are
strings.

::: code-group

```ts [TypeScript]
import { ShadowfaxClient } from "open-logistics";

const sdk = new ShadowfaxClient({
  token: process.env.SHADOWFAX_TOKEN!,
});

const order = await sdk.createOrder({
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
    order_service: "Regular",
  },
  pickup_details: {
    pickup_type: "seller",
    name: "TechStore Pvt Ltd",
    contact: "9876543211",
    address_line_1: "15 Industrial Area Phase 2",
    city: "BANGALORE",
    pincode: 560058,
  },
  return_details: {
    return_type: "seller",
    name: "TechStore Pvt Ltd",
    contact: "9876543211",
    address_line_1: "15 Industrial Area Phase 2",
    city: "BANGALORE",
    pincode: 560058,
  },
  product_details: [
    {
      sku_name: "Wireless Bluetooth Headphones",
      sku_id: "SKU-HEADPHONE-001",
      price: 1299,
      category: "Electronics",
    },
  ],
});

if (!order.success) {
  throw new Error(`${order.message}: ${JSON.stringify(order.errors)}`);
}

console.log(order.awb_number, order.status);
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
                order_service="Regular",
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
                    sku_name="Wireless Bluetooth Headphones",
                    sku_id="SKU-HEADPHONE-001",
                    price=1299,
                    category="Electronics",
                )
            ],
        )
    )

if (order.message or "").lower() == "failure":
    raise RuntimeError(f"{order.message}: {order.errors}")

print(order.awb_number, order.status)
```

```rust [Rust]
use open_logistics::shadowfax::apis::{
    configuration::{ApiKey, Configuration},
    orders_api,
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
            order_service: Some("Regular".into()),
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
            sku_name: "Wireless Bluetooth Headphones".into(),
            sku_id: "SKU-HEADPHONE-001".into(),
            price: 1299.0,
            category: Some("Electronics".into()),
            ..Default::default()
        }],
        ..Default::default()
    },
)
.await?;

if order.message.as_deref() == Some("Failure") {
    panic!("Shadowfax rejected the order: {:?}", order.errors);
}

println!("{:?} {:?}", order.awb_number, order.status);
```

:::

The TypeScript SDK normalizes the response to `success`, `message`,
`awb_number`, `client_order_id`, `status`, `status_display`, `data`, `errors`,
and `raw`. The generated clients return the raw payload, so they have no
`success` flag: branch on `message`/`status` as the examples do, not on the HTTP
status. Feed the AWB into:

- `sdk.trackByAwb()`
- `sdk.generateLabel()`
- `sdk.updateOrder()`
- `sdk.cancelOrder()`

A rejection still arrives as HTTP 200, so the TypeScript client branches on
`order.success`; with the generated clients, check `message` (and `status`)
instead.
