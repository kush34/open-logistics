# IthinkTrackingResponse

Raw `POST /api_v3/order/track.json` response, keyed by AWB.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **str** |  | [optional] 
**status_code** | **object** | Integer or numeric string; the provider sends both. | [optional] 
**message** | **str** |  | [optional] 
**data** | **Dict[str, Dict[str, object]]** |  | [optional] 

## Example

```python
from open_logistics.ithink.models.ithink_tracking_response import IthinkTrackingResponse

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkTrackingResponse from a JSON string
ithink_tracking_response_instance = IthinkTrackingResponse.from_json(json)
# print the JSON string representation of the object
print(ithink_tracking_response_instance.to_json())

# convert the object into a dict
ithink_tracking_response_dict = ithink_tracking_response_instance.to_dict()
# create an instance of IthinkTrackingResponse from a dict
ithink_tracking_response_from_dict = IthinkTrackingResponse.from_dict(ithink_tracking_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


