---
description: "Shiprocket integration in Open-Logistics: installation, authentication, configuration, API reference, guides, and examples."
---

# Shiprocket

Shiprocket is the original provider surface in this repository. The
`ShiprocketClient` authenticates with email and password, caches the bearer
token, and refreshes it automatically once on a `401` response.

## Start here

- [Installation](/getting-started/installation)
- [Authentication](/shiprocket/getting-started/authentication)
- [Configuration](/shiprocket/getting-started/configuration)

## API reference

- [Client](/shiprocket/api/client)
- [Orders](/shiprocket/api/orders)
- [Shipments](/shiprocket/api/shipments)
- [Courier](/shiprocket/api/courier)
- [Tracking](/shiprocket/api/tracking)
- [Rates](/shiprocket/api/rates)
- [Errors](/shiprocket/api/errors)

## Guides

- [Orders guide](/shiprocket/guides/orders)
- [Shipments guide](/shiprocket/guides/shipments)
- [Tracking guide](/shiprocket/guides/tracking)
- [Label generation guide](/shiprocket/guides/label-generation)
- [Rate comparison guide](/shiprocket/guides/rate-comparison)

## Examples

- [Create order](/shiprocket/examples/create-order)
- [Tracking](/shiprocket/examples/tracking)

## Official resources

- [Shiprocket website](https://www.shiprocket.in/)
- [Shiprocket API documentation](https://apidocs.shiprocket.in/)

## FAQ

### How do I authenticate with Shiprocket?

Create a `ShiprocketClient` with your Shiprocket email and password. The first API call logs in, caches the token in memory for 10 days, and reuses it until it expires or a request returns `401`.

### What operations does ShiprocketClient support?

Orders (create, list, fetch, cancel), shipments, courier serviceability and rates, AWB tracking, label generation, pickup requests, and manifests. See the [API reference](/shiprocket/api/client) for the full method list.

### Does the SDK refresh Shiprocket tokens automatically?

Yes. When a request returns `401`, the client refreshes the token and retries that request. The client does not cap the number of refreshes, and there is no other automatic retry behavior; see [retries](/advanced/retries).

### Do I need a Shiprocket account to use the SDK?

Yes. The SDK calls Shiprocket's live API, so you need Shiprocket API credentials and an active account. The package itself is MIT-licensed and free.
