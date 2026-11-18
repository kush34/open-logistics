---
description: "Verify and parse Shiprocket, Delhivery Scan Push, and Shadowfax Forward tracking callbacks with Open-Logistics."
---

# Tracking webhooks

Use the TypeScript SDK's `parseTrackingWebhook` helper in a Node.js HTTPS
endpoint. Select the provider in your route and configure an inbound secret
for each account. Create the callback in the provider's dashboard or through
its onboarding team.

| Provider | Setup | Configuration |
| --- | --- | --- |
| Shiprocket | Enable the callback and security token in Settings → API → Webhooks. Follow Shiprocket's restrictions on words in callback URLs. | `{ token }`. The helper checks `x-api-key`. |
| Delhivery B2C | Ask Delhivery to enable Scan Push with the default `Shipment` payload, your endpoint, and your secret header. Confirm the expected response and test with Delhivery using a live waybill. | `{ header, token }`. The token is the full expected header value, including any prefix. |
| Shadowfax Forward | Register the URL and confirm the callback template and inbound secret header with your Shadowfax integration contact. | `{ header, token, fields? }`. The token is the full expected header value. |

See the official [Shiprocket API docs](https://apidocs.shiprocket.in/?version=latest),
[Delhivery Scan Push docs](https://delhivery-express-api-doc.readme.io/reference/tracking-via-push-api-webhook-1),
and [Shadowfax Forward callback docs](https://developer.shadowfax.in/docs/forward-logistics/callbacks).
For iThink Logistics, use the [tracking API](/ithink/api/tracking) for polling.

## Receive a callback

This example uses a Fetch-style route handler. Supply your own durable inbox
to store the event and make duplicate deliveries safe.
For Node HTTP or Express, adapt the incoming headers to a Fetch `Headers` object.

```ts
import { parseTrackingWebhook } from "open-logistics";
import { trackingInbox } from "./tracking-inbox.js";

const token = process.env.SHIPROCKET_WEBHOOK_TOKEN;
if (!token) throw new Error("SHIPROCKET_WEBHOOK_TOKEN is required");

export async function POST(request: Request): Promise<Response> {
  const result = parseTrackingWebhook(
    "shiprocket",
    { headers: request.headers, rawBody: await request.text() },
    { token },
  );

  if (!result.ok) {
    return new Response(null, {
      status: result.reason === "unauthorized" ? 401 : 400,
    });
  }

  await trackingInbox.insertIfNew(result.event);
  return new Response(null, { status: 200 });
}
```

Return HTTP 200 after storing the event and match any response body agreed
during onboarding. Shadowfax Forward expects a response within 10 seconds
and does not automatically retry failed deliveries. Apply shipment updates
asynchronously, handle out-of-order events, and use the tracking APIs to
reconcile missed callbacks. The raw payload may contain sensitive shipment data.

## Callback fields

The helper checks the configured secret header before parsing JSON.
It throws a `TypeError` for an empty configured token or invalid header name;
validate configuration at startup. The shared secret does not prevent replay:
deduplicate events and reconcile with the tracking API.
It accepts an object with a nonempty string waybill and at least one status
code or label. The result includes `provider`, `waybill`, and the original
object in `raw`. Available fields include `statusCode`, `statusLabel`, and
`occurredAt`. Status codes are strings and timestamps retain their source
format. Shiprocket also exposes `shipmentStatusCode` and `shipmentStatusLabel`
separately from the callback's current status.
Shiprocket shipment status alone is also accepted. Delhivery's supported shape
uses `Shipment.AWB`, `Shipment.NSLCode`, and `Shipment.Status.Status`.

For Shadowfax, the default fields are `awb_number`, `status_id`, `status`,
and `last_updated`. To use different top-level field names, pass their mapping
in the config. Omitted entries keep the defaults.

```ts
const result = parseTrackingWebhook("shadowfax", { headers, rawBody }, {
  header: "x-callback-token",
  token,
  fields: {
    waybill: "tracking_id",
    statusCode: "state",
    occurredAt: "updated_at",
  },
});
```
