# GenerateManifestPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**shipment_id** | **List[int]** |  | 

## Example

```python
from open_logistics.shiprocket.models.generate_manifest_payload import GenerateManifestPayload

# TODO update the JSON string below
json = "{}"
# create an instance of GenerateManifestPayload from a JSON string
generate_manifest_payload_instance = GenerateManifestPayload.from_json(json)
# print the JSON string representation of the object
print(generate_manifest_payload_instance.to_json())

# convert the object into a dict
generate_manifest_payload_dict = generate_manifest_payload_instance.to_dict()
# create an instance of GenerateManifestPayload from a dict
generate_manifest_payload_from_dict = GenerateManifestPayload.from_dict(generate_manifest_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


