# IthinkRateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**IthinkRateRequestData**](IthinkRateRequestData.md) |  | 

## Example

```python
from open_logistics.ithink.models.ithink_rate_request import IthinkRateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkRateRequest from a JSON string
ithink_rate_request_instance = IthinkRateRequest.from_json(json)
# print the JSON string representation of the object
print(ithink_rate_request_instance.to_json())

# convert the object into a dict
ithink_rate_request_dict = ithink_rate_request_instance.to_dict()
# create an instance of IthinkRateRequest from a dict
ithink_rate_request_from_dict = IthinkRateRequest.from_dict(ithink_rate_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


