# ShadowfaxLabelResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**data** | [**ShadowfaxLabelData**](ShadowfaxLabelData.md) |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_label_response import ShadowfaxLabelResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxLabelResponse from a JSON string
shadowfax_label_response_instance = ShadowfaxLabelResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_label_response_instance.to_json())

# convert the object into a dict
shadowfax_label_response_dict = shadowfax_label_response_instance.to_dict()
# create an instance of ShadowfaxLabelResponse from a dict
shadowfax_label_response_from_dict = ShadowfaxLabelResponse.from_dict(shadowfax_label_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


