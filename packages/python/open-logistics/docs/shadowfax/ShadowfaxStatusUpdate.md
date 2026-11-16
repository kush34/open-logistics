# ShadowfaxStatusUpdate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **str** |  | 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_status_update import ShadowfaxStatusUpdate

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxStatusUpdate from a JSON string
shadowfax_status_update_instance = ShadowfaxStatusUpdate.from_json(json)
# print the JSON string representation of the object
print(shadowfax_status_update_instance.to_json())

# convert the object into a dict
shadowfax_status_update_dict = shadowfax_status_update_instance.to_dict()
# create an instance of ShadowfaxStatusUpdate from a dict
shadowfax_status_update_from_dict = ShadowfaxStatusUpdate.from_dict(shadowfax_status_update_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


