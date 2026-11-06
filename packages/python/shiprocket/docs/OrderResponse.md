# OrderResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**order_id** | **int** |  | 
**shipment_id** | **int** |  | 
**status** | **str** |  | 
**status_code** | **int** |  | 
**onboarding_completed_now** | **bool** |  | 
**awb_code** | **str** |  | [optional] 
**courier_company_id** | **int** |  | [optional] 
**courier_name** | **str** |  | [optional] 

## Example

```python
from open_logistics_shiprocket.models.order_response import OrderResponse

# TODO update the JSON string below
json = "{}"
# create an instance of OrderResponse from a JSON string
order_response_instance = OrderResponse.from_json(json)
# print the JSON string representation of the object
print(order_response_instance.to_json())

# convert the object into a dict
order_response_dict = order_response_instance.to_dict()
# create an instance of OrderResponse from a dict
order_response_from_dict = OrderResponse.from_dict(order_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


