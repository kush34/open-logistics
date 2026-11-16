# IthinkServiceabilityRequestData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**access_token** | **str** |  | 
**secret_key** | **str** |  | 
**pincode** | **str** |  | 

## Example

```python
from open_logistics.ithink.models.ithink_serviceability_request_data import IthinkServiceabilityRequestData

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkServiceabilityRequestData from a JSON string
ithink_serviceability_request_data_instance = IthinkServiceabilityRequestData.from_json(json)
# print the JSON string representation of the object
print(ithink_serviceability_request_data_instance.to_json())

# convert the object into a dict
ithink_serviceability_request_data_dict = ithink_serviceability_request_data_instance.to_dict()
# create an instance of IthinkServiceabilityRequestData from a dict
ithink_serviceability_request_data_from_dict = IthinkServiceabilityRequestData.from_dict(ithink_serviceability_request_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


