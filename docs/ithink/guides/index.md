---
description: "Supported iThink Logistics operations in the Open-Logistics SDK and where behavior differs from the TypeScript client."
---

# iThink Logistics guide

`IthinkClient` exposes the iThink Logistics API v3 operations that are clearly
documented by iThink.

## Supported operations

- Order creation
- Order cancellation (single and bulk)
- Tracking by AWB
- Pincode serviceability per courier
- Courier rate comparison
- Shipment label generation
- Manifest generation

## Not implemented

- Dedicated pickup requests (iThink ties pickups to `pickup_address_id` on the order)
- Warehouse creation and listing
- Order details and order count
- Get airwaybill
- Invoice generation
- NDR actions
- Remittance and store endpoints
- Webhook setup
- Automatic provider routing or fallback logic

Those endpoints exist in iThink's API, but they are not part of the current SDK
surface because the repository does not yet model them as first-class resources.

## Example flow

1. Check pincode serviceability
2. Compare courier rates
3. Create the order with a `pickup_address_id`
4. Generate the label and manifest
5. Track the AWB
