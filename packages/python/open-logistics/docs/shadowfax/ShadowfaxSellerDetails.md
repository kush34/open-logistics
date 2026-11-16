# ShadowfaxSellerDetails


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**seller_name** | **str** |  | [optional] 
**seller_address** | **str** |  | [optional] 
**seller_state** | **str** |  | [optional] 
**gstin_number** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_seller_details import ShadowfaxSellerDetails

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxSellerDetails from a JSON string
shadowfax_seller_details_instance = ShadowfaxSellerDetails.from_json(json)
# print the JSON string representation of the object
print(shadowfax_seller_details_instance.to_json())

# convert the object into a dict
shadowfax_seller_details_dict = shadowfax_seller_details_instance.to_dict()
# create an instance of ShadowfaxSellerDetails from a dict
shadowfax_seller_details_from_dict = ShadowfaxSellerDetails.from_dict(shadowfax_seller_details_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


