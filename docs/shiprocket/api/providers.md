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
