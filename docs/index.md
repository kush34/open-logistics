---
layout: home
title: Open-Logistics
titleTemplate: Open-Logistics
description: "Open-Logistics SDK documentation: one API for Shiprocket and Delhivery with TypeScript, Python, and Rust clients."
hero:
  name: Open-Logistics
  text: Developer documentation for the Open-Logistics SDK
  tagline: One unified API for logistics integrations, with TypeScript, Python, and Rust clients for Shiprocket and Delhivery.
  actions:
    - theme: brand
      text: Getting Started
      link: /shiprocket/
    - theme: alt
      text: API Reference
      link: /shiprocket/api/client
features:
  - icon: >-
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
    title: Shiprocket
    details: Existing Shiprocket integration with orders, shipments, tracking, courier, and rates.
  - icon: >-
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
    title: Delhivery
    details: B2C integration with order creation, tracking, serviceability, rates, labels, pickup requests, and waybills.
  - icon: >-
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    title: Typed SDK surface
    details: Orders, shipments, tracking, courier, rates, and normalized API errors.
  - icon: >-
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
    title: Practical docs
    details: Installation, auth, configuration, guides, examples, and advanced behavior notes.
---

## Open-Logistics

One unified API for logistics integrations, currently implemented for Shiprocket and Delhivery.

The repository ships a TypeScript SDK, generated Python and Rust clients, and this developer-facing documentation site. Start with installation and authentication, then move into the API reference and examples.

### Installation

::: code-group

```bash [npm]
npm install open-logistics
```

```bash [pip]
pip install open-logistics-sdk
```

```bash [cargo]
cargo add open-logistics
```

:::

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
- [Python and Rust clients](/languages/)
