# CreateOrderPayload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**order_id** | **String** |  | 
**order_date** | **String** | YYYY-MM-DD HH:mm | 
**pickup_location** | **String** |  | 
**billing_customer_name** | **String** |  | 
**billing_last_name** | Option<**String**> |  | [optional]
**billing_address** | **String** |  | 
**billing_city** | **String** |  | 
**billing_pincode** | **String** |  | 
**billing_state** | **String** |  | 
**billing_country** | **String** |  | 
**billing_email** | **String** |  | 
**billing_phone** | **String** |  | 
**shipping_is_billing** | **bool** |  | 
**shipping_customer_name** | Option<**String**> | Required when `shipping_is_billing` is false. | [optional]
**shipping_last_name** | Option<**String**> |  | [optional]
**shipping_address** | Option<**String**> | Required when `shipping_is_billing` is false. | [optional]
**shipping_address_2** | Option<**String**> |  | [optional]
**shipping_city** | Option<**String**> | Required when `shipping_is_billing` is false. | [optional]
**shipping_pincode** | Option<**String**> | Required when `shipping_is_billing` is false. | [optional]
**shipping_state** | Option<**String**> | Required when `shipping_is_billing` is false. | [optional]
**shipping_country** | Option<**String**> | Required when `shipping_is_billing` is false. | [optional]
**shipping_email** | Option<**String**> |  | [optional]
**shipping_phone** | Option<**String**> | Required when `shipping_is_billing` is false. | [optional]
**order_items** | [**Vec<models::OrderItem>**](OrderItem.md) |  | 
**payment_method** | **PaymentMethod** |  (enum: prepaid, COD) | 
**sub_total** | **f64** |  | 
**length** | **f64** |  | 
**breadth** | **f64** |  | 
**height** | **f64** |  | 
**weight** | **f64** |  | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


