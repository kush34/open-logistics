---
description: "Delhivery B2C integration in Open-Logistics: authentication, configuration, API reference, guides, and examples."
---

# Delhivery

Delhivery is implemented as a separate provider module with static-token auth.
The `DelhiveryClient` covers B2C order creation, tracking, serviceability,
rates, labels, pickup requests, and waybills.

## Start here

- [Installation](/getting-started/installation)
- [OpenLogistics client](/getting-started/open-logistics)
- [Authentication](/delhivery/getting-started/authentication)
- [Configuration](/delhivery/getting-started/configuration)

## API reference

- [API index](/delhivery/api/)
- [Client](/delhivery/api/client)
- [Orders](/delhivery/api/orders)
- [Shipments](/delhivery/api/shipments)
- [Tracking](/delhivery/api/tracking)
- [Rates](/delhivery/api/rates)
- [Serviceability](/delhivery/api/serviceability)
- [Waybills](/delhivery/api/waybills)

## Guides

- [Delhivery guide](/delhivery/guides/)

## Examples

- [Delhivery create order](/delhivery/examples/create-order)

## Official resources

- [Delhivery website](https://www.delhivery.com/)
- [Delhivery tracking](https://www.delhivery.com/tracking)

## FAQ

### How do I authenticate with Delhivery?

Create a `DelhiveryClient` with your Delhivery API `token` and registered `clientName`. Every request sends `Authorization: Token <token>`; there is no login endpoint and no token refresh.

### What Delhivery operations are supported?

B2C order creation, editing, and cancellation; tracking by waybill, order ID, or multiple waybills; pincode serviceability; invoice-based rate calculation; packing slips and labels; pickup requests; and single or bulk waybill fetch.

### Does the SDK support Delhivery webhooks or NDR actions?

No. Warehouse creation, NDR actions, and webhook setup are not part of the current SDK surface. See the [Delhivery guide](/delhivery/guides/) for the exact list.

### Do I need a Delhivery account to use the SDK?

Yes. The SDK calls Delhivery's live API, so you need Delhivery API credentials and an active account. The package itself is MIT-licensed and free.
