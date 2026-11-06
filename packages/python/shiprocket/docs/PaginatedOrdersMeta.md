# PaginatedOrdersMeta


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**pagination** | [**Pagination**](Pagination.md) |  | 

## Example

```python
from open_logistics_shiprocket.models.paginated_orders_meta import PaginatedOrdersMeta

# TODO update the JSON string below
json = "{}"
# create an instance of PaginatedOrdersMeta from a JSON string
paginated_orders_meta_instance = PaginatedOrdersMeta.from_json(json)
# print the JSON string representation of the object
print(PaginatedOrdersMeta.to_json())

# convert the object into a dict
paginated_orders_meta_dict = paginated_orders_meta_instance.to_dict()
# create an instance of PaginatedOrdersMeta from a dict
paginated_orders_meta_from_dict = PaginatedOrdersMeta.from_dict(paginated_orders_meta_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


