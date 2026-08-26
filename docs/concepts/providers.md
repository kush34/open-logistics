# Providers

The package exposes explicit provider facades rather than a provider registry.

## Actual state

- `Shiprocket` is available for the existing Shiprocket integration
- `Delhivery` is available for Delhivery B2C
- No provider registry exists
- No provider selection or fallback chain exists

## Why this matters

The SDK is intentionally direct: each provider has its own credential type, client behavior, and resource surface. That keeps the public API obvious without introducing a routing layer that the repository does not need.
