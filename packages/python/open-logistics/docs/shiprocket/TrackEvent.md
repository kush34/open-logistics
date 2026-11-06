# TrackEvent


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**awb_code** | **str** |  | 
**courier_company_id** | **int** |  | 
**shipment_id** | **int** |  | 
**order_id** | **int** |  | 
**pickup_date** | **str** |  | [optional] 
**delivered_date** | **str** |  | [optional] 
**weight** | **str** |  | 
**packages** | **int** |  | 
**current_status** | **str** |  | 
**delivered_to** | **str** |  | 
**destination** | **str** |  | 
**consignee_name** | **str** |  | 
**origin** | **str** |  | 
**courier_agent_details** | **str** |  | [optional] 

## Example

```python
from open_logistics.shiprocket.models.track_event import TrackEvent

# TODO update the JSON string below
json = "{}"
# create an instance of TrackEvent from a JSON string
track_event_instance = TrackEvent.from_json(json)
# print the JSON string representation of the object
print(track_event_instance.to_json())

# convert the object into a dict
track_event_dict = track_event_instance.to_dict()
# create an instance of TrackEvent from a dict
track_event_from_dict = TrackEvent.from_dict(track_event_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


