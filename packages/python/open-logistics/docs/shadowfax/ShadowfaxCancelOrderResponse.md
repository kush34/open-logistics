# ShadowfaxCancelOrderResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**response_msg** | **str** |  | [optional] 
**response_code** | **object** | Integer or numeric string; the provider sends both. | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_cancel_order_response import ShadowfaxCancelOrderResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxCancelOrderResponse from a JSON string
shadowfax_cancel_order_response_instance = ShadowfaxCancelOrderResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_cancel_order_response_instance.to_json())

# convert the object into a dict
shadowfax_cancel_order_response_dict = shadowfax_cancel_order_response_instance.to_dict()
# create an instance of ShadowfaxCancelOrderResponse from a dict
shadowfax_cancel_order_response_from_dict = ShadowfaxCancelOrderResponse.from_dict(shadowfax_cancel_order_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


