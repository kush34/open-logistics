# ShadowfaxAwbResultResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**awb_numbers** | **List[str]** |  | [optional] 
**status** | **str** |  | [optional] 
**retry_flag** | **bool** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_awb_result_response import ShadowfaxAwbResultResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxAwbResultResponse from a JSON string
shadowfax_awb_result_response_instance = ShadowfaxAwbResultResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_awb_result_response_instance.to_json())

# convert the object into a dict
shadowfax_awb_result_response_dict = shadowfax_awb_result_response_instance.to_dict()
# create an instance of ShadowfaxAwbResultResponse from a dict
shadowfax_awb_result_response_from_dict = ShadowfaxAwbResultResponse.from_dict(shadowfax_awb_result_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


