# DelhiveryPickupRequestResponse

Raw `POST /fm/request/new/` response.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**pickup_id** | **str** |  | [optional] 
**message** | **str** |  | [optional] 
**status** | **str** |  | [optional] 

## Example

```python
from open_logistics_delhivery.models.delhivery_pickup_request_response import DelhiveryPickupRequestResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryPickupRequestResponse from a JSON string
delhivery_pickup_request_response_instance = DelhiveryPickupRequestResponse.from_json(json)
# print the JSON string representation of the object
print(delhivery_pickup_request_response_instance.to_json())

# convert the object into a dict
delhivery_pickup_request_response_dict = delhivery_pickup_request_response_instance.to_dict()
# create an instance of DelhiveryPickupRequestResponse from a dict
delhivery_pickup_request_response_from_dict = DelhiveryPickupRequestResponse.from_dict(delhivery_pickup_request_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


