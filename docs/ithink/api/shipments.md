---
description: "Generate iThink Logistics shipping labels and manifests with IthinkClient, including page sizes and returned PDF URLs."
---

# iThink Logistics shipments

`IthinkClient` exposes label and manifest generation. Both return a PDF URL from
iThink.

## `generateLabel(waybills, pageSize?)`

Posts to `/api_v3/shipping/label.json`. Pass one AWB or an array; the SDK joins
arrays with commas (maximum 100 AWBs per request, a longer list throws an `Error`
before the request is sent).

```ts
const label = await sdk.generateLabel(["86210010463", "86210010464"], "A4");

console.log(label.url);
```

| Field | Type | Notes |
| --- | --- | --- |
| `waybills` | `string \| string[]` | One or more AWBs |
| `pageSize` | `"A4" \| "A5" \| "A6"` | Defaults to `"A4"` |

## `generateManifest(waybills)`

Posts to `/api_v3/shipping/manifest.json` and returns the manifest PDF URL.

```ts
const manifest = await sdk.generateManifest("86210010463");

console.log(manifest.url);
```

## Response

| Field | Type | Notes |
| --- | --- | --- |
| `success` | `boolean` | Provider reported success |
| `message` | `string \| null` | Error or status message |
| `url` | `string \| null` | Generated PDF URL |
| `raw` | `unknown` | Original iThink response |

The iThink label endpoint also accepts display flags for COD/prepaid values and
shipper details. Those flags are configured on the iThink account and are not
exposed by the SDK.
