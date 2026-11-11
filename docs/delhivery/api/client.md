---
description: "Create a DelhiveryClient with a token and client name, then call Delhivery B2C methods from the Open-Logistics SDK."
---

# Delhivery client

`OpenLogistics` with `provider: "delhivery"` is the recommended entry point for
Delhivery B2C operations. `DelhiveryClient` remains the direct client exported
from the package root, and the deprecated `Delhivery` facade groups the same
operations into resources.

## Create a client

```ts
import { DelhiveryClient } from "open-logistics";

const sdk = new DelhiveryClient({
  token: process.env.DELHIVERY_TOKEN!,
  clientName: process.env.DELHIVERY_CLIENT_NAME!,
});
```

The constructor validates both credentials and throws an `Error` when either is
missing. Every request sends `Authorization: Token <token>`; Delhivery has no
login endpoint and no token refresh flow.

```ts
interface DelhiveryCredentials {
  token: string;
  clientName: string;
  baseUrl?: string;
}
```

`baseUrl` overrides the built-in API host and is useful for staging or a
dedicated Delhivery environment.

## Methods

| Method | Returns |
| --- | --- |
| `createOrder(payload)` | `DelhiveryOrderCreateResponse` |
| `updateOrder(payload)` | `DelhiveryOrderUpdateResponse` |
| `cancelOrder(waybill)` | `DelhiveryCancelOrderResponse` |
| `trackByWaybill(waybill)` | `DelhiveryTrackingResponse` |
| `trackByOrderId(orderId)` | `DelhiveryTrackingResponse` |
| `trackByWaybills(waybills)` | `DelhiveryTrackingResponse` |
| `checkServiceability(params)` | `DelhiveryServiceabilityResponse` |
| `calculateRate(params)` | `DelhiveryRateResponse` |
| `generateLabel(waybill, pdf?)` | `DelhiveryPackingSlipResponse` |
| `createPickupRequest(payload)` | `DelhiveryPickupRequestResponse` |
| `fetchWaybill()` | `DelhiveryWaybillResponse` |
| `fetchWaybills(params)` | `DelhiveryBulkWaybillResponse` |

Failed requests throw `DelhiveryAPIError` with the HTTP status and the parsed
response body. See the [error model](/concepts/error-model).
