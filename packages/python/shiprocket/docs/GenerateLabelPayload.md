# GenerateLabelPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**shipment_id** | **List[int]** |  | 

## Example

```python
from open_logistics_shiprocket.models.generate_label_payload import GenerateLabelPayload

# TODO update the JSON string below
json = "{}"
# create an instance of GenerateLabelPayload from a JSON string
generate_label_payload_instance = GenerateLabelPayload.from_json(json)
# print the JSON string representation of the object
print(generate_label_payload_instance.to_json())

# convert the object into a dict
generate_label_payload_dict = generate_label_payload_instance.to_dict()
# create an instance of GenerateLabelPayload from a dict
generate_label_payload_from_dict = GenerateLabelPayload.from_dict(generate_label_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


