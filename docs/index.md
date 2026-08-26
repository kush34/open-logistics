---
layout: home
title: Open-Logistics
titleTemplate: Open-Logistics
hero:
  name: Open-Logistics
  text: Developer documentation for the Open-Logistics SDK
  tagline: One unified API for logistics integrations, currently implemented for Shiprocket and Delhivery.
  actions:
    - theme: brand
      text: Getting Started
      link: /shiprocket/
    - theme: alt
      text: API Reference
      link: /shiprocket/api/client
features:
  - icon: 🚚
    title: Shiprocket
    details: Existing Shiprocket integration with orders, shipments, tracking, courier, and rates.
  - icon: 📦
    title: Delhivery
    details: B2C integration with order creation, tracking, serviceability, rates, labels, pickup requests, and waybills.
  - icon: ⚙️
    title: Typed SDK surface
    details: Orders, shipments, tracking, courier, rates, and normalized API errors.
  - icon: 📘
    title: Practical docs
    details: Installation, auth, configuration, guides, examples, and advanced behavior notes.
---

## Open-Logistics

One unified API for logistics integrations, currently implemented for Shiprocket and Delhivery.

The repository ships a real TypeScript SDK and a developer-facing documentation site. Start with installation and authentication, then move into the API reference and examples.

### Installation

```bash
npm install open-logistics
```

### Minimal working example

```ts
import { ShiprocketClient } from "open-logistics";

const sdk = new ShiprocketClient({
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});

const tracking = await sdk.trackByAWB("1234567890");
```

### Core capabilities

- `ShiprocketClient` direct methods
- `DelhiveryClient` direct methods
- Automatic token refresh on `401` for Shiprocket
- Static token auth for Delhivery
- Normalized `ShiprocketAPIError` for API failures
- Normalized `DelhiveryAPIError` for API failures

### Provider support

- Shiprocket
- Delhivery

### Start here

- [Shiprocket docs](/shiprocket/)
- [Delhivery docs](/delhivery/)
