# IthinkLabelRequestData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**access_token** | **str** |  | 
**secret_key** | **str** |  | 
**awb_numbers** | **str** | Comma-separated waybills, up to 100. | 
**page_size** | **str** |  | [optional] [default to 'A4']

## Example

```python
from open_logistics.ithink.models.ithink_label_request_data import IthinkLabelRequestData

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkLabelRequestData from a JSON string
ithink_label_request_data_instance = IthinkLabelRequestData.from_json(json)
# print the JSON string representation of the object
print(ithink_label_request_data_instance.to_json())

# convert the object into a dict
ithink_label_request_data_dict = ithink_label_request_data_instance.to_dict()
# create an instance of IthinkLabelRequestData from a dict
ithink_label_request_data_from_dict = IthinkLabelRequestData.from_dict(ithink_label_request_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


