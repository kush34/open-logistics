# \RatesApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**rates_calculate**](RatesApi.md#rates_calculate) | **GET** /api/kinko/v1/invoice/charges/.json | Calculate shipping charges



## rates_calculate

> Vec<models::DelhiveryRateResponseInner> rates_calculate(md, cgm, ss, o_pin, d_pin, pt)
Calculate shipping charges

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**md** | **String** |  | [required] |
**cgm** | **f64** |  | [required] |
**ss** | **String** |  | [required] |
**o_pin** | Option<**String**> |  |  |
**d_pin** | Option<**String**> |  |  |
**pt** | Option<**String**> |  |  |

### Return type

[**Vec<models::DelhiveryRateResponseInner>**](DelhiveryRateResponse_inner.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

