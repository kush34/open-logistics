# IthinkTrackingRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**IthinkTrackingRequestData**](IthinkTrackingRequestData.md) |  | 

## Example

```python
from open_logistics.ithink.models.ithink_tracking_request import IthinkTrackingRequest

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkTrackingRequest from a JSON string
ithink_tracking_request_instance = IthinkTrackingRequest.from_json(json)
# print the JSON string representation of the object
print(ithink_tracking_request_instance.to_json())

# convert the object into a dict
ithink_tracking_request_dict = ithink_tracking_request_instance.to_dict()
# create an instance of IthinkTrackingRequest from a dict
ithink_tracking_request_from_dict = IthinkTrackingRequest.from_dict(ithink_tracking_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


