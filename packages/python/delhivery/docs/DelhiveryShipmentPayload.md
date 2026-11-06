# DelhiveryShipmentPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**order_id** | **str** |  | 
**waybill** | **str** |  | [optional] 
**order_date** | **str** |  | [optional] 
**client** | **str** |  | [optional] 
**pickup_location** | [**DelhiveryPickupLocation**](DelhiveryPickupLocation.md) |  | 
**package_type** | **str** |  | 
**payment_mode** | **str** |  | [optional] 
**cod_amount** | **float** |  | [optional] 
**name** | **str** |  | 
**add** | **str** |  | [optional] 
**address** | **str** |  | [optional] 
**phone** | **str** |  | 
**pin** | **str** |  | 
**city** | **str** |  | [optional] 
**state** | **str** |  | [optional] 
**country** | **str** |  | [optional] 
**products_desc** | **str** |  | [optional] 
**product_details** | **str** |  | [optional] 
**shipment_length** | **float** |  | [optional] 
**shipment_width** | **float** |  | [optional] 
**shipment_height** | **float** |  | [optional] 
**gm** | **float** |  | [optional] 
**weight** | **float** |  | [optional] 
**fragile_shipment** | **bool** |  | [optional] 
**ewaybill** | **str** |  | [optional] 
**seller_gst_tin** | **str** |  | [optional] 
**client_gst_tin** | **str** |  | [optional] 
**consignee_gst_tin** | **str** |  | [optional] 
**hsn_code** | [**DelhiveryApiErrorBodyErrorsValue**](DelhiveryApiErrorBodyErrorsValue.md) |  | [optional] 
**invoice_reference** | **str** |  | [optional] 
**qc** | [**DelhiveryShipmentPayloadQc**](DelhiveryShipmentPayloadQc.md) |  | [optional] 
**shipment** | [**List[DelhiveryShipmentItem]**](DelhiveryShipmentItem.md) |  | [optional] 

## Example

```python
from open_logistics_delhivery.models.delhivery_shipment_payload import DelhiveryShipmentPayload

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryShipmentPayload from a JSON string
delhivery_shipment_payload_instance = DelhiveryShipmentPayload.from_json(json)
# print the JSON string representation of the object
print(DelhiveryShipmentPayload.to_json())

# convert the object into a dict
delhivery_shipment_payload_dict = delhivery_shipment_payload_instance.to_dict()
# create an instance of DelhiveryShipmentPayload from a dict
delhivery_shipment_payload_from_dict = DelhiveryShipmentPayload.from_dict(delhivery_shipment_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


