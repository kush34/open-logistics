# IthinkCancelResponse

Raw `POST /api_v3/order/cancel.json` response.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **str** |  | [optional] 
**status_code** | **object** | Integer or numeric string; the provider sends both. | [optional] 
**html_message** | **str** |  | [optional] 
**message** | **str** |  | [optional] 
**data** | **Dict[str, Dict[str, object]]** |  | [optional] 

## Example

```python
from open_logistics.ithink.models.ithink_cancel_response import IthinkCancelResponse

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkCancelResponse from a JSON string
ithink_cancel_response_instance = IthinkCancelResponse.from_json(json)
# print the JSON string representation of the object
print(ithink_cancel_response_instance.to_json())

# convert the object into a dict
ithink_cancel_response_dict = ithink_cancel_response_instance.to_dict()
# create an instance of IthinkCancelResponse from a dict
ithink_cancel_response_from_dict = IthinkCancelResponse.from_dict(ithink_cancel_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


