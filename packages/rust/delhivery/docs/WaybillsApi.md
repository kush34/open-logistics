# \WaybillsApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**waybills_fetch**](WaybillsApi.md#waybills_fetch) | **GET** /waybill/api/fetch/json/ | Fetch a single waybill
[**waybills_fetch_bulk**](WaybillsApi.md#waybills_fetch_bulk) | **GET** /waybill/api/bulk/json/ | Fetch waybills in bulk



## waybills_fetch

> String waybills_fetch(cl, client_name, token)
Fetch a single waybill

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**cl** | Option<**String**> | Client code. Pass explicitly; generated clients do not read it from credentials. |  |
**client_name** | Option<**String**> | Client name. Pass explicitly; generated clients do not read it from credentials. |  |
**token** | Option<**String**> | API token. Pass explicitly; generated clients do not read it from credentials. |  |

### Return type

**String**

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## waybills_fetch_bulk

> String waybills_fetch_bulk(cl, client_name, token, action, count, wbn)
Fetch waybills in bulk

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**cl** | Option<**String**> | Client code. Pass explicitly; generated clients do not read it from credentials. |  |
**client_name** | Option<**String**> | Client name. Pass explicitly; generated clients do not read it from credentials. |  |
**token** | Option<**String**> | API token. Pass explicitly; generated clients do not read it from credentials. |  |
**action** | Option<**String**> |  |  |[default to next]
**count** | Option<**i32**> |  |  |
**wbn** | Option<**String**> |  |  |

### Return type

**String**

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

