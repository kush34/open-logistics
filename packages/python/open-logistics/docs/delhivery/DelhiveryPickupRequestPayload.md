# DelhiveryPickupRequestPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**pickup_time** | **str** |  | 
**pickup_date** | **str** |  | 
**pickup_location** | **str** |  | 
**expected_package_count** | **int** |  | 

## Example

```python
from open_logistics.delhivery.models.delhivery_pickup_request_payload import DelhiveryPickupRequestPayload

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryPickupRequestPayload from a JSON string
delhivery_pickup_request_payload_instance = DelhiveryPickupRequestPayload.from_json(json)
# print the JSON string representation of the object
print(delhivery_pickup_request_payload_instance.to_json())

# convert the object into a dict
delhivery_pickup_request_payload_dict = delhivery_pickup_request_payload_instance.to_dict()
# create an instance of DelhiveryPickupRequestPayload from a dict
delhivery_pickup_request_payload_from_dict = DelhiveryPickupRequestPayload.from_dict(delhivery_pickup_request_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


