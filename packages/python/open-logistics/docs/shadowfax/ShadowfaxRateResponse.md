# ShadowfaxRateResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**zone** | **str** |  | [optional] 
**shipping_rate** | **object** | Number or numeric string; the provider sends both. | [optional] 
**gst** | **object** | Number or numeric string; the provider sends both. | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_rate_response import ShadowfaxRateResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxRateResponse from a JSON string
shadowfax_rate_response_instance = ShadowfaxRateResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_rate_response_instance.to_json())

# convert the object into a dict
shadowfax_rate_response_dict = shadowfax_rate_response_instance.to_dict()
# create an instance of ShadowfaxRateResponse from a dict
shadowfax_rate_response_from_dict = ShadowfaxRateResponse.from_dict(shadowfax_rate_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


