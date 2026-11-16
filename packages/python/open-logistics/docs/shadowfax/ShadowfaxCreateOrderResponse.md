# ShadowfaxCreateOrderResponse

Raw `POST /v3/clients/orders/` response.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**awb_number** | **str** |  | [optional] 
**client_order_id** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**status_display** | **str** |  | [optional] 
**data** | [**ShadowfaxOrderDetails**](ShadowfaxOrderDetails.md) |  | [optional] 
**errors** | **object** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_create_order_response import ShadowfaxCreateOrderResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxCreateOrderResponse from a JSON string
shadowfax_create_order_response_instance = ShadowfaxCreateOrderResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_create_order_response_instance.to_json())

# convert the object into a dict
shadowfax_create_order_response_dict = shadowfax_create_order_response_instance.to_dict()
# create an instance of ShadowfaxCreateOrderResponse from a dict
shadowfax_create_order_response_from_dict = ShadowfaxCreateOrderResponse.from_dict(shadowfax_create_order_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


