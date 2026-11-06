# CancelOrdersPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ids** | **List[int]** |  | 

## Example

```python
from open_logistics.shiprocket.models.cancel_orders_payload import CancelOrdersPayload

# TODO update the JSON string below
json = "{}"
# create an instance of CancelOrdersPayload from a JSON string
cancel_orders_payload_instance = CancelOrdersPayload.from_json(json)
# print the JSON string representation of the object
print(cancel_orders_payload_instance.to_json())

# convert the object into a dict
cancel_orders_payload_dict = cancel_orders_payload_instance.to_dict()
# create an instance of CancelOrdersPayload from a dict
cancel_orders_payload_from_dict = CancelOrdersPayload.from_dict(cancel_orders_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


