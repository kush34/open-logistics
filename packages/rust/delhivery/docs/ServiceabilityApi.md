# \ServiceabilityApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**serviceability_check**](ServiceabilityApi.md#serviceability_check) | **GET** /c/api/pin-codes/json/ | Check pincode serviceability



## serviceability_check

> models::DelhiveryServiceabilityResponse serviceability_check(filter_codes, dt, st)
Check pincode serviceability

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**filter_codes** | Option<**String**> | Comma-separated pincode filter. |  |
**dt** | Option<**String**> |  |  |
**st** | Option<**String**> |  |  |

### Return type

[**models::DelhiveryServiceabilityResponse**](DelhiveryServiceabilityResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

