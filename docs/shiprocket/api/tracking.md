---
description: "Track Shiprocket shipments by AWB, shipment ID, or order ID and read TrackByAWBResponse fields."
---

# Shiprocket tracking

`ShiprocketClient` exposes three tracking methods. They return the same
`TrackByAWBResponse`, but each calls a different Shiprocket endpoint.

## Methods

| Method | Argument | Endpoint |
| --- | --- | --- |
| `trackByAWB(awbCode)` | AWB string | `/courier/track/awb/<awb>` |
| `trackByShipmentId(shipmentId)` | Numeric shipment id | `/courier/track/shipment/<id>` |
| `trackByOrderId(orderId)` | Order reference string | `/orders/track/<orderId>` |

```ts
const tracking = await sdk.trackByAWB("1234567890");

console.log(tracking.tracking_data.track_status);
console.log(tracking.tracking_data.track_url);
```

## Return type

| Field | Notes |
| --- | --- |
| `tracking_data.track_status` | Numeric tracking status |
| `tracking_data.shipment_status` | Numeric shipment status |
| `tracking_data.shipment_track` | Shipment-level events |
| `tracking_data.shipment_track_activities` | Scan history |
| `tracking_data.track_url` | Customer-facing tracking page |

Use `trackByAWB()` when you have the AWB, `trackByShipmentId()` when you stored
Shiprocket's numeric shipment id, and `trackByOrderId()` when you only have your
own order reference.
