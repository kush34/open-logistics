# \ShipmentsApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**shipments_label**](ShipmentsApi.md#shipments_label) | **GET** /api/p/packing_slip | Generate a packing slip / label



## shipments_label

> models::DelhiveryPackingSlipResponse shipments_label(wbns, pdf)
Generate a packing slip / label

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**wbns** | **String** | Waybill number(s). | [required] |
**pdf** | Option<**String**> |  |  |

### Return type

[**models::DelhiveryPackingSlipResponse**](DelhiveryPackingSlipResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

