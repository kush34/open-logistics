# DelhiveryRateResponseInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total_amount** | **float** |  | [optional] 
**gross_amount** | **float** |  | [optional] 
**zone** | **str** |  | [optional] 
**charged_weight** | **float** |  | [optional] 
**tax_data** | **Dict[str, object]** |  | [optional] 

## Example

```python
from open_logistics.delhivery.models.delhivery_rate_response_inner import DelhiveryRateResponseInner

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryRateResponseInner from a JSON string
delhivery_rate_response_inner_instance = DelhiveryRateResponseInner.from_json(json)
# print the JSON string representation of the object
print(delhivery_rate_response_inner_instance.to_json())

# convert the object into a dict
delhivery_rate_response_inner_dict = delhivery_rate_response_inner_instance.to_dict()
# create an instance of DelhiveryRateResponseInner from a dict
delhivery_rate_response_inner_from_dict = DelhiveryRateResponseInner.from_dict(delhivery_rate_response_inner_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


