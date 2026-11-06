# \PickupRequestsApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**pickup_requests_create**](PickupRequestsApi.md#pickup_requests_create) | **POST** /fm/request/new/ | Create a pickup request



## pickup_requests_create

> models::DelhiveryPickupRequestResponse pickup_requests_create(delhivery_pickup_request_payload)
Create a pickup request

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**delhivery_pickup_request_payload** | [**DelhiveryPickupRequestPayload**](DelhiveryPickupRequestPayload.md) |  | [required] |

### Return type

[**models::DelhiveryPickupRequestResponse**](DelhiveryPickupRequestResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

