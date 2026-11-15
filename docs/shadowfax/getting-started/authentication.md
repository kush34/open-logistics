---
description: "Authenticate Shadowfax requests with a static API token in the Open-Logistics SDK."
---

# Shadowfax authentication

Shadowfax uses a static API token.

`OpenLogistics({ provider: "shadowfax", token })` takes the same credentials and
is the recommended entry point; the client below is the lower-level option.

## Credentials

```ts
import { ShadowfaxClient } from "open-logistics";

const sdk = new ShadowfaxClient({
  token: process.env.SHADOWFAX_TOKEN!,
});
```

## How auth works

1. Every request sends `Authorization: Token <token>`.
2. The token is static and does not expire; there is no exchange or refresh step.
3. Generate the token in the SFX 360 Partner Portal.
4. Staging and production use separate tokens.

Shadowfax also offers an OAuth2 client-credentials flow that returns a one-hour
Bearer token (`POST /v1/clients/token/`). This SDK does not implement it.

## Failure cases

- Missing `token` throws `Error("Shadowfax token is required")`
- API failures throw `ShadowfaxAPIError`
- Auth failures return `401`, with `message` or `responseMsg` in the body
