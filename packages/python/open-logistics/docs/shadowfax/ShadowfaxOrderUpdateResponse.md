# ShadowfaxOrderUpdateResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**response_msg** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_order_update_response import ShadowfaxOrderUpdateResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxOrderUpdateResponse from a JSON string
shadowfax_order_update_response_instance = ShadowfaxOrderUpdateResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_order_update_response_instance.to_json())

# convert the object into a dict
shadowfax_order_update_response_dict = shadowfax_order_update_response_instance.to_dict()
# create an instance of ShadowfaxOrderUpdateResponse from a dict
shadowfax_order_update_response_from_dict = ShadowfaxOrderUpdateResponse.from_dict(shadowfax_order_update_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


