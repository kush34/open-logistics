# ShadowfaxAwbRequestPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**awb_count** | **int** |  | [optional] 
**request_type** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_awb_request_payload import ShadowfaxAwbRequestPayload

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxAwbRequestPayload from a JSON string
shadowfax_awb_request_payload_instance = ShadowfaxAwbRequestPayload.from_json(json)
# print the JSON string representation of the object
print(shadowfax_awb_request_payload_instance.to_json())

# convert the object into a dict
shadowfax_awb_request_payload_dict = shadowfax_awb_request_payload_instance.to_dict()
# create an instance of ShadowfaxAwbRequestPayload from a dict
shadowfax_awb_request_payload_from_dict = ShadowfaxAwbRequestPayload.from_dict(shadowfax_awb_request_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


