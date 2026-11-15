---
description: "Get Shadowfax shipping rates for a pincode pair with calculateRate(), including request fields and returned amounts."
---

# Shadowfax rates

`calculateRate(params)` calls the rate calculator
(`/v1/clients/rate_calculator/`) and maps the response to a normalized amount
summary. It is for prepaid clients and returns a quote only: no amount is held
from your wallet and no order is created.

## Parameters

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `origin_pincode` | `number \| string` | yes | 6-digit pickup pincode |
| `destination_pincode` | `number \| string` | yes | 6-digit delivery pincode |
| `service` | `"forward" \| "reverse" \| "reverse_qc"` | yes | Shipment type |
| `weight` | `number` | no | Weight in kg; priced at 1 kg when omitted |

```ts
const rate = await sdk.calculateRate({
  origin_pincode: 560001,
  destination_pincode: 110001,
  service: "forward",
  weight: 1.5,
});

console.log(rate.shippingRate, rate.taxAmount, rate.totalAmount);
```

## Response

| Field | Type | Notes |
| --- | --- | --- |
| `success` | `boolean` | True when a rate was found |
| `message` | `string \| null` | Provider message |
| `zone` | `string \| null` | Zone for the pincode pair |
| `shippingRate` | `number \| null` | Rate before GST |
| `taxAmount` | `number \| null` | GST amount |
| `totalAmount` | `number \| null` | `shippingRate + taxAmount` |
| `currency` | `"INR"` | Fixed |
| `raw` | `unknown` | Original Shadowfax response |

Shadowfax returns `shipping_rate` and `gst` as strings with two decimal places.
No rate for the pair is signalled with HTTP 200 and null amounts, so check
`success` or `message` rather than the status code.

Use [serviceability](/shadowfax/api/serviceability) first to confirm the
destination pincode is served before quoting a rate.
