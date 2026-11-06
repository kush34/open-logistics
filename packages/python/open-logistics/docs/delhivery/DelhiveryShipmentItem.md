# DelhiveryShipmentItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 
**quantity** | **int** |  | [optional] 
**sku** | **str** |  | [optional] 
**price** | **float** |  | [optional] 
**hsn_code** | **str** |  | [optional] 

## Example

```python
from open_logistics.delhivery.models.delhivery_shipment_item import DelhiveryShipmentItem

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryShipmentItem from a JSON string
delhivery_shipment_item_instance = DelhiveryShipmentItem.from_json(json)
# print the JSON string representation of the object
print(delhivery_shipment_item_instance.to_json())

# convert the object into a dict
delhivery_shipment_item_dict = delhivery_shipment_item_instance.to_dict()
# create an instance of DelhiveryShipmentItem from a dict
delhivery_shipment_item_from_dict = DelhiveryShipmentItem.from_dict(delhivery_shipment_item_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


