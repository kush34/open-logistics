# DelhiveryPostalCodeServiceability


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**city** | **str** |  | [optional] 
**cod** | **str** |  | [optional] 
**inc** | **str** |  | [optional] 
**district** | **str** |  | [optional] 
**pin** | **int** |  | [optional] 
**max_amount** | **float** |  | [optional] 
**pre_paid** | **str** |  | [optional] 
**cash** | **str** |  | [optional] 
**state_code** | **str** |  | [optional] 
**max_weight** | **float** |  | [optional] 
**pickup** | **str** |  | [optional] 
**repl** | **str** |  | [optional] 
**covid_zone** | **str** |  | [optional] 
**country_code** | **str** |  | [optional] 
**is_oda** | **str** |  | [optional] 
**remarks** | **str** |  | [optional] 

## Example

```python
from open_logistics_delhivery.models.delhivery_postal_code_serviceability import DelhiveryPostalCodeServiceability

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryPostalCodeServiceability from a JSON string
delhivery_postal_code_serviceability_instance = DelhiveryPostalCodeServiceability.from_json(json)
# print the JSON string representation of the object
print(DelhiveryPostalCodeServiceability.to_json())

# convert the object into a dict
delhivery_postal_code_serviceability_dict = delhivery_postal_code_serviceability_instance.to_dict()
# create an instance of DelhiveryPostalCodeServiceability from a dict
delhivery_postal_code_serviceability_from_dict = DelhiveryPostalCodeServiceability.from_dict(delhivery_postal_code_serviceability_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


