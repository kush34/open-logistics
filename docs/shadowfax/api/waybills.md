---
description: "Generate pooled, fresh, and polled Shadowfax AWB numbers with the waybills resource."
---

# Shadowfax waybills

Shadowfax calls these AWB numbers. The SDK exposes both generation flows.

## `generateAwbs(params?)`

Pool replenishment at `POST /v3/clients/generate_marketplace_awb/`. It tops up
from your existing unused pool, so returned numbers are not guaranteed new.
`count` defaults to 10 and is capped at 100,000.

```ts
const pool = await sdk.generateAwbs({ count: 10 });
console.log(pool.awb_numbers);
```

| Field | Type | Notes |
| --- | --- | --- |
| `success` | `boolean` | Provider accepted the request |
| `message` | `string \| null` | Provider message |
| `awb_numbers` | `string[]` | AWBs from the pool |
| `raw` | `unknown` | Original Shadowfax response |

## `requestAwbs(payload?)`

Fresh, guaranteed-new AWBs at `POST /v1/clients/awb/`. This is asynchronous:
submit, wait `delay_time` seconds, then poll.

| Field | Type | Notes |
| --- | --- | --- |
| `awb_count` | `number` | Defaults to 1000, max 100,000 |
| `request_type` | `"fwd" \| "rev"` | Forward or reverse pool |

```ts
const request = await sdk.requestAwbs({ awb_count: 100, request_type: "fwd" });
```

Response fields: `status`, `request_id`, `message`, `delay_time`, `raw`.

## `pollAwbs(requestId)`

Polls `GET /v1/clients/awb/{request_id}/`.

```ts
const result = await sdk.pollAwbs(request.request_id!);

if (result.retry_flag) {
  // Still generating: wait and poll again.
}
console.log(result.awb_numbers);
```

| Field | Type | Notes |
| --- | --- | --- |
| `awb_numbers` | `string[]` | Ready AWBs; empty while pending |
| `status` | `string \| null` | `SUCCESS` or `PENDING` |
| `retry_flag` | `boolean` | True while the batch is still generating |
| `raw` | `unknown` | Original Shadowfax response |

Pass a pre-generated AWB in `order_details.awb_number` when creating an order, or
leave it blank and let Shadowfax assign one.
