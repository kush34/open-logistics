---
description: "Calculate Delhivery shipping rates with calculateRate(), including the request parameters and returned amounts."
---

# Delhivery rates

`calculateRate(params)` calls Delhivery's charge-estimate endpoint
(`/api/kinko/v1/invoice/charges/.json`) and maps the response to a normalized
amount summary.

## Parameters

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `md` | `"E" \| "S"` | yes | Express or surface mode |
| `cgm` | `number` | yes | Chargeable weight in grams |
| `ss` | `"Delivered" \| "RTO" \| "DTO"` | yes | Shipment stage for the estimate |
| `o_pin` | `number \| string` | no | Origin pincode |
| `d_pin` | `number \| string` | no | Destination pincode |
| `pt` | `"Pre-paid" \| "COD"` | no | Payment type |

```ts
const rate = await sdk.calculateRate({
  md: "S",
  cgm: 500,
  ss: "Delivered",
  o_pin: "400001",
  d_pin: "110001",
  pt: "Pre-paid",
});

console.log(rate.totalAmount, rate.grossAmount, rate.taxAmount);
```

## Response

| Field | Type | Notes |
| --- | --- | --- |
| `totalAmount` | `number \| null` | Final charge estimate |
| `grossAmount` | `number \| null` | Amount before tax |
| `taxAmount` | `number \| null` | Tax component |
| `currency` | `"INR"` | Fixed |
| `raw` | `unknown` | Original Delhivery payload |

The SDK reads top-level `total_amount`, `gross_amount`, and `tax_amount` fields
when present and keeps the full response in `raw`. Delhivery can return an array
of charge estimates; inspect `raw` if you need every estimate or `tax_data`.

Use [serviceability](/delhivery/api/serviceability) first to confirm that the
destination pincode is served before quoting a rate.
