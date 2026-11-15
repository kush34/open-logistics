---
description: "Check Shadowfax pincode serviceability for pickup and delivery with checkServiceability()."
---

# Shadowfax serviceability

`checkServiceability(params)` calls `/v1/clients/serviceability/` and returns
whether the requested pincodes are served, plus the service tiers available at
each one.

## Parameters

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `service` | `string` | yes | Service leg, for example `marketplace`, `seller_pickup`, `customer_delivery` |
| `pincodes` | `string \| number \| Array<string \| number>` | no | Comma-joined into one query value |
| `page` | `number` | no | Pagination, defaults to 1 |
| `count` | `number` | no | Page size, defaults to 25 |

```ts
const result = await sdk.checkServiceability({
  service: "seller_pickup",
  pincodes: ["560034", 110005],
});

console.log(result.serviceable, result.pincodes);
```

## Response

| Field | Type | Notes |
| --- | --- | --- |
| `serviceable` | `boolean` | True when the response lists at least one pincode |
| `pincodes` | `Array<{ pincode: number \| null; services: string[] }>` | Service tiers per pincode |
| `raw` | `unknown` | Original Shadowfax response |

A forward order touches up to three legs. Check each one:

| Order type | Services to check |
| --- | --- |
| Marketplace | `seller_pickup`, `seller_delivery`, `customer_delivery` |
| Warehouse | `warehouse_pickup`, `warehouse_return`, `customer_delivery` |

A pincode appearing in the response is not enough — the tier matching your
supply chain must be present in `services`. A Regular client looks for
`Marketplace`; a Surface client looks for `Surface_Mkt`.

Omit `pincodes` to list every serviceable pincode, page by page.
