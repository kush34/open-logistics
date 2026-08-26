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
```

## Notes

- There is no built-in cheapest-provider comparison logic
- There is no multi-provider rate ranking layer
