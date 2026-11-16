# ShadowfaxLabelData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**label_url** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_label_data import ShadowfaxLabelData

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxLabelData from a JSON string
shadowfax_label_data_instance = ShadowfaxLabelData.from_json(json)
# print the JSON string representation of the object
print(shadowfax_label_data_instance.to_json())

# convert the object into a dict
shadowfax_label_data_dict = shadowfax_label_data_instance.to_dict()
# create an instance of ShadowfaxLabelData from a dict
shadowfax_label_data_from_dict = ShadowfaxLabelData.from_dict(shadowfax_label_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


