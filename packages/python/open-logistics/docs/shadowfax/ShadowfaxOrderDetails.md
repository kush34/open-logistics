# ShadowfaxOrderDetails


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | [optional] 
**client_name** | **str** |  | [optional] 
**client_order_id** | **str** |  | [optional] 
**awb_number** | **str** |  | [optional] 
**product_value** | **float** |  | [optional] 
**cod_amount** | **float** |  | [optional] 
**payment_mode** | **str** |  | [optional] 
**order_date** | **str** |  | [optional] 
**promised_delivery_date** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**status_display** | **str** |  | [optional] 
**pickup_details** | **Dict[str, object]** |  | [optional] 
**delivery_details** | **Dict[str, object]** |  | [optional] 
**product_details** | **List[Dict[str, object]]** |  | [optional] 
**eway_bill_number** | **str** |  | [optional] 
**sort_code** | **str** |  | [optional] 
**invoice_date** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_order_details import ShadowfaxOrderDetails

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxOrderDetails from a JSON string
shadowfax_order_details_instance = ShadowfaxOrderDetails.from_json(json)
# print the JSON string representation of the object
print(shadowfax_order_details_instance.to_json())

# convert the object into a dict
shadowfax_order_details_dict = shadowfax_order_details_instance.to_dict()
# create an instance of ShadowfaxOrderDetails from a dict
shadowfax_order_details_from_dict = ShadowfaxOrderDetails.from_dict(shadowfax_order_details_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


