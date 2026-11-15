---
description: "Provider entry points exported by Open-Logistics: the provider-agnostic OpenLogistics client and the Shiprocket, Delhivery, iThink, and Shadowfax facades."
---

# Providers API

The package root exports one provider-agnostic client and the provider facades.

## Current state

- `OpenLogistics` selects a provider at construction
- `Shiprocket` facade
- `Delhivery` facade
- `Ithink` facade
- `Shadowfax` facade
- No provider manager
- No provider registry
- No fallback router

## Recommended: OpenLogistics

```ts
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({ provider: "shiprocket", email, password });
await openLogistics.orders.create(payload);
```

Set `provider` to `"shiprocket"`, `"delhivery"`, `"ithink"`, or `"shadowfax"`.
Resources the selected provider does not implement are `undefined`. Full guide:
[OpenLogistics client](/getting-started/open-logistics).

## Provider facades

`Shiprocket`, `Delhivery`, `Ithink`, and `Shadowfax` are still exported. They
are marked deprecated in favour of `OpenLogistics` and will be removed after two
more releases.

```ts
import { Shiprocket, Delhivery, Ithink, Shadowfax } from "open-logistics";

const shiprocket = new Shiprocket({ email, password });
const delhivery = new Delhivery({ token, clientName });
const ithink = new Ithink({ accessToken, secretKey });
const shadowfax = new Shadowfax({ token });
```

## Notes

Each instance keeps its own provider credentials and resource surface. There is
no cross-provider routing layer in this repository.

See [Shiprocket client](/shiprocket/api/client),
[Delhivery client](/delhivery/api/client),
[iThink client](/ithink/api/client), and
[Shadowfax client](/shadowfax/api/client) for the resource methods each facade
exposes.
