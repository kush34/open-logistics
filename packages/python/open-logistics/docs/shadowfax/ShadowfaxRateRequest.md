# ShadowfaxRateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**origin_pincode** | **str** |  | 
**destination_pincode** | **str** |  | 
**service** | **str** |  | 
**weight** | **float** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_rate_request import ShadowfaxRateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxRateRequest from a JSON string
shadowfax_rate_request_instance = ShadowfaxRateRequest.from_json(json)
# print the JSON string representation of the object
print(shadowfax_rate_request_instance.to_json())

# convert the object into a dict
shadowfax_rate_request_dict = shadowfax_rate_request_instance.to_dict()
# create an instance of ShadowfaxRateRequest from a dict
shadowfax_rate_request_from_dict = ShadowfaxRateRequest.from_dict(shadowfax_rate_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


