# AssignAWBResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**awb_assign_status** | **int** |  | 
**response** | [**AssignAWBResponseResponse**](AssignAWBResponseResponse.md) |  | 

## Example

```python
from open_logistics_shiprocket.models.assign_awb_response import AssignAWBResponse

# TODO update the JSON string below
json = "{}"
# create an instance of AssignAWBResponse from a JSON string
assign_awb_response_instance = AssignAWBResponse.from_json(json)
# print the JSON string representation of the object
print(assign_awb_response_instance.to_json())

# convert the object into a dict
assign_awb_response_dict = assign_awb_response_instance.to_dict()
# create an instance of AssignAWBResponse from a dict
assign_awb_response_from_dict = AssignAWBResponse.from_dict(assign_awb_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


