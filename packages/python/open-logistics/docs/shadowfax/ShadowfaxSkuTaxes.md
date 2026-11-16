# ShadowfaxSkuTaxes


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cgst_amount** | **float** |  | [optional] 
**sgst_amount** | **float** |  | [optional] 
**igst_amount** | **float** |  | [optional] 
**total_tax_value** | **float** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_sku_taxes import ShadowfaxSkuTaxes

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxSkuTaxes from a JSON string
shadowfax_sku_taxes_instance = ShadowfaxSkuTaxes.from_json(json)
# print the JSON string representation of the object
print(shadowfax_sku_taxes_instance.to_json())

# convert the object into a dict
shadowfax_sku_taxes_dict = shadowfax_sku_taxes_instance.to_dict()
# create an instance of ShadowfaxSkuTaxes from a dict
shadowfax_sku_taxes_from_dict = ShadowfaxSkuTaxes.from_dict(shadowfax_sku_taxes_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


