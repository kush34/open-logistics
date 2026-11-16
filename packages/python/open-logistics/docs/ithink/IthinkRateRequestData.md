# IthinkRateRequestData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**access_token** | **str** |  | 
**secret_key** | **str** |  | 
**from_pincode** | **str** |  | 
**to_pincode** | **str** |  | [optional] 
**shipping_length_cms** | **float** |  | [optional] 
**shipping_width_cms** | **float** |  | [optional] 
**shipping_height_cms** | **float** |  | [optional] 
**shipping_weight_kg** | **float** |  | 
**order_type** | **str** |  | [optional] 
**payment_method** | **str** |  | 
**product_mrp** | **float** |  | 

## Example

```python
from open_logistics.ithink.models.ithink_rate_request_data import IthinkRateRequestData

# TODO update the JSON string below
json = "{}"
# create an instance of IthinkRateRequestData from a JSON string
ithink_rate_request_data_instance = IthinkRateRequestData.from_json(json)
# print the JSON string representation of the object
print(ithink_rate_request_data_instance.to_json())

# convert the object into a dict
ithink_rate_request_data_dict = ithink_rate_request_data_instance.to_dict()
# create an instance of IthinkRateRequestData from a dict
ithink_rate_request_data_from_dict = IthinkRateRequestData.from_dict(ithink_rate_request_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


