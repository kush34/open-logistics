# Label generation

Label generation is provided by `shipments.generateLabel()`.

## Example

```ts
const result = await sdk.shipments.generateLabel({
  shipment_id: [456],
});

console.log(result.label_created);
console.log(result.url);
```

## Output

The documented return type is:

- `label_created`
- `url`

The SDK does not post-process the label URL.
