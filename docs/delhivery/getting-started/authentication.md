---
description: "Authenticate Delhivery requests with a static API token and registered client name in the Open-Logistics SDK."
---

# Delhivery authentication

Delhivery uses a static API token plus the registered client name.

`OpenLogistics({ provider: "delhivery", token, clientName })` takes the same
credentials and is the recommended entry point; the client below is the
lower-level option.

## Credentials

```ts
import { DelhiveryClient } from "open-logistics";

const sdk = new DelhiveryClient({
  token: process.env.DELHIVERY_TOKEN!,
  clientName: process.env.DELHIVERY_CLIENT_NAME!,
});
```

## How auth works

1. Every request sends `Authorization: Token <token>`.
2. There is no login endpoint and no token refresh flow.
3. The token is scoped to the Delhivery environment you were issued.
4. The client name is injected into the Delhivery order and waybill calls.

## Failure cases

- Missing `token` throws `Error("Delhivery token is required")`
- Missing `clientName` throws `Error("Delhivery clientName is required")`
- API failures throw `DelhiveryAPIError`
