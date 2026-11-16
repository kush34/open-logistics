# IthinkShipmentPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**order** | **str** |  | 
**waybill** | **str** |  | [optional] 
**sub_order** | **str** |  | [optional] 
**order_date** | **str** |  | 
**total_amount** | **float** |  | 
**name** | **str** |  | 
**company_name** | **str** |  | [optional] 
**add** | **str** |  | 
**add2** | **str** |  | [optional] 
**add3** | **str** |  | [optional] 
**pin** | **str** |  | 
**city** | **str** |  | [optional] 
**state** | **str** |  | [optional] 
**country** | **str** |  | [optional] 
**phone** | **str** |  | 
**alt_phone** | **str** |  | [optional] 
**email** | **str** |  | [optional] 
**is_billing_same_as_shipping** | **str** |  | [optional] 
**billing_name** | **str** |  | 
**billing_company_name** | **str** |  | [optional] 
**billing_add** | **str** |  | 
**billing_add2** | **str** |  | [optional] 
**billing_add3** | **str** |  | [optional] 
**billing_pin** | **str** |  | 
**billing_city** | **str** |  | [optional] 
**billing_state** | **str** |  | [optional] 
**billing_country** | **str** |  | [optional] 
**billing_phone** | **str** |  | 
**billing_alt_phone** | **str** |  | [optional] 
**billing_email** | **str** |  | [optional] 
**products** | [**List[IthinkProduct]**](IthinkProduct.md) |  | 
**shipment_length** | **float** |  | 
**shipment_width** | **float** |  | 
**shipment_height** | **float** |  | 
**weight** | **float** |  | 
**shipping_charges** | **float** |  | [optional] 
**giftwrap_charges** | **float** |  | [optional] 
**transaction_charges** | **float** |  | [optional] 
**total_discount** | **float** |  | [optional] 
**first_attemp_discount** | **float** |  | [optional] 
**cod_charges** | **float** |  | [optional] 
**advance_amount** | **float** |  | [optional] 
**cod_amount** | **float** |  | [optional] 
**payment_mode** | **str** |  | [optional] 
**reseller_name** | **str** |  | [optional] 
**eway_bill_number** | **str** |  | [optional] 
**gst_number** | **str** |  | [optional] 
**what3words** | **str** |  | [optional] 
**return_address_id** | **str** |  | 
**api_source** | **str** |  | [optional] 
**store_id** | **str** |  | [optional] 

## Example

```python
from open_logistics.ithink.models.ithink_shipment_payload import IthinkShipmentPayload

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkShipmentPayload from a JSON string
ithink_shipment_payload_instance = IthinkShipmentPayload.from_json(json)
# print the JSON string representation of the object
print(ithink_shipment_payload_instance.to_json())

# convert the object into a dict
ithink_shipment_payload_dict = ithink_shipment_payload_instance.to_dict()
# create an instance of IthinkShipmentPayload from a dict
ithink_shipment_payload_from_dict = IthinkShipmentPayload.from_dict(ithink_shipment_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


