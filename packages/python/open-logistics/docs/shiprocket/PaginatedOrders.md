# PaginatedOrders


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[OrderResponse]**](OrderResponse.md) |  | 
**meta** | [**PaginatedOrdersMeta**](PaginatedOrdersMeta.md) |  | 

## Example

```python
from open_logistics.shiprocket.models.paginated_orders import PaginatedOrders

# TODO update the JSON string below
json = "{}"
# create an instance of PaginatedOrders from a JSON string
paginated_orders_instance = PaginatedOrders.from_json(json)
# print the JSON string representation of the object
print(paginated_orders_instance.to_json())

# convert the object into a dict
paginated_orders_dict = paginated_orders_instance.to_dict()
# create an instance of PaginatedOrders from a dict
paginated_orders_from_dict = PaginatedOrders.from_dict(paginated_orders_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


