# AuthCredentials


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **str** |  | 
**password** | **str** |  | 

## Example

```python
from open_logistics_shiprocket.models.auth_credentials import AuthCredentials

# TODO update the JSON string below
json = "{}"
# create an instance of AuthCredentials from a JSON string
auth_credentials_instance = AuthCredentials.from_json(json)
# print the JSON string representation of the object
print(auth_credentials_instance.to_json())

# convert the object into a dict
auth_credentials_dict = auth_credentials_instance.to_dict()
# create an instance of AuthCredentials from a dict
auth_credentials_from_dict = AuthCredentials.from_dict(auth_credentials_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


