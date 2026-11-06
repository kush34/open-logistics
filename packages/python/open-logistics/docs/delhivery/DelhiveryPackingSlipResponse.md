# DelhiveryPackingSlipResponse

Raw `GET /api/p/packing_slip` response.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**waybill** | **str** |  | [optional] 
**pdf_url** | **str** |  | [optional] 
**packages_found** | **int** |  | [optional] 
**packages** | **List[Dict[str, object]]** |  | [optional] 

## Example

```python
from open_logistics.delhivery.models.delhivery_packing_slip_response import DelhiveryPackingSlipResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DelhiveryPackingSlipResponse from a JSON string
delhivery_packing_slip_response_instance = DelhiveryPackingSlipResponse.from_json(json)
# print the JSON string representation of the object
print(delhivery_packing_slip_response_instance.to_json())

# convert the object into a dict
delhivery_packing_slip_response_dict = delhivery_packing_slip_response_instance.to_dict()
# create an instance of DelhiveryPackingSlipResponse from a dict
delhivery_packing_slip_response_from_dict = DelhiveryPackingSlipResponse.from_dict(delhivery_packing_slip_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


