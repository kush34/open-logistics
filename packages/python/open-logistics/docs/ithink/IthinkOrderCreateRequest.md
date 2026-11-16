# IthinkOrderCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**IthinkOrderCreateData**](IthinkOrderCreateData.md) |  | 

## Example

```python
from open_logistics.ithink.models.ithink_order_create_request import IthinkOrderCreateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkOrderCreateRequest from a JSON string
ithink_order_create_request_instance = IthinkOrderCreateRequest.from_json(json)
# print the JSON string representation of the object
print(ithink_order_create_request_instance.to_json())

# convert the object into a dict
ithink_order_create_request_dict = ithink_order_create_request_instance.to_dict()
# create an instance of IthinkOrderCreateRequest from a dict
ithink_order_create_request_from_dict = IthinkOrderCreateRequest.from_dict(ithink_order_create_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


