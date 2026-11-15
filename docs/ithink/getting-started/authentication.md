---
description: "Authenticate iThink Logistics requests with an access token and secret key in the Open-Logistics SDK."
---

# iThink Logistics authentication

iThink Logistics uses a static `access_token` and `secret_key` issued by the
iThink team.

`OpenLogistics({ provider: "ithink", accessToken, secretKey })` takes the same
credentials and is the recommended entry point; the client below is the
lower-level option.

## Credentials

```ts
import { IthinkClient } from "open-logistics";

const sdk = new IthinkClient({
  accessToken: process.env.ITHINK_ACCESS_TOKEN!,
  secretKey: process.env.ITHINK_SECRET_KEY!,
});
```

## How auth works

1. Every request posts a JSON body shaped as `{ "data": { ...fields } }`.
2. The client adds `access_token` and `secret_key` to that `data` object.
3. There is no login endpoint and no token refresh flow.
4. The credentials are scoped to the iThink environment you were issued.

## Failure cases

- Missing `accessToken` throws `Error("iThink accessToken is required")`
- Missing `secretKey` throws `Error("iThink secretKey is required")`
- API failures throw `IthinkAPIError`
