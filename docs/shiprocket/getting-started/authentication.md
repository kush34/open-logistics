# Authentication

The SDK authenticates against Shiprocket using an email and password pair.

## Credentials

```ts
import { ShiprocketClient } from "open-logistics";

const sdk = new ShiprocketClient({
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});
```

## How auth works

1. The first API call triggers `POST /auth/login`.
2. Shiprocket returns an access token.
3. The token is cached in memory by the client.
4. The token is reused until it expires or a request returns `401`.
5. On `401`, the client refreshes the token once and retries the request.

## Token lifetime

The implementation caches tokens for 10 days in memory. That value is an SDK-side assumption and is not a Shiprocket guarantee.

## Environment variables

The runtime SDK does not read environment variables directly. The repository's tests use:

- `SHIPROCKET_EMAIL`
- `SHIPROCKET_PASSWORD`
- `SDK_DEBUG` for logger output

## Failure cases

- Invalid credentials cause an `Error` with the message `Auth failed: ...`
- A missing token after authentication causes `Error("Authentication failed")`
- API errors after authentication raise `ShiprocketAPIError`
