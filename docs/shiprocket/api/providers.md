---
description: "Provider facades exported by Open-Logistics: Shiprocket and Delhivery entry points."
---

# Providers API

The package root exports provider facades directly.

## Current state

- `Shiprocket` facade
- `Delhivery` facade
- No provider manager
- No provider registry
- No fallback router

## Notes

Each provider keeps its own credentials and resource surface. That is deliberate; there is no cross-provider routing layer in this repository.

```ts
import { Shiprocket, Delhivery } from "open-logistics";

const shiprocket = new Shiprocket({ email, password });
const delhivery = new Delhivery({ token, clientName });
```

See [Shiprocket client](/shiprocket/api/client) and
[Delhivery client](/delhivery/api/client) for the resource methods each facade
exposes.
