# ShiprocketError


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status_code** | **int** |  | 
**message** | **str** |  | 
**errors** | **Dict[str, List[str]]** |  | [optional] 

## Example

```python
from open_logistics_shiprocket.models.shiprocket_error import ShiprocketError

# TODO update the JSON string below
json = "{}"
# create an instance of ShiprocketError from a JSON string
shiprocket_error_instance = ShiprocketError.from_json(json)
# print the JSON string representation of the object
print(ShiprocketError.to_json())

# convert the object into a dict
shiprocket_error_dict = shiprocket_error_instance.to_dict()
# create an instance of ShiprocketError from a dict
shiprocket_error_from_dict = ShiprocketError.from_dict(shiprocket_error_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


