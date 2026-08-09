# Courier API

## `courier.serviceability(params)`

Checks whether a shipment is serviceable for the given route and weight.

Returns: `unknown`

## `courier.assignAWB(payload)`

Assigns an AWB to a shipment.

Returns a response with:

- `awb_assign_status`
- `response.data.awb_code`
- `response.data.courier_name`

## `courier.list()`

Returns the Shiprocket courier list payload.

Returns: `unknown`

## Types

See `ServiceabilityParams` and `AssignAWBPayload` in `src/types/index.ts`.
