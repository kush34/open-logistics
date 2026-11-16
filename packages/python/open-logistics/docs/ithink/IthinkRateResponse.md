# IthinkRateResponse

Raw `POST /api_v3/rate/check.json` response. `data` is a list of courier rates, or an object keyed by courier. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **str** |  | [optional] 
**status_code** | **object** | Integer or numeric string; the provider sends both. | [optional] 
**message** | **str** |  | [optional] 
**zone** | **str** |  | [optional] 
**expected_delivery_date** | **str** |  | [optional] 
**data** | **object** |  | [optional] 

## Example

```python
from open_logistics.ithink.models.ithink_rate_response import IthinkRateResponse

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkRateResponse from a JSON string
ithink_rate_response_instance = IthinkRateResponse.from_json(json)
# print the JSON string representation of the object
print(ithink_rate_response_instance.to_json())

# convert the object into a dict
ithink_rate_response_dict = ithink_rate_response_instance.to_dict()
# create an instance of IthinkRateResponse from a dict
ithink_rate_response_from_dict = IthinkRateResponse.from_dict(ithink_rate_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


