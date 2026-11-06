# DelhiveryOrderEditResponse

Raw `POST /api/p/edit` response.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**success** | **bool** |  | [optional] 
**status** | **str** |  | [optional] 
**message** | **str** |  | [optional] 
**waybill** | **str** |  | [optional] 

## Example

```python
from open_logistics_delhivery.models.delhivery_order_edit_response import DelhiveryOrderEditResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryOrderEditResponse from a JSON string
delhivery_order_edit_response_instance = DelhiveryOrderEditResponse.from_json(json)
# print the JSON string representation of the object
print(delhivery_order_edit_response_instance.to_json())

# convert the object into a dict
delhivery_order_edit_response_dict = delhivery_order_edit_response_instance.to_dict()
# create an instance of DelhiveryOrderEditResponse from a dict
delhivery_order_edit_response_from_dict = DelhiveryOrderEditResponse.from_dict(delhivery_order_edit_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


