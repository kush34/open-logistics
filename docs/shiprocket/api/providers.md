---
description: "Provider entry points exported by Open-Logistics: the provider-agnostic OpenLogistics client and the Shiprocket and Delhivery facades."
---

# Providers API

The package root exports one provider-agnostic client and the provider facades.

## Current state

- `OpenLogistics` selects a provider at construction
- `Shiprocket` facade
- `Delhivery` facade
- No provider manager
- No provider registry
- No fallback router

## Recommended: OpenLogistics

```ts
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({ provider: "shiprocket", email, password });
await openLogistics.orders.create(payload);
```

Set `provider` to `"shiprocket"` or `"delhivery"`. Resources the selected
provider does not implement are `undefined`. Full guide:
[OpenLogistics client](/getting-started/open-logistics).

## Provider facades

`Shiprocket` and `Delhivery` are still exported and behave as before. They are
marked deprecated and will be removed after two more releases.

```ts
import { Shiprocket, Delhivery } from "open-logistics";

const shiprocket = new Shiprocket({ email, password });
const delhivery = new Delhivery({ token, clientName });
```

## Notes

Each instance keeps its own provider credentials and resource surface. There is
no cross-provider routing layer in this repository.

See [Shiprocket client](/shiprocket/api/client) and
[Delhivery client](/delhivery/api/client) for the resource methods each facade
exposes.
