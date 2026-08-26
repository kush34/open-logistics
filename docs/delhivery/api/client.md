# Delhivery client

The public Delhivery entry point is the `DelhiveryClient` class exported from the package root.

## Constructor

```ts
new DelhiveryClient(credentials: DelhiveryCredentials)
```

## Credentials

```ts
interface DelhiveryCredentials {
  token: string;
  clientName: string;
  baseUrl?: string;
}
```

## Exposed methods

- `createOrder(payload)`
- `updateOrder(payload)`
- `cancelOrder(waybill)`
- `trackByWaybill(waybill)`
- `trackByOrderId(orderId)`
- `trackByWaybills(waybills)`
- `checkServiceability(params)`
- `calculateRate(params)`
- `generateLabel(waybill, pdf?)`
- `createPickupRequest(payload)`
- `fetchWaybill()`
- `fetchWaybills(params)`
