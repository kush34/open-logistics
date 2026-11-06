# open_logistics_shiprocket.ShipmentsApi

All URIs are relative to *https://apiv2.shiprocket.in/v1/external*

Method | HTTP request | Description
------------- | ------------- | -------------
[**shipments_generate_label**](ShipmentsApi.md#shipments_generate_label) | **POST** /courier/generate/label | Generate labels
[**shipments_generate_manifest**](ShipmentsApi.md#shipments_generate_manifest) | **POST** /manifests/generate | Generate a manifest
[**shipments_generate_pickup**](ShipmentsApi.md#shipments_generate_pickup) | **POST** /courier/generate/pickup | Generate a pickup request
[**shipments_print_manifest**](ShipmentsApi.md#shipments_print_manifest) | **POST** /manifests/print | Print a manifest for one order


# **shipments_generate_label**
> GenerateLabelResponse shipments_generate_label(generate_label_payload)

Generate labels

### Example

* Bearer Authentication (bearerAuth):

```python
import open_logistics_shiprocket
from open_logistics_shiprocket.models.generate_label_payload import GenerateLabelPayload
from open_logistics_shiprocket.models.generate_label_response import GenerateLabelResponse
from open_logistics_shiprocket.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://apiv2.shiprocket.in/v1/external
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics_shiprocket.Configuration(
    host = "https://apiv2.shiprocket.in/v1/external"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = open_logistics_shiprocket.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with open_logistics_shiprocket.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics_shiprocket.ShipmentsApi(api_client)
    generate_label_payload = open_logistics_shiprocket.GenerateLabelPayload() # GenerateLabelPayload | 

    try:
        # Generate labels
        api_response = api_instance.shipments_generate_label(generate_label_payload)
        print("The response of ShipmentsApi->shipments_generate_label:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ShipmentsApi->shipments_generate_label: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **generate_label_payload** | [**GenerateLabelPayload**](GenerateLabelPayload.md)|  | 

### Return type

[**GenerateLabelResponse**](GenerateLabelResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Label generated |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **shipments_generate_manifest**
> ManifestResponse shipments_generate_manifest(generate_manifest_payload)

Generate a manifest

### Example

* Bearer Authentication (bearerAuth):

```python
import open_logistics_shiprocket
from open_logistics_shiprocket.models.generate_manifest_payload import GenerateManifestPayload
from open_logistics_shiprocket.models.manifest_response import ManifestResponse
from open_logistics_shiprocket.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://apiv2.shiprocket.in/v1/external
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics_shiprocket.Configuration(
    host = "https://apiv2.shiprocket.in/v1/external"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = open_logistics_shiprocket.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with open_logistics_shiprocket.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics_shiprocket.ShipmentsApi(api_client)
    generate_manifest_payload = open_logistics_shiprocket.GenerateManifestPayload() # GenerateManifestPayload | 

    try:
        # Generate a manifest
        api_response = api_instance.shipments_generate_manifest(generate_manifest_payload)
        print("The response of ShipmentsApi->shipments_generate_manifest:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ShipmentsApi->shipments_generate_manifest: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **generate_manifest_payload** | [**GenerateManifestPayload**](GenerateManifestPayload.md)|  | 

### Return type

[**ManifestResponse**](ManifestResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Manifest generated |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **shipments_generate_pickup**
> GeneratePickupResponse shipments_generate_pickup(generate_pickup_payload)

Generate a pickup request

### Example

* Bearer Authentication (bearerAuth):

```python
import open_logistics_shiprocket
from open_logistics_shiprocket.models.generate_pickup_payload import GeneratePickupPayload
from open_logistics_shiprocket.models.generate_pickup_response import GeneratePickupResponse
from open_logistics_shiprocket.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://apiv2.shiprocket.in/v1/external
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics_shiprocket.Configuration(
    host = "https://apiv2.shiprocket.in/v1/external"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = open_logistics_shiprocket.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with open_logistics_shiprocket.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics_shiprocket.ShipmentsApi(api_client)
    generate_pickup_payload = open_logistics_shiprocket.GeneratePickupPayload() # GeneratePickupPayload | 

    try:
        # Generate a pickup request
        api_response = api_instance.shipments_generate_pickup(generate_pickup_payload)
        print("The response of ShipmentsApi->shipments_generate_pickup:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ShipmentsApi->shipments_generate_pickup: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **generate_pickup_payload** | [**GeneratePickupPayload**](GeneratePickupPayload.md)|  | 

### Return type

[**GeneratePickupResponse**](GeneratePickupResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Pickup generated |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **shipments_print_manifest**
> ManifestResponse shipments_print_manifest(print_manifest_payload)

Print a manifest for one order

### Example

* Bearer Authentication (bearerAuth):

```python
import open_logistics_shiprocket
from open_logistics_shiprocket.models.manifest_response import ManifestResponse
from open_logistics_shiprocket.models.print_manifest_payload import PrintManifestPayload
from open_logistics_shiprocket.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://apiv2.shiprocket.in/v1/external
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics_shiprocket.Configuration(
    host = "https://apiv2.shiprocket.in/v1/external"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = open_logistics_shiprocket.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with open_logistics_shiprocket.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics_shiprocket.ShipmentsApi(api_client)
    print_manifest_payload = open_logistics_shiprocket.PrintManifestPayload() # PrintManifestPayload | 

    try:
        # Print a manifest for one order
        api_response = api_instance.shipments_print_manifest(print_manifest_payload)
        print("The response of ShipmentsApi->shipments_print_manifest:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ShipmentsApi->shipments_print_manifest: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **print_manifest_payload** | [**PrintManifestPayload**](PrintManifestPayload.md)|  | 

### Return type

[**ManifestResponse**](ManifestResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Manifest URL |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

