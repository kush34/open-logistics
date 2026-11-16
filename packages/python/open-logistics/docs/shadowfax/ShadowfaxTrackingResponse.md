# ShadowfaxTrackingResponse

Raw `GET /v4/clients/orders/{awb_number}/track/` response.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**order_details** | [**ShadowfaxOrderDetails**](ShadowfaxOrderDetails.md) |  | [optional] 
**tracking_details** | [**List[ShadowfaxTrackingScan]**](ShadowfaxTrackingScan.md) |  | [optional] 
**scans** | [**List[ShadowfaxTrackingScan]**](ShadowfaxTrackingScan.md) |  | [optional] 
**events** | [**List[ShadowfaxTrackingScan]**](ShadowfaxTrackingScan.md) |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_tracking_response import ShadowfaxTrackingResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxTrackingResponse from a JSON string
shadowfax_tracking_response_instance = ShadowfaxTrackingResponse.from_json(json)
# print the JSON string representation of the object
print(shadowfax_tracking_response_instance.to_json())

# convert the object into a dict
shadowfax_tracking_response_dict = shadowfax_tracking_response_instance.to_dict()
# create an instance of ShadowfaxTrackingResponse from a dict
shadowfax_tracking_response_from_dict = ShadowfaxTrackingResponse.from_dict(shadowfax_tracking_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


