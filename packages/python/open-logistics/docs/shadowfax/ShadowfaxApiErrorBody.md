# ShadowfaxApiErrorBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**error** | **str** |  | [optional] 
**detail** | **str** |  | [optional] 
**response_msg** | **str** |  | [optional] 
**response_code** | **object** | Integer or numeric string; the provider sends both. | [optional] 
**error_code** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**errors** | **object** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_api_error_body import ShadowfaxApiErrorBody

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxApiErrorBody from a JSON string
shadowfax_api_error_body_instance = ShadowfaxApiErrorBody.from_json(json)
# print the JSON string representation of the object
print(shadowfax_api_error_body_instance.to_json())

# convert the object into a dict
shadowfax_api_error_body_dict = shadowfax_api_error_body_instance.to_dict()
# create an instance of ShadowfaxApiErrorBody from a dict
shadowfax_api_error_body_from_dict = ShadowfaxApiErrorBody.from_dict(shadowfax_api_error_body_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


