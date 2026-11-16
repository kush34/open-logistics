# ShadowfaxBulkTrackingResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[ShadowfaxTrackingResponse]**](ShadowfaxTrackingResponse.md) |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_bulk_tracking_response import ShadowfaxBulkTrackingResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxBulkTrackingResponse from a JSON string
shadowfax_bulk_tracking_response_instance = ShadowfaxBulkTrackingResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_bulk_tracking_response_instance.to_json())

# convert the object into a dict
shadowfax_bulk_tracking_response_dict = shadowfax_bulk_tracking_response_instance.to_dict()
# create an instance of ShadowfaxBulkTrackingResponse from a dict
shadowfax_bulk_tracking_response_from_dict = ShadowfaxBulkTrackingResponse.from_dict(shadowfax_bulk_tracking_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


