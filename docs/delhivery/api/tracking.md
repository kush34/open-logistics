---
description: "Track Delhivery shipments by waybill, order ID, or multiple waybills with DelhiveryClient."
---

# Delhivery tracking

All three tracking methods call Delhivery's package endpoint
(`/api/v1/packages/json/`) and return the same normalized shape.

## Methods

| Method | Query sent |
| --- | --- |
| `trackByWaybill(waybill)` | `waybill=<waybill>` |
| `trackByOrderId(orderId)` | `ref_nos=<orderId>` |
| `trackByWaybills(waybills)` | `waybill=<comma-separated list>` |

```ts
const tracking = await sdk.trackByWaybill("1234567890");

console.log(tracking.currentStatus, tracking.statusCode);
for (const scan of tracking.scans) {
  console.log(scan.scan_date, scan.status, scan.location);
}
```

## Response

| Field | Type | Notes |
| --- | --- | --- |
| `waybills` | `string[]` | Waybills included in the response |
| `currentStatus` | `string \| null` | Latest status label |
| `statusCode` | `string \| null` | Provider status code |
| `scans` | `DelhiveryTrackingScan[]` | Scan history |
| `raw` | `unknown` | Original Delhivery payload |

Each scan can include `scan_date`, `scan_time`, `status`, `status_code`,
`location`, `instructions`, and `remark`. The raw response also carries
`ShipmentData` for fields the SDK does not promote.
