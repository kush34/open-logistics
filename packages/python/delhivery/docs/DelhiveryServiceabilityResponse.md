# DelhiveryServiceabilityResponse

Raw `GET /c/api/pin-codes/json/` response.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**delivery_codes** | [**List[DelhiveryServiceabilityResponseDeliveryCodesInner]**](DelhiveryServiceabilityResponseDeliveryCodesInner.md) |  | [optional] 

## Example

```python
from open_logistics_delhivery.models.delhivery_serviceability_response import DelhiveryServiceabilityResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryServiceabilityResponse from a JSON string
delhivery_serviceability_response_instance = DelhiveryServiceabilityResponse.from_json(json)
# print the JSON string representation of the object
print(delhivery_serviceability_response_instance.to_json())

# convert the object into a dict
delhivery_serviceability_response_dict = delhivery_serviceability_response_instance.to_dict()
# create an instance of DelhiveryServiceabilityResponse from a dict
delhivery_serviceability_response_from_dict = DelhiveryServiceabilityResponse.from_dict(delhivery_serviceability_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


