# IthinkOrderCancelRequestData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**access_token** | **str** |  | 
**secret_key** | **str** |  | 
**awb_numbers** | **str** | Comma-separated waybills, up to 100. | 

## Example

```python
from open_logistics.ithink.models.ithink_order_cancel_request_data import IthinkOrderCancelRequestData

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkOrderCancelRequestData from a JSON string
ithink_order_cancel_request_data_instance = IthinkOrderCancelRequestData.from_json(json)
# print the JSON string representation of the object
print(ithink_order_cancel_request_data_instance.to_json())

# convert the object into a dict
ithink_order_cancel_request_data_dict = ithink_order_cancel_request_data_instance.to_dict()
# create an instance of IthinkOrderCancelRequestData from a dict
ithink_order_cancel_request_data_from_dict = IthinkOrderCancelRequestData.from_dict(ithink_order_cancel_request_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


