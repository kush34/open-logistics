# ShadowfaxBulkTrackingPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**awb_numbers** | **List[str]** |  | 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_bulk_tracking_payload import ShadowfaxBulkTrackingPayload

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxBulkTrackingPayload from a JSON string
shadowfax_bulk_tracking_payload_instance = ShadowfaxBulkTrackingPayload.from_json(json)
# print the JSON string representation of the object
print(shadowfax_bulk_tracking_payload_instance.to_json())

# convert the object into a dict
shadowfax_bulk_tracking_payload_dict = shadowfax_bulk_tracking_payload_instance.to_dict()
# create an instance of ShadowfaxBulkTrackingPayload from a dict
shadowfax_bulk_tracking_payload_from_dict = ShadowfaxBulkTrackingPayload.from_dict(shadowfax_bulk_tracking_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


