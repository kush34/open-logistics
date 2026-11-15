---
description: "Shadowfax forward-logistics integration in Open-Logistics: authentication, configuration, API reference, guides, and examples."
---

# Shadowfax

Shadowfax is implemented as a separate provider module with static-token auth.
The `ShadowfaxClient` covers forward-logistics order creation, updates,
cancellation, tracking, serviceability, rates, labels, proof of delivery, and
AWB generation.

The SDK covers the **Forward Logistics** API. Reverse Logistics, Exchange,
Hyperlocal, Quick Commerce, escalation endpoints, and webhook registration are
not part of the current surface.

## Start here

- [Installation](/getting-started/installation)
- [OpenLogistics client](/getting-started/open-logistics)
- [Authentication](/shadowfax/getting-started/authentication)
- [Configuration](/shadowfax/getting-started/configuration)

## API reference

- [API index](/shadowfax/api/)
- [Client](/shadowfax/api/client)
- [Orders](/shadowfax/api/orders)
- [Shipments](/shadowfax/api/shipments)
- [Tracking](/shadowfax/api/tracking)
- [Rates](/shadowfax/api/rates)
- [Serviceability](/shadowfax/api/serviceability)
- [Waybills](/shadowfax/api/waybills)

## Guides

- [Shadowfax guide](/shadowfax/guides/)

## Examples

- [Shadowfax create order](/shadowfax/examples/create-order)

## Official resources

- [Shadowfax developer portal](https://developer.shadowfax.in/docs)
- [Forward Logistics quickstart](https://developer.shadowfax.in/docs/forward-logistics/quickstart)
- [Shadowfax website](https://www.shadowfax.in/)

## FAQ

### How do I authenticate with Shadowfax?

Create a `ShadowfaxClient` with your Shadowfax API `token`. Every request sends `Authorization: Token <token>`. The token is static and does not expire.

### Does the SDK support Shadowfax OAuth2 client credentials?

No. Shadowfax also offers an OAuth2 client-credentials flow that issues a one-hour Bearer token, but this SDK only implements static Token auth. If you need OAuth2, exchange the credentials yourself and pass the resulting Bearer token where your integration can use it.

### What Shadowfax operations are supported?

Forward order creation, update, and cancellation; single and bulk tracking; pincode serviceability; the rate calculator; label generation; proof-of-delivery details; and pooled, fresh, and polled AWB generation.

### Why did an order fail with HTTP 200?

Forward Logistics returns HTTP 200 for rejections. Check `message`: `"Success"` means the order exists under `data`, `"Failure"` means it does not. The SDK exposes this as `success` and keeps the provider detail in `errors`.

### Do I need a Shadowfax account to use the SDK?

Yes. The SDK calls Shadowfax's live API, so you need Shadowfax API credentials and an active account. The package itself is MIT-licensed and free.
