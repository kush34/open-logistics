# IthinkManifestRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**IthinkManifestRequestData**](IthinkManifestRequestData.md) |  | 

## Example

```python
from open_logistics.ithink.models.ithink_manifest_request import IthinkManifestRequest

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkManifestRequest from a JSON string
ithink_manifest_request_instance = IthinkManifestRequest.from_json(json)
# print the JSON string representation of the object
print(ithink_manifest_request_instance.to_json())

# convert the object into a dict
ithink_manifest_request_dict = ithink_manifest_request_instance.to_dict()
# create an instance of IthinkManifestRequest from a dict
ithink_manifest_request_from_dict = IthinkManifestRequest.from_dict(ithink_manifest_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


