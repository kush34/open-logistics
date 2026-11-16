# ShadowfaxCustomerDetails


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**contact** | **str** |  | 
**address_line_1** | **str** |  | 
**city** | **str** |  | 
**pincode** | **str** |  | 
**address2** | **str** |  | [optional] 
**alternate_contact** | **str** |  | [optional] 
**state** | **str** |  | [optional] 
**latitude** | **str** |  | [optional] 
**longitude** | **str** |  | [optional] 
**location_accuracy** | **str** |  | [optional] 
**location_type** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_customer_details import ShadowfaxCustomerDetails

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxCustomerDetails from a JSON string
shadowfax_customer_details_instance = ShadowfaxCustomerDetails.from_json(json)
# print the JSON string representation of the object
print(shadowfax_customer_details_instance.to_json())

# convert the object into a dict
shadowfax_customer_details_dict = shadowfax_customer_details_instance.to_dict()
# create an instance of ShadowfaxCustomerDetails from a dict
shadowfax_customer_details_from_dict = ShadowfaxCustomerDetails.from_dict(shadowfax_customer_details_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


