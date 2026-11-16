# open_logistics.shadowfax.ShipmentsApi

All URIs are relative to *https://dale.shadowfax.in/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**shipments_label**](ShipmentsApi.md#shipments_label) | **POST** /client/generate_label/ | Generate a label
[**shipments_pod**](ShipmentsApi.md#shipments_pod) | **POST** /v1/clients/pod_details/ | Fetch proof of delivery for up to 100 AWBs


# **shipments_label**
> ShadowfaxLabelResponse shipments_label(shadowfax_label_request)

Generate a label

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_label_request import ShadowfaxLabelRequest
from open_logistics.shadowfax.models.shadowfax_label_response import ShadowfaxLabelResponse
from open_logistics.shadowfax.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://dale.shadowfax.in/api
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.shadowfax.Configuration(
    host = "https://dale.shadowfax.in/api"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: shadowfaxToken
configuration.api_key['shadowfaxToken'] = os.environ["API_KEY"]

# Set the required API key prefix
configuration.api_key_prefix['shadowfaxToken'] = 'Token'

# Enter a context with an instance of the API client
with open_logistics.shadowfax.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.shadowfax.ShipmentsApi(api_client)
    shadowfax_label_request = open_logistics.shadowfax.ShadowfaxLabelRequest() # ShadowfaxLabelRequest | 

    try:
        # Generate a label
        api_response = api_instance.shipments_label(shadowfax_label_request)
        print("The response of ShipmentsApi->shipments_label:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ShipmentsApi->shipments_label: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shadowfax_label_request** | [**ShadowfaxLabelRequest**](ShadowfaxLabelRequest.md)|  | 

### Return type

[**ShadowfaxLabelResponse**](ShadowfaxLabelResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Label document |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **shipments_pod**
> ShadowfaxPodResponse shipments_pod(shadowfax_pod_request)

Fetch proof of delivery for up to 100 AWBs

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_pod_request import ShadowfaxPodRequest
from open_logistics.shadowfax.models.shadowfax_pod_response import ShadowfaxPodResponse
from open_logistics.shadowfax.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://dale.shadowfax.in/api
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.shadowfax.Configuration(
    host = "https://dale.shadowfax.in/api"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: shadowfaxToken
configuration.api_key['shadowfaxToken'] = os.environ["API_KEY"]

# Set the required API key prefix
configuration.api_key_prefix['shadowfaxToken'] = 'Token'

# Enter a context with an instance of the API client
with open_logistics.shadowfax.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.shadowfax.ShipmentsApi(api_client)
    shadowfax_pod_request = open_logistics.shadowfax.ShadowfaxPodRequest() # ShadowfaxPodRequest | 

    try:
        # Fetch proof of delivery for up to 100 AWBs
        api_response = api_instance.shipments_pod(shadowfax_pod_request)
        print("The response of ShipmentsApi->shipments_pod:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ShipmentsApi->shipments_pod: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shadowfax_pod_request** | [**ShadowfaxPodRequest**](ShadowfaxPodRequest.md)|  | 

### Return type

[**ShadowfaxPodResponse**](ShadowfaxPodResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | POD details |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

