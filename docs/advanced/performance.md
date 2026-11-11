---
description: "Open-Logistics performance characteristics: per-client token caching, no background polling, and fetch-based requests."
---

# Performance

This SDK keeps the implementation simple.

## Characteristics

- One in-memory token cache per client instance
- No background polling
- No built-in concurrency limiter
- No request batching

## Practical advice

- Reuse a single `OpenLogistics` instance (or one client) when possible
- Avoid constructing a new client for every request
- Cache serviceability and rate responses instead of repeating identical calls
- Handle `ShiprocketAPIError` so a failed refresh does not leave a request silent

The SDK does not add queues, background workers, or connection pooling. Keep
concurrency control in the calling application.
