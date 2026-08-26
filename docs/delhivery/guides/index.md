# Delhivery guide

`DelhiveryClient` exposes the Delhivery B2C operations that are clearly documented in Delhivery’s API.

## Supported operations

- Order / shipment creation
- Shipment edit
- Shipment cancellation
- Tracking by waybill
- Tracking by order reference
- Pincode serviceability
- Invoice-based shipping rate calculation
- Packing slip / label generation
- Pickup request creation
- Waybill fetch

## Not implemented

- Warehouse creation
- NDR actions
- Webhook setup
- Provider routing or fallback logic

Those endpoints exist in Delhivery’s ecosystem, but they are not part of the current SDK surface because the repository does not yet model them as first-class resources.

## Example flow

1. Check serviceability
2. Create or fetch a waybill
3. Manifest the shipment
4. Generate the label
5. Create a pickup request
6. Track the shipment
