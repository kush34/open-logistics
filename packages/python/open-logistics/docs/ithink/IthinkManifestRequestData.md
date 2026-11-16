# IthinkManifestRequestData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**access_token** | **str** |  | 
**secret_key** | **str** |  | 
**awb_numbers** | **str** | Comma-separated waybills. | 

## Example

```python
from open_logistics.ithink.models.ithink_manifest_request_data import IthinkManifestRequestData

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkManifestRequestData from a JSON string
ithink_manifest_request_data_instance = IthinkManifestRequestData.from_json(json)
# print the JSON string representation of the object
print(ithink_manifest_request_data_instance.to_json())

# convert the object into a dict
ithink_manifest_request_data_dict = ithink_manifest_request_data_instance.to_dict()
# create an instance of IthinkManifestRequestData from a dict
ithink_manifest_request_data_from_dict = IthinkManifestRequestData.from_dict(ithink_manifest_request_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


