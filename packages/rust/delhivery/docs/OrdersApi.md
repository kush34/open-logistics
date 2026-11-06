# \OrdersApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**orders_create**](OrdersApi.md#orders_create) | **POST** /api/cmu/create.json | Create a shipment/order
[**orders_edit**](OrdersApi.md#orders_edit) | **POST** /api/p/edit | Update or cancel a shipment



## orders_create

> models::DelhiveryOrderCreateResponse orders_create(format, data)
Create a shipment/order

Form-encoded endpoint. `data` is a JSON string of the form `{\"shipments\": [DelhiveryShipmentPayload]}`. 

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**format** | **String** |  | [required] |[default to json]
**data** | **String** | JSON-encoded object with a `shipments` array. | [required] |

### Return type

[**models::DelhiveryOrderCreateResponse**](DelhiveryOrderCreateResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## orders_edit

> models::DelhiveryOrderEditResponse orders_edit(delhivery_order_edit_payload)
Update or cancel a shipment

Send an update payload to change shipment details, or `{waybill, cancellation: true}` to cancel. 

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**delhivery_order_edit_payload** | [**DelhiveryOrderEditPayload**](DelhiveryOrderEditPayload.md) |  | [required] |

### Return type

[**models::DelhiveryOrderEditResponse**](DelhiveryOrderEditResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

