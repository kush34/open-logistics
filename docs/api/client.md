# Client

The public entry point is the `Shiprocket` class exported from the package root.

## Constructor

```ts
new Shiprocket(credentials: AuthCredentials)
```

## Credentials

```ts
interface AuthCredentials {
  email: string;
  password: string;
}
```

## Exposed resources

- `orders`
- `shipments`
- `courier`
- `tracking`
- `rates`

## Example

```ts
import { Shiprocket } from "open-logistics";

const sdk = new Shiprocket({
  email: "your@email.com",
  password: "yourpassword",
});
```
