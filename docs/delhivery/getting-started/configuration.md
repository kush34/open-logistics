# Delhivery configuration

The current Delhivery constructor accepts:

```ts
new DelhiveryClient({
  token: "your-token",
  clientName: "your-client-name",
  baseUrl: "https://track.delhivery.com", // optional
});
```

## What is configurable

- API token
- Registered client name
- Base URL override for staging or production

## Exposed methods

- `createOrder()`
- `updateOrder()`
- `cancelOrder()`
- `generateLabel()`
- `createPickupRequest()`
- `trackByWaybill()`
- `trackByOrderId()`
- `trackByWaybills()`
- `checkServiceability()`
- `calculateRate()`
- `fetchWaybill()`
- `fetchWaybills()`

## Practical guidance

- Use `createOrder()` for B2C manifestation
- Use `checkServiceability()` before creating orders
- Use `generateLabel()` for packing slip generation
- Use `createPickupRequest()` for pickup scheduling
