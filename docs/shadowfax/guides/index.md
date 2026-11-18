---
description: "Supported Shadowfax forward-logistics operations in the Open-Logistics SDK and what is out of scope."
---

# Shadowfax guide

`ShadowfaxClient` exposes the Shadowfax Forward Logistics operations that fit
the SDK's resource model.

## Supported operations

- Forward order creation
- Order update (delivery, pickup, return, order details, status update)
- Order cancellation by AWB or client order ID
- Single-AWB tracking
- Bulk tracking (up to 50 AWBs)
- [Forward callback verification and parsing](/advanced/tracking-webhooks)
- Pincode serviceability
- Rate calculator for a pincode pair
- Label generation (PDF or PRN)
- Proof-of-delivery details (up to 100 AWBs)
- Pooled and fresh AWB generation, with polling

## Not implemented

- OAuth2 client-credential authentication
- Webhook registration
- Escalation endpoints
- Reverse Logistics, Exchange, Hyperlocal, and Quick Commerce
- MPS child-shipment helpers (the parent-AWB calls still work)
- Automatic retry on `429` or `500`

Those exist in Shadowfax's ecosystem, but they are not part of the current SDK
surface.

## Example flow

1. Check serviceability for the pickup and delivery pincodes
2. Optionally pre-generate an AWB
3. Create the forward order and check `success`
4. Generate the label before pickup
5. Track by AWB, or receive callbacks from the Shadowfax portal
6. Fetch POD details after delivery
