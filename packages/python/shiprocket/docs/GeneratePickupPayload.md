# GeneratePickupPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**shipment_id** | **List[int]** |  | 

## Example

```python
from open_logistics_shiprocket.models.generate_pickup_payload import GeneratePickupPayload

# TODO update the JSON string below
json = "{}"
# create an instance of GeneratePickupPayload from a JSON string
generate_pickup_payload_instance = GeneratePickupPayload.from_json(json)
# print the JSON string representation of the object
print(generate_pickup_payload_instance.to_json())

# convert the object into a dict
generate_pickup_payload_dict = generate_pickup_payload_instance.to_dict()
# create an instance of GeneratePickupPayload from a dict
generate_pickup_payload_from_dict = GeneratePickupPayload.from_dict(generate_pickup_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


