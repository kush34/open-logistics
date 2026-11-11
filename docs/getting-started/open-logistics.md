---
description: "Use the OpenLogistics client to call Shiprocket or Delhivery through one typed resource surface, with the provider selected at construction."
---

# OpenLogistics client

`OpenLogistics` is the provider-agnostic entry point in the TypeScript SDK. You
create one instance per provider, set `provider`, and then call resources the
same way for either vendor. The provider you choose decides which API receives
every request.

```ts
import { OpenLogistics } from "open-logistics";
```

## Why use it

- **One import.** No need to pick between `Shiprocket` and `Delhivery` at the
  import site; the choice moves into configuration.
- **One resource vocabulary.** `orders`, `shipments`, `tracking`, and `rates`
  exist on both providers, so code that uses those resources barely changes
  between vendors.
- **Provider-specific types.** Request payloads and responses stay typed for the
  selected vendor. A Delhivery payload is not accepted by a Shiprocket instance.
- **Predictable surface.** Resources the selected provider does not implement are
  `undefined` and are rejected by TypeScript when `provider` is a literal.

## Delhivery

```ts
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({
  provider: "delhivery",
  token: process.env.DELHIVERY_TOKEN!,
  clientName: process.env.DELHIVERY_CLIENT_NAME!,
});

const order = await openLogistics.orders.create({
  order_id: "ORD-001",
  pickup_location: { name: "Primary Warehouse" },
  package_type: "Pre-paid",
  name: "John Doe",
  add: "123 Street",
  phone: "9999999999",
  pin: "400001",
});

const tracking = await openLogistics.tracking.byWaybill(order.waybill!);
```

Delhivery credentials are the same as `new Delhivery(...)`: a static API
`token` and your registered `clientName`. An optional `baseUrl` overrides the
default host.

## Shiprocket

```ts
import { OpenLogistics } from "open-logistics";

const openLogistics = new OpenLogistics({
  provider: "shiprocket",
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});

const order = await openLogistics.orders.create({ ... });
const rates = await openLogistics.courier.serviceability({ ... });
```

Shiprocket credentials are the same as `new Shiprocket(...)`: `email` and
`password`. Authentication, token caching, and the refresh-on-`401` retry run
exactly as they do for the `Shiprocket` facade.

## What each provider supports

Both providers expose `orders`, `shipments`, `tracking`, and `rates`, but the
methods inside those resources differ. `courier` belongs to Shiprocket;
`serviceability` and `waybills` belong to Delhivery.

| Resource         | Shiprocket                                                   | Delhivery                                    |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------- |
| `orders`         | `create`, `list`, `get`, `cancel`                            | `create`, `update`, `cancel`                 |
| `shipments`      | `generatePickup`, `generateLabel`, `generateManifest`, `printManifest` | `generateLabel`, `createPickupRequest` |
| `tracking`       | `byAWB`, `byShipmentId`, `byOrderId`                         | `byWaybill`, `byOrderId`, `byWaybills`       |
| `rates`          | `check`                                                      | `calculate`                                  |
| `courier`        | `serviceability`, `assignAWB`, `list`                        | —                                            |
| `serviceability` | —                                                            | `check`                                      |
| `waybills`       | —                                                            | `fetchOne`, `fetchBulk`                      |

Accessing a resource that the selected provider does not offer returns
`undefined` at runtime. With a literal `provider` value, TypeScript flags the
access before the code runs:

```ts
const openLogistics = new OpenLogistics({
  provider: "delhivery",
  token: "...",
  clientName: "...",
});

openLogistics.courier; // undefined; TypeScript reports the error
```

## Switching providers

Only the constructor changes. Shared resources keep the same names:

```ts
const openLogistics = new OpenLogistics({
  provider: "shiprocket",
  email: "...",
  password: "...",
});

await openLogistics.tracking.byAWB("1234567890");
```

One instance talks to one provider. To use both in the same process, create two
instances. There is no fallback chain, cheapest-route selection, or automatic
failover between providers; see [Providers](/concepts/providers).

## Backward compatibility

`OpenLogistics` sits on top of the existing provider facades, so nothing that
already works has changed:

- `Shiprocket`, `Delhivery`, `ShiprocketClient`, and `DelhiveryClient` are still
  exported and behave the same.
- `Shiprocket` and `Delhivery` are marked deprecated and will be removed after
  two more releases. The clients stay for lower-level, direct-method use.
- Existing code keeps working through the migration window.

### Migrating from a provider facade

```ts
// Before
import { Delhivery } from "open-logistics";
const delhivery = new Delhivery({ token, clientName });
await delhivery.orders.create(payload);

// After
import { OpenLogistics } from "open-logistics";
const openLogistics = new OpenLogistics({ provider: "delhivery", token, clientName });
await openLogistics.orders.create(payload);
```

The method calls do not change; only the constructor and the variable name do.

## FAQ

### Is OpenLogistics a provider registry or router?

No. It is a typed facade over the existing provider facades. The provider is fixed when you construct the instance, and there is no registry, fallback chain, or automatic routing.

### Can one OpenLogistics instance call both providers?

No. Create one instance per provider. Each instance owns a single provider client with its own credentials and token state.

### Why is a resource undefined on my instance?

The selected provider does not offer that resource. For example, courier is Shiprocket-only, while serviceability and waybills are Delhivery-only. Check the support table above.

### Is OpenLogistics available in Python and Rust?

Not yet. It is a TypeScript entry point. The generated Python and Rust clients stay provider-specific and expose each provider as its own module.
