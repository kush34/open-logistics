---
description: "iThink Logistics integration in Open-Logistics: authentication, configuration, API reference, guides, and examples."
---

# iThink Logistics

iThink Logistics is implemented as a separate provider module with static
`access_token` and `secret_key` credentials. The `IthinkClient` covers order
creation and cancellation, tracking, pincode serviceability, rate calculation,
labels, and manifests.

## Start here

- [Installation](/getting-started/installation)
- [OpenLogistics client](/getting-started/open-logistics)
- [Authentication](/ithink/getting-started/authentication)
- [Configuration](/ithink/getting-started/configuration)

## API reference

- [API index](/ithink/api/)
- [Client](/ithink/api/client)
- [Orders](/ithink/api/orders)
- [Shipments](/ithink/api/shipments)
- [Tracking](/ithink/api/tracking)
- [Rates](/ithink/api/rates)
- [Serviceability](/ithink/api/serviceability)

## Guides

- [iThink guide](/ithink/guides/)

## Examples

- [iThink create order](/ithink/examples/create-order)

## Official resources

- [iThink Logistics website](https://www.ithinklogistics.com/)
- [iThink Logistics API documentation](https://docs.ithinklogistics.com/)

## FAQ

### How do I authenticate with iThink Logistics?

Create an `IthinkClient` with the `accessToken` and `secretKey` issued by your
iThink account manager. Both values are sent inside the `data` object of every
request; there is no login endpoint and no token refresh.

### What iThink Logistics operations are supported?

Order creation and cancellation, AWB tracking (up to 10 AWBs per request),
pincode serviceability, courier rate comparison, shipment labels, and manifests.

### Does the SDK support iThink pickup requests?

iThink does not expose a separate pickup-request endpoint in its API v3 docs.
Pickups are tied to the warehouse passed as `pickup_address_id` when an order is
created. Warehouse creation and listing are not part of the current SDK surface.

### Do I need an iThink Logistics account to use the SDK?

Yes. The SDK calls iThink Logistics' live API, so you need API credentials and an
active account. The package itself is MIT-licensed and free.
