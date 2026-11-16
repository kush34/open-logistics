---
description: "Track a Shiprocket shipment by AWB in TypeScript, Python, and Rust, and read tracking_data status, activities, and track_url."
---

# Example: track by AWB

`trackByAWB()` is the most direct tracking flow supported by the SDK. It calls
Shiprocket's order tracking endpoint with the AWB code and returns a
`TrackByAWBResponse`. The generated clients call the same endpoint through
`tracking_by_awb`.

::: code-group

```ts [TypeScript]
import { ShiprocketClient } from "open-logistics";

const sdk = new ShiprocketClient({
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});

const tracking = await sdk.trackByAWB("1234567890");

console.log(tracking.tracking_data.track_status);
console.log(tracking.tracking_data.shipment_status);
console.log(tracking.tracking_data.track_url);
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

print(tracking.tracking_data.track_status)
print(tracking.tracking_data.shipment_status)
print(tracking.tracking_data.track_url)
```

```rust [Rust]
use open_logistics::shiprocket::apis::{
    auth_api, configuration::Configuration, tracking_api,
};
use open_logistics::shiprocket::models::AuthCredentials;

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

let tracking = tracking_api::tracking_by_awb(&configuration, "1234567890").await?;

println!("{}", tracking.tracking_data.track_status);
println!("{}", tracking.tracking_data.shipment_status);
println!("{}", tracking.tracking_data.track_url);
```

:::

Useful fields under `tracking_data`:

| Field | Notes |
| --- | --- |
| `track_status` | Numeric tracking status |
| `shipment_status` | Numeric shipment status |
| `shipment_track` | Shipment-level events |
| `shipment_track_activities` | Scan history with date, activity, and location |
| `track_url` | Customer-facing tracking page |

The same response shape is returned by `trackByShipmentId()` and
`trackByOrderId()` (generated: `tracking_by_shipment` and `tracking_by_order`).
