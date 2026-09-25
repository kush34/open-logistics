# Tracking

`ShiprocketClient` exposes three tracking methods.

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
