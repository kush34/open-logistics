# ShadowfaxReturnAddress


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**return_type** | **str** |  | 
**address_line_1** | **str** |  | 
**pincode** | **str** |  | 
**name** | **str** |  | [optional] 
**contact** | **str** |  | [optional] 
**city** | **str** |  | [optional] 
**email** | **str** |  | [optional] 
**latitude** | **str** |  | [optional] 
**longitude** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_return_address import ShadowfaxReturnAddress

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxReturnAddress from a JSON string
shadowfax_return_address_instance = ShadowfaxReturnAddress.from_json(json)
# print the JSON string representation of the object
print(shadowfax_return_address_instance.to_json())

# convert the object into a dict
shadowfax_return_address_dict = shadowfax_return_address_instance.to_dict()
# create an instance of ShadowfaxReturnAddress from a dict
shadowfax_return_address_from_dict = ShadowfaxReturnAddress.from_dict(shadowfax_return_address_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


