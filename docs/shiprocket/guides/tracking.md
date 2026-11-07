---
description: "Track Shiprocket shipments in TypeScript and inspect the fields returned in TrackByAWBResponse."
---

# Shiprocket tracking guide

`ShiprocketClient` exposes three tracking methods. They differ only in the
identifier they send to Shiprocket; the response shape is the same.

```ts
const byAwb = await sdk.trackByAWB("1234567890");
const byShipment = await sdk.trackByShipmentId(123456);
const byOrder = await sdk.trackByOrderId("ORD-001");
```

## Methods

- `trackByAWB(awbCode)`
- `trackByShipmentId(shipmentId)`
- `trackByOrderId(orderId)`

## Example

```ts
const tracking = await sdk.trackByAWB("1234567890");
```

## Response

The response is typed as `TrackByAWBResponse` and contains:

- `tracking_data.track_status`
- `tracking_data.shipment_status`
- `tracking_data.shipment_track`
- `tracking_data.shipment_track_activities`
- `tracking_data.track_url`
