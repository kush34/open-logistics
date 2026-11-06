# DelhiveryApiErrorBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**error** | **str** |  | [optional] 
**detail** | **str** |  | [optional] 
**status_code** | **int** |  | [optional] 
**errors** | [**Dict[str, DelhiveryApiErrorBodyErrorsValue]**](DelhiveryApiErrorBodyErrorsValue.md) |  | [optional] 

## Example

```python
from open_logistics_delhivery.models.delhivery_api_error_body import DelhiveryApiErrorBody

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryApiErrorBody from a JSON string
delhivery_api_error_body_instance = DelhiveryApiErrorBody.from_json(json)
# print the JSON string representation of the object
print(DelhiveryApiErrorBody.to_json())

# convert the object into a dict
delhivery_api_error_body_dict = delhivery_api_error_body_instance.to_dict()
# create an instance of DelhiveryApiErrorBody from a dict
delhivery_api_error_body_from_dict = DelhiveryApiErrorBody.from_dict(delhivery_api_error_body_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


