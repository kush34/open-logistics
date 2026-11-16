# ShadowfaxServiceabilityPincode


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **object** | Integer or numeric string; the provider sends both. | [optional] 
**services** | **List[str]** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_serviceability_pincode import ShadowfaxServiceabilityPincode

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxServiceabilityPincode from a JSON string
shadowfax_serviceability_pincode_instance = ShadowfaxServiceabilityPincode.from_json(json)
# print the JSON string representation of the object
print(shadowfax_serviceability_pincode_instance.to_json())

# convert the object into a dict
shadowfax_serviceability_pincode_dict = shadowfax_serviceability_pincode_instance.to_dict()
# create an instance of ShadowfaxServiceabilityPincode from a dict
shadowfax_serviceability_pincode_from_dict = ShadowfaxServiceabilityPincode.from_dict(shadowfax_serviceability_pincode_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


