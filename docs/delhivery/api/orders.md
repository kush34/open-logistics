# Delhivery orders

`DelhiveryClient` exposes direct order methods.

## Methods

- `createOrder(payload)`
- `updateOrder(payload)`
- `cancelOrder(waybill)`

## Notes

- `createOrder` sends the documented `format=json` payload wrapper
- `cancelOrder` and `updateOrder` use Delhivery’s edit endpoint
