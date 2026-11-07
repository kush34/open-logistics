---
description: "Generate Delhivery labels and pickup requests with DelhiveryClient, including PDF labels and pickup payloads."
---

# Delhivery shipments

`DelhiveryClient` exposes packing-slip generation and pickup scheduling.

## `generateLabel(waybill, pdf?)`

Fetches a packing slip from `/api/p/packing_slip`. Pass `pdf = true` to request a
PDF URL.

```ts
const label = await sdk.generateLabel("1234567890", true);

console.log(label.waybill, label.pdfUrl, label.packagesFound);
```

| Field | Type | Notes |
| --- | --- | --- |
| `waybill` | `string \| null` | Waybill used for the label |
| `pdfUrl` | `string \| null` | Present when `pdf = true` |
| `packagesFound` | `number \| null` | Packages included in the slip |
| `packages` | `unknown[] \| null` | Package-level payloads |
| `raw` | `unknown` | Original Delhivery response |

## `createPickupRequest(payload)`

Schedules a pickup through `/fm/request/new/`.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `pickup_time` | `string` | yes | Time window, for example `"14:00:00"` |
| `pickup_date` | `string` | yes | Date in `YYYY-MM-DD` format |
| `pickup_location` | `string` | yes | Registered warehouse name |
| `expected_package_count` | `number` | yes | Number of packages |

```ts
const pickup = await sdk.createPickupRequest({
  pickup_time: "14:00:00",
  pickup_date: "2026-01-02",
  pickup_location: "Primary Warehouse",
  expected_package_count: 3,
});

console.log(pickup.pickup_id, pickup.message);
```

The response exposes `pickup_id`, `message`, and `raw`. A missing `pickup_id`
usually means Delhivery accepted the request but returned a different response
shape; check `raw` before assuming failure.
