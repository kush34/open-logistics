# ShadowfaxCreateOrderPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**customer_details** | [**ShadowfaxCustomerDetails**](ShadowfaxCustomerDetails.md) |  | 
**order_details** | [**ShadowfaxOrderInfo**](ShadowfaxOrderInfo.md) |  | 
**pickup_details** | [**ShadowfaxPickupAddress**](ShadowfaxPickupAddress.md) |  | 
**return_details** | [**ShadowfaxReturnAddress**](ShadowfaxReturnAddress.md) |  | 
**product_details** | [**List[ShadowfaxSkuItem]**](ShadowfaxSkuItem.md) |  | 
**order_type** | **str** |  | [optional] 

## Example

```python
from open_logistics.shadowfax.models.shadowfax_create_order_payload import ShadowfaxCreateOrderPayload

# TODO update the JSON string below
json = "{}"
# create an instance of ShadowfaxCreateOrderPayload from a JSON string
shadowfax_create_order_payload_instance = ShadowfaxCreateOrderPayload.from_json(json)
# print the JSON string representation of the object
print(shadowfax_create_order_payload_instance.to_json())

# convert the object into a dict
shadowfax_create_order_payload_dict = shadowfax_create_order_payload_instance.to_dict()
# create an instance of ShadowfaxCreateOrderPayload from a dict
shadowfax_create_order_payload_from_dict = ShadowfaxCreateOrderPayload.from_dict(shadowfax_create_order_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


