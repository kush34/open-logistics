# Performance

This SDK keeps the implementation simple.

## Characteristics

- One in-memory token cache per client instance
- No background polling
- No built-in concurrency limiter
- No request batching

## Practical advice

- Reuse a single `Shiprocket` instance when possible
- Avoid constructing a new client for every request
