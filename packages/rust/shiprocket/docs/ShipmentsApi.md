# \ShipmentsApi

All URIs are relative to *https://apiv2.shiprocket.in/v1/external*

Method | HTTP request | Description
------------- | ------------- | -------------
[**shipments_generate_label**](ShipmentsApi.md#shipments_generate_label) | **POST** /courier/generate/label | Generate labels
[**shipments_generate_manifest**](ShipmentsApi.md#shipments_generate_manifest) | **POST** /manifests/generate | Generate a manifest
[**shipments_generate_pickup**](ShipmentsApi.md#shipments_generate_pickup) | **POST** /courier/generate/pickup | Generate a pickup request
[**shipments_print_manifest**](ShipmentsApi.md#shipments_print_manifest) | **POST** /manifests/print | Print a manifest for one order



## shipments_generate_label

> models::GenerateLabelResponse shipments_generate_label(generate_label_payload)
Generate labels

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**generate_label_payload** | [**GenerateLabelPayload**](GenerateLabelPayload.md) |  | [required] |

### Return type

[**models::GenerateLabelResponse**](GenerateLabelResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## shipments_generate_manifest

> models::ManifestResponse shipments_generate_manifest(generate_manifest_payload)
Generate a manifest

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**generate_manifest_payload** | [**GenerateManifestPayload**](GenerateManifestPayload.md) |  | [required] |

### Return type

[**models::ManifestResponse**](ManifestResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## shipments_generate_pickup

> models::GeneratePickupResponse shipments_generate_pickup(generate_pickup_payload)
Generate a pickup request

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**generate_pickup_payload** | [**GeneratePickupPayload**](GeneratePickupPayload.md) |  | [required] |

### Return type

[**models::GeneratePickupResponse**](GeneratePickupResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## shipments_print_manifest

> models::ManifestResponse shipments_print_manifest(print_manifest_payload)
Print a manifest for one order

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**print_manifest_payload** | [**PrintManifestPayload**](PrintManifestPayload.md) |  | [required] |

### Return type

[**models::ManifestResponse**](ManifestResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

