# ShadowfaxCancelOrderPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**request_id** | **str** | AWB number or client order ID. | 
**cancel_remarks** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_cancel_order_payload import ShadowfaxCancelOrderPayload

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxCancelOrderPayload from a JSON string
shadowfax_cancel_order_payload_instance = ShadowfaxCancelOrderPayload.from_json(json)
# print the JSON string representation of the object
print(shadowfax_cancel_order_payload_instance.to_json())

# convert the object into a dict
shadowfax_cancel_order_payload_dict = shadowfax_cancel_order_payload_instance.to_dict()
# create an instance of ShadowfaxCancelOrderPayload from a dict
shadowfax_cancel_order_payload_from_dict = ShadowfaxCancelOrderPayload.from_dict(shadowfax_cancel_order_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


