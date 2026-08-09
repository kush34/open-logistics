---
layout: home
title: Open-Logistics
titleTemplate: Open-Logistics
hero:
  name: Open-Logistics
  text: Developer documentation for the Open-Logistics SDK
  tagline: One unified API for logistics integrations, currently implemented for Shiprocket.
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started/installation
    - theme: alt
      text: API Reference
      link: /api/client
features:
  - icon: 🚚
    title: Shiprocket
    details: The only logistics provider implemented in this repository today.
  - icon: ⚙️
    title: Typed SDK surface
    details: Orders, shipments, tracking, courier, rates, and normalized API errors.
  - icon: 📘
    title: Practical docs
    details: Installation, auth, configuration, guides, examples, and advanced behavior notes.
---

## Open-Logistics

One unified API for logistics integrations, currently implemented for Shiprocket.

The repository ships a real TypeScript SDK and a developer-facing documentation site. Start with installation and authentication, then move into the API reference and examples.

### Installation

```bash
npm install open-logistics
```

### Minimal working example

```ts
import { Shiprocket } from "open-logistics";

const sdk = new Shiprocket({
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});

const tracking = await sdk.tracking.byAWB("1234567890");
```

### Core capabilities

- `Shiprocket` client facade
- `orders`, `shipments`, `tracking`, `courier`, and `rates` resources
- Automatic token refresh on `401`
- Normalized `ShiprocketAPIError` for API failures

### Provider support

- Shiprocket

### Start here

- [Getting Started](/getting-started/installation)
- [API Reference](/api/client)
