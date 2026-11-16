# IthinkOrderCreateData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**access_token** | **str** |  | 
**secret_key** | **str** |  | 
**shipments** | [**List[IthinkShipmentPayload]**](IthinkShipmentPayload.md) |  | 
**pickup_address_id** | **str** |  | 
**logistics** | **str** |  | [optional] 
**s_type** | **str** |  | [optional] 
**order_type** | **str** |  | [optional] 

## Example

```python
from open_logistics.ithink.models.ithink_order_create_data import IthinkOrderCreateData

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkOrderCreateData from a JSON string
ithink_order_create_data_instance = IthinkOrderCreateData.from_json(json)
# print the JSON string representation of the object
print(ithink_order_create_data_instance.to_json())

# convert the object into a dict
ithink_order_create_data_dict = ithink_order_create_data_instance.to_dict()
# create an instance of IthinkOrderCreateData from a dict
ithink_order_create_data_from_dict = IthinkOrderCreateData.from_dict(ithink_order_create_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


