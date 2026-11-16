# IthinkServiceabilityResponse

Raw `POST /api_v3/pincode/check.json` response. `data` is keyed by pincode, then by courier. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **str** |  | [optional] 
**status_code** | **object** | Integer or numeric string; the provider sends both. | [optional] 
**message** | **str** |  | [optional] 
**data** | **Dict[str, Dict[str, Dict[str, object]]]** |  | [optional] 

## Example

```python
from open_logistics.ithink.models.ithink_serviceability_response import IthinkServiceabilityResponse

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkServiceabilityResponse from a JSON string
ithink_serviceability_response_instance = IthinkServiceabilityResponse.from_json(json)
# print the JSON string representation of the object
print(ithink_serviceability_response_instance.to_json())

# convert the object into a dict
ithink_serviceability_response_dict = ithink_serviceability_response_instance.to_dict()
# create an instance of IthinkServiceabilityResponse from a dict
ithink_serviceability_response_from_dict = IthinkServiceabilityResponse.from_dict(ithink_serviceability_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


