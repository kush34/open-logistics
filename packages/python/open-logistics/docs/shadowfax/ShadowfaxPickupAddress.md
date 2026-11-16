# ShadowfaxPickupAddress


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**pickup_type** | **str** |  | 
**address_line_1** | **str** |  | 
**city** | **str** |  | 
**pincode** | **str** |  | 
**name** | **str** |  | [optional] 
**contact** | **str** |  | [optional] 
**address_line_2** | **str** |  | [optional] 
**pickup_slot** | **str** |  | [optional] 
**pickup_date** | **str** |  | [optional] 
**latitude** | **str** |  | [optional] 
**longitude** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_pickup_address import ShadowfaxPickupAddress

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxPickupAddress from a JSON string
shadowfax_pickup_address_instance = ShadowfaxPickupAddress.from_json(json)
# print the JSON string representation of the object
print(shadowfax_pickup_address_instance.to_json())

# convert the object into a dict
shadowfax_pickup_address_dict = shadowfax_pickup_address_instance.to_dict()
# create an instance of ShadowfaxPickupAddress from a dict
shadowfax_pickup_address_from_dict = ShadowfaxPickupAddress.from_dict(shadowfax_pickup_address_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


