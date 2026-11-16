# ShadowfaxTrackingScan


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**created** | **str** |  | [optional] 
**location** | **str** |  | [optional] 
**status_id** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**remarks** | **str** |  | [optional] 
**awb_number** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_tracking_scan import ShadowfaxTrackingScan

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxTrackingScan from a JSON string
shadowfax_tracking_scan_instance = ShadowfaxTrackingScan.from_json(json)
# print the JSON string representation of the object
print(shadowfax_tracking_scan_instance.to_json())

# convert the object into a dict
shadowfax_tracking_scan_dict = shadowfax_tracking_scan_instance.to_dict()
# create an instance of ShadowfaxTrackingScan from a dict
shadowfax_tracking_scan_from_dict = ShadowfaxTrackingScan.from_dict(shadowfax_tracking_scan_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


