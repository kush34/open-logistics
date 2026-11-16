# ShadowfaxAwbRequestResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **str** |  | [optional] 
**request_id** | **object** | Integer or numeric string; the provider sends both. | [optional] 
**message** | **str** |  | [optional] 
**delay_time** | **object** | Number or numeric string; the provider sends both. | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_awb_request_response import ShadowfaxAwbRequestResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxAwbRequestResponse from a JSON string
shadowfax_awb_request_response_instance = ShadowfaxAwbRequestResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_awb_request_response_instance.to_json())

# convert the object into a dict
shadowfax_awb_request_response_dict = shadowfax_awb_request_response_instance.to_dict()
# create an instance of ShadowfaxAwbRequestResponse from a dict
shadowfax_awb_request_response_from_dict = ShadowfaxAwbRequestResponse.from_dict(shadowfax_awb_request_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


