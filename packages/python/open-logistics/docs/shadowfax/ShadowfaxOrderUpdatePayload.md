# ShadowfaxOrderUpdatePayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**awb_number** | **str** |  | 
**delivery_details** | **Dict[str, object]** |  | [optional] 
**pickup_details** | **Dict[str, object]** |  | [optional] 
**return_details** | **Dict[str, object]** |  | [optional] 
**order_details** | **Dict[str, object]** |  | [optional] 
**status_update** | [**ShadowfaxStatusUpdate**](ShadowfaxStatusUpdate.md) |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_order_update_payload import ShadowfaxOrderUpdatePayload

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxOrderUpdatePayload from a JSON string
shadowfax_order_update_payload_instance = ShadowfaxOrderUpdatePayload.from_json(json)
# print the JSON string representation of the object
print(shadowfax_order_update_payload_instance.to_json())

# convert the object into a dict
shadowfax_order_update_payload_dict = shadowfax_order_update_payload_instance.to_dict()
# create an instance of ShadowfaxOrderUpdatePayload from a dict
shadowfax_order_update_payload_from_dict = ShadowfaxOrderUpdatePayload.from_dict(shadowfax_order_update_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


