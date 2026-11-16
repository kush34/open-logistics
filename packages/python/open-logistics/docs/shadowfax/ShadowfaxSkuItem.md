# ShadowfaxSkuItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sku_name** | **str** |  | 
**sku_id** | **str** |  | 
**price** | **float** |  | 
**category** | **str** |  | [optional] 
**hsn_code** | **str** |  | [optional] 
**invoice_no** | **str** |  | [optional] 
**brand** | **str** |  | [optional] 
**seller_details** | [**ShadowfaxSellerDetails**](ShadowfaxSellerDetails.md) |  | [optional] 
**taxes** | [**ShadowfaxSkuTaxes**](ShadowfaxSkuTaxes.md) |  | [optional] 
**additional_details** | [**ShadowfaxSkuAdditionalDetails**](ShadowfaxSkuAdditionalDetails.md) |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_sku_item import ShadowfaxSkuItem

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxSkuItem from a JSON string
shadowfax_sku_item_instance = ShadowfaxSkuItem.from_json(json)
# print the JSON string representation of the object
print(shadowfax_sku_item_instance.to_json())

# convert the object into a dict
shadowfax_sku_item_dict = shadowfax_sku_item_instance.to_dict()
# create an instance of ShadowfaxSkuItem from a dict
shadowfax_sku_item_from_dict = ShadowfaxSkuItem.from_dict(shadowfax_sku_item_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


