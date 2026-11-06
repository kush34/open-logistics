# AssignAWBPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**shipment_id** | **str** |  | 
**courier_id** | **str** |  | 

## Example

```python
from open_logistics.shiprocket.models.assign_awb_payload import AssignAWBPayload

# TODO update the JSON string below
json = "{}"
# create an instance of AssignAWBPayload from a JSON string
assign_awb_payload_instance = AssignAWBPayload.from_json(json)
# print the JSON string representation of the object
print(assign_awb_payload_instance.to_json())

# convert the object into a dict
assign_awb_payload_dict = assign_awb_payload_instance.to_dict()
# create an instance of AssignAWBPayload from a dict
assign_awb_payload_from_dict = AssignAWBPayload.from_dict(assign_awb_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


