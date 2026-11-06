# CreateOrderPayload


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**order_id** | **str** |  | 
**order_date** | **str** | YYYY-MM-DD HH:mm | 
**pickup_location** | **str** |  | 
**billing_customer_name** | **str** |  | 
**billing_last_name** | **str** |  | [optional] 
**billing_address** | **str** |  | 
**billing_city** | **str** |  | 
**billing_pincode** | **str** |  | 
**billing_state** | **str** |  | 
**billing_country** | **str** |  | 
**billing_email** | **str** |  | 
**billing_phone** | **str** |  | 
**shipping_is_billing** | **bool** |  | 
**shipping_customer_name** | **str** | Required when &#x60;shipping_is_billing&#x60; is false. | [optional] 
**shipping_last_name** | **str** |  | [optional] 
**shipping_address** | **str** | Required when &#x60;shipping_is_billing&#x60; is false. | [optional] 
**shipping_address_2** | **str** |  | [optional] 
**shipping_city** | **str** | Required when &#x60;shipping_is_billing&#x60; is false. | [optional] 
**shipping_pincode** | **str** | Required when &#x60;shipping_is_billing&#x60; is false. | [optional] 
**shipping_state** | **str** | Required when &#x60;shipping_is_billing&#x60; is false. | [optional] 
**shipping_country** | **str** | Required when &#x60;shipping_is_billing&#x60; is false. | [optional] 
**shipping_email** | **str** |  | [optional] 
**shipping_phone** | **str** | Required when &#x60;shipping_is_billing&#x60; is false. | [optional] 
**order_items** | [**List[OrderItem]**](OrderItem.md) |  | 
**payment_method** | **str** |  | 
**sub_total** | **float** |  | 
**length** | **float** |  | 
**breadth** | **float** |  | 
**height** | **float** |  | 
**weight** | **float** |  | 

## Example

```python
from open_logistics.shiprocket.models.create_order_payload import CreateOrderPayload

# TODO update the JSON string below
json = "{}"
# create an instance of CreateOrderPayload from a JSON string
create_order_payload_instance = CreateOrderPayload.from_json(json)
# print the JSON string representation of the object
print(create_order_payload_instance.to_json())

# convert the object into a dict
create_order_payload_dict = create_order_payload_instance.to_dict()
# create an instance of CreateOrderPayload from a dict
create_order_payload_from_dict = CreateOrderPayload.from_dict(create_order_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


