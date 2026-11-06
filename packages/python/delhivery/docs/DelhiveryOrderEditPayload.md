# DelhiveryOrderEditPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**waybill** | **str** |  | 
**cancellation** | **bool** | Set to true to cancel the shipment. | [optional] 
**shipment_length** | **float** |  | [optional] 
**shipment_width** | **float** |  | [optional] 
**shipment_height** | **float** |  | [optional] 
**cod** | **float** |  | [optional] 
**gm** | **float** |  | [optional] 
**name** | **str** |  | [optional] 
**add** | **str** |  | [optional] 
**phone** | **str** |  | [optional] 
**product_details** | **str** |  | [optional] 
**pt** | **str** |  | [optional] 

## Example

```python
from open_logistics_delhivery.models.delhivery_order_edit_payload import DelhiveryOrderEditPayload

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryOrderEditPayload from a JSON string
delhivery_order_edit_payload_instance = DelhiveryOrderEditPayload.from_json(json)
# print the JSON string representation of the object
print(delhivery_order_edit_payload_instance.to_json())

# convert the object into a dict
delhivery_order_edit_payload_dict = delhivery_order_edit_payload_instance.to_dict()
# create an instance of DelhiveryOrderEditPayload from a dict
delhivery_order_edit_payload_from_dict = DelhiveryOrderEditPayload.from_dict(delhivery_order_edit_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


