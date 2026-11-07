---
description: "Install the Open-Logistics SDK from npm, PyPI, or crates.io, review runtime requirements, and choose the right package for TypeScript, Python, or Rust."
---

# Installation

Open-Logistics ships a TypeScript SDK on npm, a generated Python client on PyPI
(distribution `open-logistics-sdk`, import `open_logistics`), and a generated
Rust client on crates.io.

::: code-group

```bash [npm]
npm install open-logistics
```

```bash [pip]
pip install open-logistics-sdk
```

```bash [cargo]
cargo add open-logistics
```

:::

## Requirements

- **TypeScript**: Node.js 18 or newer is recommended because the SDK relies on the built-in `fetch` API.
- **Python**: Python 3.11 or newer.
- **Rust**: Rust 2021 edition; TLS is enabled by default via `native-tls`.

Provider credentials are required for authenticated calls:

- Shiprocket uses `email` and `password`
- Delhivery uses `token` and `clientName`

## Package metadata

| Registry | Package | Import |
| --- | --- | --- |
| npm | `open-logistics` | `open-logistics` |
| PyPI | `open-logistics-sdk` | `open_logistics` |
| crates.io | `open-logistics` | `open_logistics` |

- Repository: `https://github.com/kush34/open-logistics`
- License: MIT

## Next steps

- [Shiprocket authentication](/shiprocket/getting-started/authentication)
- [Delhivery authentication](/delhivery/getting-started/authentication)
- [Python and Rust clients](/languages/)

## FAQ

### Which package do I install for Python?

`pip install open-logistics-sdk`. The import name is `open_logistics`.

### Why is the Python package not named `open-logistics`?

`open-logistics` is already taken on PyPI, so the distribution is published as
`open-logistics-sdk`. The import package is still `open_logistics`.

### Do the Python and Rust clients behave like the TypeScript SDK?

They are generated from the same OpenAPI specs and use matching operation names,
but they return raw provider payloads rather than the TypeScript SDK's normalized
responses. See [Python and Rust clients](/languages/).
