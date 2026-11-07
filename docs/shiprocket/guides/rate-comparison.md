---
description: "Compare Shiprocket serviceability and rate checks, and see why both methods share one provider endpoint."
---

# Rate and serviceability checks

The repository exposes two related methods:

- `checkServiceability(params)`
- `calculateRates(params)`

Both call Shiprocket's courier serviceability endpoint in the current implementation.

## Example

```ts
const serviceability = await sdk.checkServiceability({
  pickup_postcode: "400001",
  delivery_postcode: "110001",
  weight: 0.5,
  cod: 0,
});

console.log(serviceability);
```

Both methods accept `pickup_postcode`, `delivery_postcode`, `weight`, and an
optional `cod` flag (`calculateRates()` also accepts `order_id`).

## Response shape

The SDK returns the raw Shiprocket payload typed as `unknown`. Courier options
and charges are typically under `data.available_courier_companies`; inspect that
array to compare delivery estimates and rates.

## Notes

- There is no built-in cheapest-provider comparison logic
- There is no multi-provider rate ranking layer
