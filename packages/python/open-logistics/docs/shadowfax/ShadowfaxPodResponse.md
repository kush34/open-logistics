# ShadowfaxPodResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**pod_details** | [**Dict[str, ShadowfaxPodDetails]**](ShadowfaxPodDetails.md) |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_pod_response import ShadowfaxPodResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxPodResponse from a JSON string
shadowfax_pod_response_instance = ShadowfaxPodResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_pod_response_instance.to_json())

# convert the object into a dict
shadowfax_pod_response_dict = shadowfax_pod_response_instance.to_dict()
# create an instance of ShadowfaxPodResponse from a dict
shadowfax_pod_response_from_dict = ShadowfaxPodResponse.from_dict(shadowfax_pod_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


