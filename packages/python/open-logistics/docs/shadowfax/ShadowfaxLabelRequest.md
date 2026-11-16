# ShadowfaxLabelRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**awb_number** | **str** |  | 
**file_type** | **str** |  | [optional] [default to 'pdf']

## Example

```python
from open_logistics.shadowfax.models.shadowfax_label_request import ShadowfaxLabelRequest

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxLabelRequest from a JSON string
shadowfax_label_request_instance = ShadowfaxLabelRequest.from_json(json)
# print the JSON string representation of the object
print(shadowfax_label_request_instance.to_json())

# convert the object into a dict
shadowfax_label_request_dict = shadowfax_label_request_instance.to_dict()
# create an instance of ShadowfaxLabelRequest from a dict
shadowfax_label_request_from_dict = ShadowfaxLabelRequest.from_dict(shadowfax_label_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


