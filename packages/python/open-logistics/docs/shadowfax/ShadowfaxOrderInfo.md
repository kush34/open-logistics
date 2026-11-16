# ShadowfaxOrderInfo


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**client_order_id** | **str** |  | 
**product_value** | **float** |  | 
**payment_mode** | **str** |  | 
**cod_amount** | **float** |  | 
**awb_number** | **str** |  | [optional] 
**actual_weight** | **float** |  | [optional] 
**volumetric_weight** | **float** |  | [optional] 
**promised_delivery_date** | **str** |  | [optional] 
**total_amount** | **float** |  | [optional] 
**eway_bill** | **str** |  | [optional] 
**order_service** | **str** |  | [optional] 
**shopify_order_id** | **str** |  | [optional] 
**woocommerce_order_id** | **str** |  | [optional] 
**fulfillment_order_id** | **str** |  | [optional] 
**order_identifier** | **str** |  | [optional] 
**delivery_instructions** | **Dict[str, object]** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_order_info import ShadowfaxOrderInfo

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxOrderInfo from a JSON string
shadowfax_order_info_instance = ShadowfaxOrderInfo.from_json(json)
# print the JSON string representation of the object
print(shadowfax_order_info_instance.to_json())

# convert the object into a dict
shadowfax_order_info_dict = shadowfax_order_info_instance.to_dict()
# create an instance of ShadowfaxOrderInfo from a dict
shadowfax_order_info_from_dict = ShadowfaxOrderInfo.from_dict(shadowfax_order_info_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


