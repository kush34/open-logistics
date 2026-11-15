---
description: "Create a ShadowfaxClient with a static token, then call Shadowfax forward-logistics methods from the Open-Logistics SDK."
---

# Shadowfax client

`OpenLogistics` with `provider: "shadowfax"` is the recommended entry point for
Shadowfax operations. `ShadowfaxClient` remains the direct client exported from
the package root, and the deprecated `Shadowfax` facade groups the same
operations into resources.

## Create a client

```ts
import { ShadowfaxClient } from "open-logistics";

const sdk = new ShadowfaxClient({
  token: process.env.SHADOWFAX_TOKEN!,
});
```

The constructor validates the token and throws an `Error` when it is missing.
Every request sends `Authorization: Token <token>`; Shadowfax has no login
endpoint and no token refresh flow in this SDK.

```ts
interface ShadowfaxCredentials {
  token: string;
  baseUrl?: string;
}
```

`baseUrl` is the full API base including the `/api` segment. It defaults to
production and is useful for staging (`https://dale.staging.shadowfax.in/api`).

## Methods

| Method | Returns |
| --- | --- |
| `createOrder(payload)` | `ShadowfaxCreateOrderResponse` |
| `updateOrder(payload)` | `ShadowfaxOrderUpdateResponse` |
| `cancelOrder(requestId, cancelRemarks?)` | `ShadowfaxCancelOrderResponse` |
| `trackByAwb(awbNumber)` | `ShadowfaxTrackingResponse` |
| `trackBulk(awbNumbers)` | `ShadowfaxBulkTrackingResponse` |
| `checkServiceability(params)` | `ShadowfaxServiceabilityResponse` |
| `calculateRate(params)` | `ShadowfaxRateResponse` |
| `generateLabel(awbNumber, fileType?)` | `ShadowfaxLabelResponse` |
| `fetchPod(awbNumbers)` | `ShadowfaxPodResponse` |
| `generateAwbs(params?)` | `ShadowfaxAwbPoolResponse` |
| `requestAwbs(payload?)` | `ShadowfaxAwbRequestResponse` |
| `pollAwbs(requestId)` | `ShadowfaxAwbResultResponse` |

Failed requests throw `ShadowfaxAPIError` with the HTTP status and the parsed
response body. Note that order creation reports business rejections with HTTP
200; check the mapped `success` flag. See the [error model](/concepts/error-model).
