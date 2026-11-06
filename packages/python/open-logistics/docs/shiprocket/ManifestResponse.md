# ManifestResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**manifest_url** | **str** |  | 

## Example

```python
from open_logistics.shiprocket.models.manifest_response import ManifestResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ManifestResponse from a JSON string
manifest_response_instance = ManifestResponse.from_json(json)
# print the JSON string representation of the object
print(manifest_response_instance.to_json())

# convert the object into a dict
manifest_response_dict = manifest_response_instance.to_dict()
# create an instance of ManifestResponse from a dict
manifest_response_from_dict = ManifestResponse.from_dict(manifest_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


