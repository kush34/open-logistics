# ShadowfaxPodDetails


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**recipient** | **str** |  | [optional] 
**recipient_name** | **str** |  | [optional] 
**recipient_contact** | **str** |  | [optional] 
**recipient_signature** | **object** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_pod_details import ShadowfaxPodDetails

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxPodDetails from a JSON string
shadowfax_pod_details_instance = ShadowfaxPodDetails.from_json(json)
# print the JSON string representation of the object
print(shadowfax_pod_details_instance.to_json())

# convert the object into a dict
shadowfax_pod_details_dict = shadowfax_pod_details_instance.to_dict()
# create an instance of ShadowfaxPodDetails from a dict
shadowfax_pod_details_from_dict = ShadowfaxPodDetails.from_dict(shadowfax_pod_details_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


