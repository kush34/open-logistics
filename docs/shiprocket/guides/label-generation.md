---
description: "Generate Shiprocket labels and pickup requests from the SDK, with examples and returned fields."
---

# Label generation

Label generation is provided by `generateLabel()`.

## Example

```ts
const result = await sdk.generateLabel({
  shipment_id: [456],
});

console.log(result.label_created);
console.log(result.url);
```

## Output

The documented return type is:

- `label_created`
- `url`

The SDK does not post-process the label URL. Pass one or more shipment ids in
`shipment_id`; the same format is used by pickup and manifest generation.

See the [shipments guide](/shiprocket/guides/shipments) for the full flow.
