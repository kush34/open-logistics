---
description: "Track a Shiprocket shipment by AWB in TypeScript and read tracking_data status, activities, and track_url."
---

# Example: track by AWB

`trackByAWB()` is the most direct tracking flow supported by the SDK. It calls
Shiprocket's order tracking endpoint with the AWB code and returns a
`TrackByAWBResponse`.

```ts
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

Useful fields under `tracking_data`:

| Field | Notes |
| --- | --- |
| `track_status` | Numeric tracking status |
| `shipment_status` | Numeric shipment status |
| `shipment_track` | Shipment-level events |
| `shipment_track_activities` | Scan history with date, activity, and location |
| `track_url` | Customer-facing tracking page |

The same response shape is returned by `trackByShipmentId()` and
`trackByOrderId()`.
