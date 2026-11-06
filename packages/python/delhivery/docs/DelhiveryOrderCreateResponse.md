# DelhiveryOrderCreateResponse

Raw `POST /api/cmu/create.json` response.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**success** | **bool** |  | [optional] 
**rmk** | **str** |  | [optional] 
**upload_wbn** | **str** |  | [optional] 
**message** | **str** |  | [optional] 
**order_id** | **str** |  | [optional] 
**waybill** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**shipment_id** | **str** |  | [optional] 
**packages** | **List[Dict[str, object]]** |  | [optional] 

## Example

```python
from open_logistics_delhivery.models.delhivery_order_create_response import DelhiveryOrderCreateResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryOrderCreateResponse from a JSON string
delhivery_order_create_response_instance = DelhiveryOrderCreateResponse.from_json(json)
# print the JSON string representation of the object
print(DelhiveryOrderCreateResponse.to_json())

# convert the object into a dict
delhivery_order_create_response_dict = delhivery_order_create_response_instance.to_dict()
# create an instance of DelhiveryOrderCreateResponse from a dict
delhivery_order_create_response_from_dict = DelhiveryOrderCreateResponse.from_dict(delhivery_order_create_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


