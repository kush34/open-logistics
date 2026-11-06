# GeneratePickupResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**pickup_status** | **int** |  | 
**response** | [**GeneratePickupResponseResponse**](GeneratePickupResponseResponse.md) |  | 

## Example

```python
from open_logistics.shiprocket.models.generate_pickup_response import GeneratePickupResponse

# TODO update the JSON string below
json = "{}"
# create an instance of GeneratePickupResponse from a JSON string
generate_pickup_response_instance = GeneratePickupResponse.from_json(json)
# print the JSON string representation of the object
print(generate_pickup_response_instance.to_json())

# convert the object into a dict
generate_pickup_response_dict = generate_pickup_response_instance.to_dict()
# create an instance of GeneratePickupResponse from a dict
generate_pickup_response_from_dict = GeneratePickupResponse.from_dict(generate_pickup_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


