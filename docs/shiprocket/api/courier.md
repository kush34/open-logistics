---
description: "Shiprocket courier serviceability and rate methods in the Open-Logistics SDK, with request parameters and raw responses."
---

# Shiprocket courier

`ShiprocketClient` exposes courier serviceability, AWB assignment, and courier list methods that call Shiprocket's courier endpoints and return raw payloads.

## `checkServiceability(params)`

Calls Shiprocket's `courier/serviceability` endpoint to check whether a route can
be served.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `pickup_postcode` | `string` | yes | Origin pincode |
| `delivery_postcode` | `string` | yes | Destination pincode |
| `weight` | `number` | yes | Package weight in kg |
| `cod` | `0 \| 1` | no | `1` for cash on delivery |

The response is the raw Shiprocket payload typed as `unknown`. Read
`data.available_courier_companies` for courier options and rates.

## `assignAWB(payload)`

Assigns an AWB to a shipment.

```ts
const result = await sdk.assignAWB({
  shipment_id: "123456",
  courier_id: "10",
});

console.log(result.response.data.awb_code);
```

Returns `awb_assign_status`, `response.data.awb_code`, and
`response.data.courier_name`.

## `listCouriers()`

Returns the raw Shiprocket courier list from
`courier/courierListWithCounts`.

Types are defined in `src/shiprocket/types/index.ts`.
