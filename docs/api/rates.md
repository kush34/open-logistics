# Rates API

## `rates.check(params)`

Checks serviceability and rate-related data for a route.

Returns: `unknown`

## Notes

- In the current implementation, this method calls the same Shiprocket endpoint as `courier.serviceability()`
- There is no built-in provider comparison or cheapest-rate selection logic
