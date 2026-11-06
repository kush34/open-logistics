# GeneratePickupResponseResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**GeneratePickupResponseResponseData**](GeneratePickupResponseResponseData.md) |  | 

## Example

```python
from open_logistics.shiprocket.models.generate_pickup_response_response import GeneratePickupResponseResponse

# TODO update the JSON string below
json = "{}"
# create an instance of GeneratePickupResponseResponse from a JSON string
generate_pickup_response_response_instance = GeneratePickupResponseResponse.from_json(json)
# print the JSON string representation of the object
print(generate_pickup_response_response_instance.to_json())

# convert the object into a dict
generate_pickup_response_response_dict = generate_pickup_response_response_instance.to_dict()
# create an instance of GeneratePickupResponseResponse from a dict
generate_pickup_response_response_from_dict = GeneratePickupResponseResponse.from_dict(generate_pickup_response_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


