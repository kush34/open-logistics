# DelhiveryTrackingResponse

Raw `GET /api/v1/packages/json/` response. `ShipmentData` is provider-shaped and is exposed as-is; there is no client-side normalization. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**shipment_data** | **List[Dict[str, object]]** |  | [optional] 

## Example

```python
from open_logistics.delhivery.models.delhivery_tracking_response import DelhiveryTrackingResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryTrackingResponse from a JSON string
delhivery_tracking_response_instance = DelhiveryTrackingResponse.from_json(json)
# print the JSON string representation of the object
print(delhivery_tracking_response_instance.to_json())

# convert the object into a dict
delhivery_tracking_response_dict = delhivery_tracking_response_instance.to_dict()
# create an instance of DelhiveryTrackingResponse from a dict
delhivery_tracking_response_from_dict = DelhiveryTrackingResponse.from_dict(delhivery_tracking_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


