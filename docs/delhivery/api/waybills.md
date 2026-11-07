---
description: "Fetch single or bulk Delhivery waybill numbers with fetchWaybill() and fetchWaybills()."
---

# Delhivery waybills

`DelhiveryClient` exposes two waybill fetch methods. Both inject your
`clientName` and `token` as `cl`, `client_name`, and `token` query parameters.

## `fetchWaybill()`

Fetches one waybill from `/waybill/api/fetch/json/`.

```ts
const result = await sdk.fetchWaybill();
console.log(result.waybill);
```

| Field | Type | Notes |
| --- | --- | --- |
| `waybill` | `string \| null` | Fetched waybill number |
| `raw` | `unknown` | Original Delhivery response |

## `fetchWaybills(params)`

Fetches waybills in bulk from `/waybill/api/bulk/json/`.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `action` | `"next" \| "fetch"` | no | Defaults to `"next"` |
| `count` | `number` | no | Number of waybills to fetch |
| `wbn` | `string` | no | Specific waybill to fetch |

```ts
const bulk = await sdk.fetchWaybills({ count: 10 });

console.log(bulk.waybills);
```

`DelhiveryBulkWaybillResponse` exposes `waybills` and `raw`. Check `raw` when a
request succeeds but `waybills` is empty; Delhivery may report the reason in the
provider payload.
