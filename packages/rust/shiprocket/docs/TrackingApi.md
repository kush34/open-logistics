# \TrackingApi

All URIs are relative to *https://apiv2.shiprocket.in/v1/external*

Method | HTTP request | Description
------------- | ------------- | -------------
[**tracking_by_awb**](TrackingApi.md#tracking_by_awb) | **GET** /courier/track/awb/{awb} | Track by AWB code
[**tracking_by_order**](TrackingApi.md#tracking_by_order) | **GET** /orders/track/{orderId} | Track by order ID
[**tracking_by_shipment**](TrackingApi.md#tracking_by_shipment) | **GET** /courier/track/shipment/{shipmentId} | Track by shipment ID



## tracking_by_awb

> models::TrackByAwbResponse tracking_by_awb(awb)
Track by AWB code

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**awb** | **String** |  | [required] |

### Return type

[**models::TrackByAwbResponse**](TrackByAWBResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## tracking_by_order

> models::TrackByAwbResponse tracking_by_order(order_id)
Track by order ID

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**order_id** | **String** |  | [required] |

### Return type

[**models::TrackByAwbResponse**](TrackByAWBResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## tracking_by_shipment

> models::TrackByAwbResponse tracking_by_shipment(shipment_id)
Track by shipment ID

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**shipment_id** | **i32** |  | [required] |

### Return type

[**models::TrackByAwbResponse**](TrackByAWBResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

