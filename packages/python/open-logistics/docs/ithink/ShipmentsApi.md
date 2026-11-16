# open_logistics.ithink.ShipmentsApi

All URIs are relative to *https://my.ithinklogistics.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**shipments_label**](ShipmentsApi.md#shipments_label) | **POST** /api_v3/shipping/label.json | Generate labels for up to 100 waybills
[**shipments_manifest**](ShipmentsApi.md#shipments_manifest) | **POST** /api_v3/shipping/manifest.json | Generate a manifest


# **shipments_label**
> IthinkDocumentResponse shipments_label(ithink_label_request)

Generate labels for up to 100 waybills

### Example


```python
import open_logistics.ithink
from open_logistics.ithink.models.ithink_document_response import IthinkDocumentResponse
from open_logistics.ithink.models.ithink_label_request import IthinkLabelRequest
from open_logistics.ithink.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://my.ithinklogistics.com
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.ithink.Configuration(
    host = "https://my.ithinklogistics.com"
)


# Enter a context with an instance of the API client
with open_logistics.ithink.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.ithink.ShipmentsApi(api_client)
    ithink_label_request = open_logistics.ithink.IthinkLabelRequest() # IthinkLabelRequest | 

    try:
        # Generate labels for up to 100 waybills
        api_response = api_instance.shipments_label(ithink_label_request)
        print("The response of ShipmentsApi->shipments_label:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ShipmentsApi->shipments_label: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ithink_label_request** | [**IthinkLabelRequest**](IthinkLabelRequest.md)|  | 

### Return type

[**IthinkDocumentResponse**](IthinkDocumentResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Label document |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **shipments_manifest**
> IthinkDocumentResponse shipments_manifest(ithink_manifest_request)

Generate a manifest

### Example


```python
import open_logistics.ithink
from open_logistics.ithink.models.ithink_document_response import IthinkDocumentResponse
from open_logistics.ithink.models.ithink_manifest_request import IthinkManifestRequest
from open_logistics.ithink.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://my.ithinklogistics.com
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.ithink.Configuration(
    host = "https://my.ithinklogistics.com"
)


# Enter a context with an instance of the API client
with open_logistics.ithink.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.ithink.ShipmentsApi(api_client)
    ithink_manifest_request = open_logistics.ithink.IthinkManifestRequest() # IthinkManifestRequest | 

    try:
        # Generate a manifest
        api_response = api_instance.shipments_manifest(ithink_manifest_request)
        print("The response of ShipmentsApi->shipments_manifest:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ShipmentsApi->shipments_manifest: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ithink_manifest_request** | [**IthinkManifestRequest**](IthinkManifestRequest.md)|  | 

### Return type

[**IthinkDocumentResponse**](IthinkDocumentResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Manifest document |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

