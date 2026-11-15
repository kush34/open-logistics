---
description: "Track Shadowfax forward orders by AWB, singly or in bulk, with ShadowfaxClient."
---

# Shadowfax tracking

Both tracking methods return the same normalized shape: the AWB, the latest
status, and the tracking timeline.

## Methods

| Method | Endpoint | Notes |
| --- | --- | --- |
| `trackByAwb(awbNumber)` | `GET /v4/clients/orders/{awb_number}/track/` | One order |
| `trackBulk(awbNumbers)` | `POST /v4/clients/bulk_track/` | Up to 50 AWBs per call |

```ts
const tracking = await sdk.trackByAwb("SF1234567890");

console.log(tracking.currentStatus, tracking.statusCode);
for (const scan of tracking.scans) {
  console.log(scan.created, scan.status, scan.location, scan.remarks);
}

const bulk = await sdk.trackBulk(["SF1234567890", "SF1234567891"]);
for (const order of bulk.results) {
  console.log(order.awb_number, order.currentStatus);
}
```

## Response

| Field | Type | Notes |
| --- | --- | --- |
| `awb_number` | `string` | AWB from the request or response |
| `waybills` | `string[]` | `[awb_number]`, matching the Delhivery shape |
| `currentStatus` | `string \| null` | `status_display`, falling back to `status` |
| `statusCode` | `string \| null` | Machine-readable `status` |
| `scans` | `ShadowfaxTrackingScan[]` | Timeline from `tracking_details` |
| `order_details` | `ShadowfaxOrderDetails \| null` | Full order snapshot |
| `raw` | `unknown` | Original Shadowfax response |

Each scan can include `created`, `location`, `status_id`, `status`, `remarks`,
and `awb_number`. `ShadowfaxBulkTrackingResponse` exposes `results` and `raw`.

Shadowfax overwrites `order_details.status` and `status_display` with the most
recent tracking event. Addresses in the response are partially masked.

Prefer Shadowfax webhooks for live status changes and use polling for
reconciliation. Webhook registration is done in the SFX 360 Partner Portal, not
through this SDK.
