# TrackByAWBResponseTrackingData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**track_status** | **int** |  | 
**shipment_status** | **int** |  | 
**shipment_track** | [**List[TrackEvent]**](TrackEvent.md) |  | 
**shipment_track_activities** | [**List[TrackActivity]**](TrackActivity.md) |  | 
**track_url** | **str** |  | 

## Example

```python
from open_logistics.shiprocket.models.track_by_awb_response_tracking_data import TrackByAWBResponseTrackingData

# TODO update the JSON string below
json = "{}"
# create an instance of TrackByAWBResponseTrackingData from a JSON string
track_by_awb_response_tracking_data_instance = TrackByAWBResponseTrackingData.from_json(json)
# print the JSON string representation of the object
print(track_by_awb_response_tracking_data_instance.to_json())

# convert the object into a dict
track_by_awb_response_tracking_data_dict = track_by_awb_response_tracking_data_instance.to_dict()
# create an instance of TrackByAWBResponseTrackingData from a dict
track_by_awb_response_tracking_data_from_dict = TrackByAWBResponseTrackingData.from_dict(track_by_awb_response_tracking_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


