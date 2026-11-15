---
description: "Configure IthinkClient with an access token, secret key, and optional base URL override."
---

# iThink Logistics configuration

The current iThink constructor accepts:

```ts
new IthinkClient({
  accessToken: "your-access-token",
  secretKey: "your-secret-key",
  baseUrl: "https://pre-alpha.ithinklogistics.com", // optional
});
```

`OpenLogistics({ provider: "ithink", accessToken, secretKey, baseUrl })` accepts
the same options and is the recommended entry point.

| Option | Type | Required | Notes |
| --- | --- | --- | --- |
| `accessToken` | `string` | yes | Issued by the iThink Logistics team |
| `secretKey` | `string` | yes | Issued by the iThink Logistics team |
| `baseUrl` | `string` | no | Overrides the built-in API host |

## Environments

| Environment | Base URL |
| --- | --- |
| Production (default) | `https://my.ithinklogistics.com` |
| Staging | `https://pre-alpha.ithinklogistics.com` |

iThink's API documentation lists `https://api.ithinklogistics.com` for the
tracking endpoint in production, while the order, cancellation, pincode, rate,
label, and manifest pages list `https://my.ithinklogistics.com`. The SDK defaults
to `my.ithinklogistics.com`; if your account uses the `api.` host for tracking,
pass it as `baseUrl` on a dedicated client instance.

## What is configurable

- Access token
- Secret key
- Base URL override for staging or production

## Exposed methods

- `createOrder()`
- `cancelOrder()`
- `generateLabel()`
- `generateManifest()`
- `trackByWaybill()`
- `trackByWaybills()`
- `checkServiceability()`
- `calculateRate()`

## Practical guidance

- Use `checkServiceability()` before creating orders
- Use `calculateRate()` to compare courier rates for a route
- Use `generateLabel()` and `generateManifest()` after the AWB is generated
- Set `baseUrl` explicitly when you need staging or a different iThink host
