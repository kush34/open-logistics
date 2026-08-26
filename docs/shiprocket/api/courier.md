# Shiprocket courier

## `ShiprocketClient#checkServiceability(params)`

Checks whether a shipment is serviceable for the given route and weight.

Returns: `unknown`

## `ShiprocketClient#assignAWB(payload)`

Assigns an AWB to a shipment.

Returns a response with:

- `awb_assign_status`
- `response.data.awb_code`
- `response.data.courier_name`

## `ShiprocketClient#listCouriers()`

Returns the Shiprocket courier list payload.

Returns: `unknown`

## Types

See `ServiceabilityParams` and `AssignAWBPayload` in `src/shiprocket/types/index.ts`.
