---
description: "Configure ShadowfaxClient with a token and an optional base URL override for staging or production."
---

# Shadowfax configuration

The current Shadowfax constructor accepts:

```ts
new ShadowfaxClient({
  token: "your-token",
  baseUrl: "https://dale.staging.shadowfax.in/api", // optional
});
```

`OpenLogistics({ provider: "shadowfax", token, baseUrl })` accepts the same
options and is the recommended entry point.

| Option | Type | Required | Notes |
| --- | --- | --- | --- |
| `token` | `string` | yes | Static Shadowfax API token |
| `baseUrl` | `string` | no | Full API base including `/api` |

## Base URLs

| Environment | Base URL |
| --- | --- |
| Production (default) | `https://dale.shadowfax.in/api` |
| Staging | `https://dale.staging.shadowfax.in/api` |

Staging and production use separate tokens. Orders placed in staging do not
trigger real pickups.

## What is configurable

- API token
- Base URL override for staging or a dedicated environment

## Exposed methods

- `createOrder()`
- `updateOrder()`
- `cancelOrder()`
- `trackByAwb()`
- `trackBulk()`
- `checkServiceability()`
- `calculateRate()`
- `generateLabel()`
- `fetchPod()`
- `generateAwbs()`
- `requestAwbs()`
- `pollAwbs()`

## Practical guidance

- Use `checkServiceability()` before creating orders
- Use `calculateRate()` for prepaid quotes; it creates no order
- Use `createOrder()` for forward manifestation
- Use `generateLabel()` before the item is picked up
- Set `baseUrl` explicitly when you need staging
