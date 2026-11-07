---
description: "Shiprocket rate and serviceability checks with checkServiceability() and calculateRates(), including parameters."
---

# Shiprocket rates

## `calculateRates(params)`

Calculates rate-related data for a route.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `pickup_postcode` | `string` | yes | Origin pincode |
| `delivery_postcode` | `string` | yes | Destination pincode |
| `weight` | `number` | yes | Package weight in kg |
| `cod` | `0 \| 1` | no | `1` for cash on delivery |
| `order_id` | `string` | no | Optional order reference |

```ts
const rates = await sdk.calculateRates({
  pickup_postcode: "400001",
  delivery_postcode: "110001",
  weight: 0.5,
  cod: 0,
});

console.log(rates);
```

The response is the raw Shiprocket payload typed as `unknown`. Courier-level
charges are usually under `data.available_courier_companies`.

## Notes

- In the current implementation, this method calls the same
  `courier/serviceability` endpoint as `checkServiceability()`.
- There is no built-in provider comparison or cheapest-rate selection logic.
- Use the [rate comparison guide](/shiprocket/guides/rate-comparison) to map the
  response into your own comparison.
