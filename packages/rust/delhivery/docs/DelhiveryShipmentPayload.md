# DelhiveryShipmentPayload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**order_id** | **String** |  | 
**waybill** | Option<**String**> |  | [optional]
**order_date** | Option<**String**> |  | [optional]
**client** | Option<**String**> |  | [optional]
**pickup_location** | [**models::DelhiveryPickupLocation**](DelhiveryPickupLocation.md) |  | 
**package_type** | **PackageType** |  (enum: COD, Pre-paid, Pickup) | 
**payment_mode** | Option<**PaymentMode**> |  (enum: COD, Pre-paid, Pickup) | [optional]
**cod_amount** | Option<**f64**> |  | [optional]
**name** | **String** |  | 
**add** | Option<**String**> |  | [optional]
**address** | Option<**String**> |  | [optional]
**phone** | **String** |  | 
**pin** | **String** |  | 
**city** | Option<**String**> |  | [optional]
**state** | Option<**String**> |  | [optional]
**country** | Option<**String**> |  | [optional]
**products_desc** | Option<**String**> |  | [optional]
**product_details** | Option<**String**> |  | [optional]
**shipment_length** | Option<**f64**> |  | [optional]
**shipment_width** | Option<**f64**> |  | [optional]
**shipment_height** | Option<**f64**> |  | [optional]
**gm** | Option<**f64**> |  | [optional]
**weight** | Option<**f64**> |  | [optional]
**fragile_shipment** | Option<**bool**> |  | [optional]
**ewaybill** | Option<**String**> |  | [optional]
**seller_gst_tin** | Option<**String**> |  | [optional]
**client_gst_tin** | Option<**String**> |  | [optional]
**consignee_gst_tin** | Option<**String**> |  | [optional]
**hsn_code** | Option<[**models::DelhiveryApiErrorBodyErrorsValue**](DelhiveryApiErrorBodyErrorsValue.md)> |  | [optional]
**invoice_reference** | Option<**String**> |  | [optional]
**qc** | Option<[**models::DelhiveryShipmentPayloadQc**](DelhiveryShipmentPayloadQc.md)> |  | [optional]
**shipment** | Option<[**Vec<models::DelhiveryShipmentItem>**](DelhiveryShipmentItem.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


