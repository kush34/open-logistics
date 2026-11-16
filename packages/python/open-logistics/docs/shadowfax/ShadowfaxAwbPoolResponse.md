# ShadowfaxAwbPoolResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**awb_numbers** | **List[str]** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_awb_pool_response import ShadowfaxAwbPoolResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxAwbPoolResponse from a JSON string
shadowfax_awb_pool_response_instance = ShadowfaxAwbPoolResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_awb_pool_response_instance.to_json())

# convert the object into a dict
shadowfax_awb_pool_response_dict = shadowfax_awb_pool_response_instance.to_dict()
# create an instance of ShadowfaxAwbPoolResponse from a dict
shadowfax_awb_pool_response_from_dict = ShadowfaxAwbPoolResponse.from_dict(shadowfax_awb_pool_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


