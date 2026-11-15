---
description: "Check iThink Logistics pincode serviceability per courier with checkServiceability()."
---

# iThink Logistics serviceability

`checkServiceability(params)` posts to iThink's pincode endpoint
(`/api_v3/pincode/check.json`) and returns the couriers that serve the pincode
with their payment and pickup flags.

## Parameters

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `pincode` | `string \| number` | yes | Pincode to check |

```ts
const result = await sdk.checkServiceability({ pincode: "400067" });

console.log(result.serviceable);
for (const courier of result.couriers) {
  console.log(courier.courier, courier.prepaid, courier.cod, courier.pickup);
}
```

## Response

| Field | Type | Notes |
| --- | --- | --- |
| `pincode` | `string \| null` | Pincode from the response key |
| `serviceable` | `boolean` | At least one courier accepts prepaid or COD |
| `couriers` | `IthinkCourierServiceability[]` | Per-courier serviceability |
| `raw` | `unknown` | Original iThink payload |

Each courier entry exposes `courier`, `prepaid`, `cod`, `pickup`, `district`,
`state_code`, `sort_code`, and `raw`.

Serviceability is a read-only check: it does not create a shipment or reserve a
pickup.

`checkServiceability` throws `IthinkAPIError` when the body reports a failure,
even with HTTP 200. A returned `serviceable: false` therefore means iThink
answered successfully and no courier serves the pincode, not that the call
failed.
