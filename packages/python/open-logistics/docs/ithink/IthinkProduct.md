# IthinkProduct


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**product_name** | **str** |  | 
**product_sku** | **str** |  | [optional] 
**product_quantity** | **int** |  | 
**product_price** | **float** |  | 
**product_tax_rate** | **float** |  | [optional] 
**product_hsn_code** | **str** |  | [optional] 
**product_discount** | **float** |  | [optional] 
**product_img_url** | **str** |  | [optional] 

## Example

```python
from open_logistics.ithink.models.ithink_product import IthinkProduct

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkProduct from a JSON string
ithink_product_instance = IthinkProduct.from_json(json)
# print the JSON string representation of the object
print(ithink_product_instance.to_json())

# convert the object into a dict
ithink_product_dict = ithink_product_instance.to_dict()
# create an instance of IthinkProduct from a dict
ithink_product_from_dict = IthinkProduct.from_dict(ithink_product_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


