# IthinkTrackingRequestData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**access_token** | **str** |  | 
**secret_key** | **str** |  | 
**awb_number_list** | **str** | Comma-separated waybills, up to 10. | 

## Example

```python
from open_logistics.ithink.models.ithink_tracking_request_data import IthinkTrackingRequestData

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkTrackingRequestData from a JSON string
ithink_tracking_request_data_instance = IthinkTrackingRequestData.from_json(json)
# print the JSON string representation of the object
print(ithink_tracking_request_data_instance.to_json())

# convert the object into a dict
ithink_tracking_request_data_dict = ithink_tracking_request_data_instance.to_dict()
# create an instance of IthinkTrackingRequestData from a dict
ithink_tracking_request_data_from_dict = IthinkTrackingRequestData.from_dict(ithink_tracking_request_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


