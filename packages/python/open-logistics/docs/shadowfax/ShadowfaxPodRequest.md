# ShadowfaxPodRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**awb_numbers** | **List[str]** |  | 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_pod_request import ShadowfaxPodRequest

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxPodRequest from a JSON string
shadowfax_pod_request_instance = ShadowfaxPodRequest.from_json(json)
# print the JSON string representation of the object
print(shadowfax_pod_request_instance.to_json())

# convert the object into a dict
shadowfax_pod_request_dict = shadowfax_pod_request_instance.to_dict()
# create an instance of ShadowfaxPodRequest from a dict
shadowfax_pod_request_from_dict = ShadowfaxPodRequest.from_dict(shadowfax_pod_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


