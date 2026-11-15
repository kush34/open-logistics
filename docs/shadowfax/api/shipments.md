---
description: "Generate Shadowfax labels and fetch proof-of-delivery details with ShadowfaxClient."
---

# Shadowfax shipments

`ShadowfaxClient` exposes label generation and proof-of-delivery (POD) details.

## `generateLabel(awbNumber, fileType?)`

Posts to `/client/generate_label/`. `fileType` is `"pdf"` (default) or `"prn"`.
One AWB per call.

```ts
const label = await sdk.generateLabel("SF1234567890", "pdf");

console.log(label.labelUrl);
```

| Field | Type | Notes |
| --- | --- | --- |
| `success` | `boolean` | Provider accepted the request |
| `message` | `string \| null` | Provider message |
| `awb_number` | `string` | AWB used for the label |
| `labelUrl` | `string \| null` | Read from `data.label_url`; valid for 2 days |
| `raw` | `unknown` | Original Shadowfax response |

Labels can only be generated for Marketplace and Warehouse orders, and only
before pickup. Picked or cancelled orders return `400`.

## `fetchPod(awbNumbers)`

Posts to `/v1/clients/pod_details/` with up to 100 AWBs.

```ts
const pod = await sdk.fetchPod(["SF1234567890"]);

console.log(pod.pod_details["SF1234567890"]?.recipient_name);
```

| Field | Type | Notes |
| --- | --- | --- |
| `message` | `string \| null` | Provider message |
| `pod_details` | `Record<string, ShadowfaxPodDetails>` | Keyed by AWB; empty object when unavailable |
| `raw` | `unknown` | Original Shadowfax response |

POD is populated only for `delivered`, `rts_d`, and `rto_d` orders. A single AWB
in another status returns `400`; a bulk request returns an empty object for that
AWB instead.
