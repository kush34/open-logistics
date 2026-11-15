---
description: "Calculate and compare iThink Logistics courier rates with calculateRate(), including the request parameters and returned per-courier rates."
---

# iThink Logistics rates

`calculateRate(params)` posts to iThink's rate endpoint
(`/api_v3/rate/check.json`) and returns one rate per courier plus the route zone
and delivery estimate.

## Parameters

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `from_pincode` | `string \| number` | yes | Origin pincode |
| `to_pincode` | `string \| number` | no | Destination pincode |
| `shipping_weight_kg` | `number \| string` | yes | Weight up to 10 kg |
| `payment_method` | `"prepaid" \| "cod"` | yes | Payment method |
| `product_mrp` | `number \| string` | yes | Product MRP |
| `shipping_length_cms` | `number \| string` | no | Up to 1000 cm |
| `shipping_width_cms` | `number \| string` | no | Up to 1000 cm |
| `shipping_height_cms` | `number \| string` | no | Up to 1000 cm |
| `order_type` | `"forward" \| "reverse"` | no | Defaults to forward |

```ts
const rate = await sdk.calculateRate({
  from_pincode: "400092",
  to_pincode: "400061",
  shipping_length_cms: 22,
  shipping_width_cms: 12,
  shipping_height_cms: 12,
  shipping_weight_kg: 2,
  payment_method: "cod",
  product_mrp: 1200,
});

console.log(rate.zone, rate.expectedDeliveryDate);
for (const option of rate.rates) {
  console.log(option.courier, option.rate, option.deliveryTat);
}
```

## Response

| Field | Type | Notes |
| --- | --- | --- |
| `zone` | `string \| null` | Logistics zone for the route |
| `expectedDeliveryDate` | `string \| null` | Delivery window, for example `"1 to 2 Days"` |
| `rates` | `IthinkCourierRate[]` | One entry per courier |
| `raw` | `unknown` | Original iThink payload |

Each courier rate exposes `courier`, `serviceType`, `rate`, `prepaid`, `cod`,
`pickup`, `reversePickup`, `zone`, `deliveryTat`, and `raw`.

Use [serviceability](/ithink/api/serviceability) first to confirm that the
destination pincode is served before quoting a rate.

`calculateRate` throws `IthinkAPIError` when iThink returns a failure body, even
with HTTP 200, so an outage never looks like an empty rate list.
