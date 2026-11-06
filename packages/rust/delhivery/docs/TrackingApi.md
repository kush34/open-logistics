# \TrackingApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**tracking_fetch**](TrackingApi.md#tracking_fetch) | **GET** /api/v1/packages/json/ | Fetch tracking by waybill or order reference



## tracking_fetch

> models::DelhiveryTrackingResponse tracking_fetch(waybill, ref_nos)
Fetch tracking by waybill or order reference

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**waybill** | Option<**String**> | One waybill, or a comma-separated list. |  |
**ref_nos** | Option<**String**> | Order reference number. |  |

### Return type

[**models::DelhiveryTrackingResponse**](DelhiveryTrackingResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

