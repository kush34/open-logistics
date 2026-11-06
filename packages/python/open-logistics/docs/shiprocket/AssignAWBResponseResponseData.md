# AssignAWBResponseResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**awb_code** | **str** |  | 
**courier_name** | **str** |  | 

## Example

```python
from open_logistics.shiprocket.models.assign_awb_response_response_data import AssignAWBResponseResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of AssignAWBResponseResponseData from a JSON string
assign_awb_response_response_data_instance = AssignAWBResponseResponseData.from_json(json)
# print the JSON string representation of the object
print(assign_awb_response_response_data_instance.to_json())

# convert the object into a dict
assign_awb_response_response_data_dict = assign_awb_response_response_data_instance.to_dict()
# create an instance of AssignAWBResponseResponseData from a dict
assign_awb_response_response_data_from_dict = AssignAWBResponseResponseData.from_dict(assign_awb_response_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


