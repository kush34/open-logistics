# ShadowfaxSkuAdditionalDetails


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**requires_extra_care** | **bool** |  | [optional] 
**type_extra_care** | **str** |  | [optional] 
**product_id** | **str** |  | [optional] 
**product_weight** | **str** |  | [optional] 
**quantity** | **int** |  | [optional] 
**mode** | **str** |  | [optional] 
**slot_type** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_sku_additional_details import ShadowfaxSkuAdditionalDetails

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxSkuAdditionalDetails from a JSON string
shadowfax_sku_additional_details_instance = ShadowfaxSkuAdditionalDetails.from_json(json)
# print the JSON string representation of the object
print(shadowfax_sku_additional_details_instance.to_json())

# convert the object into a dict
shadowfax_sku_additional_details_dict = shadowfax_sku_additional_details_instance.to_dict()
# create an instance of ShadowfaxSkuAdditionalDetails from a dict
shadowfax_sku_additional_details_from_dict = ShadowfaxSkuAdditionalDetails.from_dict(shadowfax_sku_additional_details_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


