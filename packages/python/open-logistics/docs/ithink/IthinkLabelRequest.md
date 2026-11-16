# IthinkLabelRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**IthinkLabelRequestData**](IthinkLabelRequestData.md) |  | 

## Example

```python
from open_logistics.ithink.models.ithink_label_request import IthinkLabelRequest

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkLabelRequest from a JSON string
ithink_label_request_instance = IthinkLabelRequest.from_json(json)
# print the JSON string representation of the object
print(ithink_label_request_instance.to_json())

# convert the object into a dict
ithink_label_request_dict = ithink_label_request_instance.to_dict()
# create an instance of IthinkLabelRequest from a dict
ithink_label_request_from_dict = IthinkLabelRequest.from_dict(ithink_label_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


