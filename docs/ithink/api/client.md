---
description: "Create an IthinkClient with an access token and secret key, then call iThink Logistics API v3 methods from the Open-Logistics SDK."
---

# iThink Logistics client

`OpenLogistics` with `provider: "ithink"` is the recommended entry point for
iThink Logistics operations. `IthinkClient` is the direct client exported from
the package root, and the `Ithink` facade groups the same operations into
resources.

## Create a client

```ts
import { IthinkClient } from "open-logistics";

const sdk = new IthinkClient({
  accessToken: process.env.ITHINK_ACCESS_TOKEN!,
  secretKey: process.env.ITHINK_SECRET_KEY!,
});
```

The constructor validates both credentials and throws an `Error` when either is
missing. Every request posts JSON and includes `access_token` and `secret_key` in
the request `data`; iThink has no login endpoint and no token refresh flow.

```ts
interface IthinkCredentials {
  accessToken: string;
  secretKey: string;
  baseUrl?: string;
}
```

`baseUrl` overrides the built-in API host (`https://my.ithinklogistics.com`) and
is useful for staging (`https://pre-alpha.ithinklogistics.com`).

## Methods

| Method | Returns |
| --- | --- |
| `createOrder(payload)` | `IthinkOrderCreateResponse` |
| `cancelOrder(waybill)` | `IthinkCancelOrderResponse` |
| `trackByWaybill(waybill)` | `IthinkTrackingResponse` |
| `trackByWaybills(waybills)` | `IthinkTrackingResponse` |
| `checkServiceability(params)` | `IthinkServiceabilityResponse` |
| `calculateRate(params)` | `IthinkRateResponse` |
| `generateLabel(waybills, pageSize?)` | `IthinkDocumentResponse` |
| `generateManifest(waybills)` | `IthinkDocumentResponse` |

Failed requests throw `IthinkAPIError` with the HTTP status and the parsed
response body. See the [error model](/concepts/error-model).

## Errors

iThink reports some failures with HTTP 200, so the SDK also inspects the body:

- Any non-2xx HTTP status throws `IthinkAPIError`. `statusCode` is the body
  `status_code` when it is numeric, otherwise the HTTP status.
- A body with `status: "error"` (or `"failed"` / `"failure"`) or a
  `status_code >= 400` throws `IthinkAPIError` for `trackByWaybill`,
  `trackByWaybills`, `checkServiceability`, and `calculateRate`, which have no
  per-item result to report. The message comes from `html_message` / `message`.
- `createOrder`, `cancelOrder`, `cancelMany`, `generateLabel`, and
  `generateManifest` keep the parsed result and set `success: false` instead, so
  per-shipment results stay readable.
- Batches above the documented limits throw a plain `Error` before any request
  is sent: 10 AWBs for tracking, 10 shipments for order creation, 100 AWBs for
  cancellation, and 100 AWBs for labels.
