# TrackByAWBResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tracking_data** | [**TrackByAWBResponseTrackingData**](TrackByAWBResponseTrackingData.md) |  | 

## Example

```python
from open_logistics_shiprocket.models.track_by_awb_response import TrackByAWBResponse

# TODO update the JSON string below
json = "{}"
# create an instance of TrackByAWBResponse from a JSON string
track_by_awb_response_instance = TrackByAWBResponse.from_json(json)
# print the JSON string representation of the object
print(TrackByAWBResponse.to_json())

# convert the object into a dict
track_by_awb_response_dict = track_by_awb_response_instance.to_dict()
# create an instance of TrackByAWBResponse from a dict
track_by_awb_response_from_dict = TrackByAWBResponse.from_dict(track_by_awb_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


