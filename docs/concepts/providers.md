# Providers

The current codebase does not expose a provider abstraction layer.

## Actual state

- There is one backend integration: Shiprocket
- No provider registry exists
- No provider selection API exists
- No fallback chain exists

## Why this matters

The repository name suggests a broader logistics abstraction, but the implementation currently wraps Shiprocket endpoints directly. Documentation should treat Shiprocket as the only supported provider until the code changes.

## If you need multi-vendor support

That would require new APIs for:

- Provider registration
- Provider-specific credentials
- Request normalization
- Routing strategy selection
- Error mapping per provider
