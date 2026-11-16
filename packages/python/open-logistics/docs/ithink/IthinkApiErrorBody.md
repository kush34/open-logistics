# IthinkApiErrorBody


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**error** | **str** |  | [optional] 
**detail** | **str** |  | [optional] 
**html_message** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**status_code** | **object** | Integer or numeric string; the provider sends both. | [optional] 

## Example

```python
from open_logistics.ithink.models.ithink_api_error_body import IthinkApiErrorBody

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkApiErrorBody from a JSON string
ithink_api_error_body_instance = IthinkApiErrorBody.from_json(json)
# print the JSON string representation of the object
print(ithink_api_error_body_instance.to_json())

# convert the object into a dict
ithink_api_error_body_dict = ithink_api_error_body_instance.to_dict()
# create an instance of IthinkApiErrorBody from a dict
ithink_api_error_body_from_dict = IthinkApiErrorBody.from_dict(ithink_api_error_body_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


