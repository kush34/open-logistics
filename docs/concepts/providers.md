---
description: "Provider support in Open-Logistics: one OpenLogistics entry point that selects a provider at construction, plus explicit Shiprocket and Delhivery facades."
---

# Providers

The package exposes one provider-agnostic entry point plus explicit provider
facades. Provider selection happens when the client is constructed; there is no
runtime registry or fallback router.

## Actual state

- `OpenLogistics` selects Shiprocket or Delhivery with its `provider` field
- `Shiprocket` remains available for the existing Shiprocket integration
- `Delhivery` remains available for Delhivery B2C
- No provider registry exists
- No fallback chain or cheapest-route selection exists

## Why this matters

The SDK is intentionally direct: each provider has its own credential type,
client behavior, and resource surface. `OpenLogistics` removes the need to pick
a class at the import site, but it still binds one instance to one provider. That
keeps the public API obvious without introducing a routing layer that the
repository does not need.

```ts
import { OpenLogistics } from "open-logistics";

const shiprocket = new OpenLogistics({ provider: "shiprocket", email, password });
const delhivery = new OpenLogistics({ provider: "delhivery", token, clientName });
```

See the [OpenLogistics client](/getting-started/open-logistics) for the full
resource surface.
