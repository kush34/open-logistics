---
description: "Check Delhivery pincode serviceability for pickup and delivery with checkServiceability()."
---

# Delhivery serviceability

`checkServiceability(params)` calls Delhivery's pincode serviceability endpoint
(`/c/api/pin-codes/json/`) and returns whether the destination can be served.

## Parameters

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `filter_codes` | `string \| number` | no | Pincode to check |
| `dt` | `string` | no | Destination pincode filter |
| `st` | `string` | no | State or origin filter |

```ts
const result = await sdk.checkServiceability({ filter_codes: "110001" });

console.log(result.serviceable, result.prepaid, result.cod, result.pickup);
```

## Response

| Field | Type | Notes |
| --- | --- | --- |
| `serviceable` | `boolean` | Destination is served |
| `prepaid` | `boolean` | Prepaid shipments allowed |
| `cod` | `boolean` | Cash on delivery allowed |
| `pickup` | `boolean` | Pickup available at origin |
| `remarks` | `string \| null` | Provider note, if any |
| `delivery_codes` | `Array<{ postal_code: ... }>` | Per-pincode serviceability details |
| `raw` | `unknown` | Original Delhivery payload |

Pincode-level details such as `city`, `district`, `state_code`, `max_weight`,
and `is_oda` remain available on `delivery_codes` and `raw`.

For the TypeScript SDK, serviceability is a read-only check: it does not create
a shipment or reserve a pickup.
