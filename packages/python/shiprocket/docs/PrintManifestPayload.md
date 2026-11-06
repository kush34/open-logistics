# PrintManifestPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**order_ids** | **List[int]** |  | 

## Example

```python
from open_logistics_shiprocket.models.print_manifest_payload import PrintManifestPayload

# TODO update the JSON string below
json = "{}"
# create an instance of PrintManifestPayload from a JSON string
print_manifest_payload_instance = PrintManifestPayload.from_json(json)
# print the JSON string representation of the object
print(print_manifest_payload_instance.to_json())

# convert the object into a dict
print_manifest_payload_dict = print_manifest_payload_instance.to_dict()
# create an instance of PrintManifestPayload from a dict
print_manifest_payload_from_dict = PrintManifestPayload.from_dict(print_manifest_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


