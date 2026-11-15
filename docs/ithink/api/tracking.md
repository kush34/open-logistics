---
description: "Track iThink Logistics shipments by AWB with IthinkClient, including scan history and delivery dates."
---

# iThink Logistics tracking

`trackByWaybill(waybill)` and `trackByWaybills(waybills)` post to iThink's
tracking endpoint (`/api_v3/order/track.json`) and return the same normalized
shape. iThink accepts up to 10 AWBs per request.

## Methods

| Method | Body sent |
| --- | --- |
| `trackByWaybill(waybill)` | `awb_number_list=<waybill>` |
| `trackByWaybills(waybills)` | `awb_number_list=<comma-separated list>` |

```ts
const tracking = await sdk.trackByWaybill("86210010463");

console.log(tracking.currentStatus, tracking.statusCode);
for (const scan of tracking.scans) {
  console.log(scan.scan_date_time, scan.status, scan.scan_location);
}
```

## Response

| Field | Type | Notes |
| --- | --- | --- |
| `waybills` | `string[]` | AWBs included in the response |
| `currentStatus` | `string \| null` | Latest status of the first shipment |
| `statusCode` | `string \| null` | Provider status code |
| `scans` | `IthinkTrackingScan[]` | Scan history of the first shipment |
| `shipments` | `IthinkTrackingShipment[]` | Per-AWB normalized results |
| `raw` | `unknown` | Original iThink payload |

Each shipment exposes `awb`, `currentStatus`, `statusCode`, `courier`,
`orderType`, `expectedDeliveryDate`, `scans`, and `raw`. Scans can include
`status`, `status_code`, `scan_location`, `remark`, `scan_date_time`, and
`status_reason`.

iThink tracking takes AWBs only; there is no order-ID lookup endpoint in API v3.

`trackByWaybills` accepts at most 10 AWBs and throws an `Error` before calling
iThink for a longer list. A failure body returned with HTTP 200 throws
`IthinkAPIError` instead of an empty result.
