# GenerateLabelResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**label_created** | **int** |  | 
**url** | **str** |  | 

## Example

```python
from open_logistics.shiprocket.models.generate_label_response import GenerateLabelResponse

# TODO update the JSON string below
json = "{}"
# create an instance of GenerateLabelResponse from a JSON string
generate_label_response_instance = GenerateLabelResponse.from_json(json)
# print the JSON string representation of the object
print(generate_label_response_instance.to_json())

# convert the object into a dict
generate_label_response_dict = generate_label_response_instance.to_dict()
# create an instance of GenerateLabelResponse from a dict
generate_label_response_from_dict = GenerateLabelResponse.from_dict(generate_label_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


