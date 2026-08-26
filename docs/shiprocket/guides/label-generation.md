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

The SDK does not post-process the label URL.
