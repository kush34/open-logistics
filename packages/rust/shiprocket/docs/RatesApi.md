# \RatesApi

All URIs are relative to *https://apiv2.shiprocket.in/v1/external*

Method | HTTP request | Description
------------- | ------------- | -------------
[**courier_serviceability**](RatesApi.md#courier_serviceability) | **GET** /courier/serviceability | Check serviceability (also used for rate calculation)



## courier_serviceability

> std::collections::HashMap<String, serde_json::Value> courier_serviceability(pickup_postcode, delivery_postcode, weight, cod, order_id)
Check serviceability (also used for rate calculation)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**pickup_postcode** | **String** |  | [required] |
**delivery_postcode** | **String** |  | [required] |
**weight** | **f64** |  | [required] |
**cod** | Option<**i32**> |  |  |
**order_id** | Option<**String**> |  |  |

### Return type

[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

