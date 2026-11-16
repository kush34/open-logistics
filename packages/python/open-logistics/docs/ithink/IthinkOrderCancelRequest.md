# IthinkOrderCancelRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**IthinkOrderCancelRequestData**](IthinkOrderCancelRequestData.md) |  | 

## Example

```python
from open_logistics.ithink.models.ithink_order_cancel_request import IthinkOrderCancelRequest

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkOrderCancelRequest from a JSON string
ithink_order_cancel_request_instance = IthinkOrderCancelRequest.from_json(json)
# print the JSON string representation of the object
print(ithink_order_cancel_request_instance.to_json())

# convert the object into a dict
ithink_order_cancel_request_dict = ithink_order_cancel_request_instance.to_dict()
# create an instance of IthinkOrderCancelRequest from a dict
ithink_order_cancel_request_from_dict = IthinkOrderCancelRequest.from_dict(ithink_order_cancel_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


