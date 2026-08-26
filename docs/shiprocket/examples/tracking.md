# Example: track by AWB

```ts
const tracking = await sdk.trackByAWB("1234567890");

console.log(tracking.tracking_data.track_url);
```

This is the most direct tracking flow supported by the current SDK.
