# IthinkServiceabilityRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**IthinkServiceabilityRequestData**](IthinkServiceabilityRequestData.md) |  | 

## Example

```python
from open_logistics.ithink.models.ithink_serviceability_request import IthinkServiceabilityRequest

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkServiceabilityRequest from a JSON string
ithink_serviceability_request_instance = IthinkServiceabilityRequest.from_json(json)
# print the JSON string representation of the object
print(ithink_serviceability_request_instance.to_json())

# convert the object into a dict
ithink_serviceability_request_dict = ithink_serviceability_request_instance.to_dict()
# create an instance of IthinkServiceabilityRequest from a dict
ithink_serviceability_request_from_dict = IthinkServiceabilityRequest.from_dict(ithink_serviceability_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


