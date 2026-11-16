# open_logistics.shadowfax.WaybillsApi

All URIs are relative to *https://dale.shadowfax.in/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**waybills_generate_pool**](WaybillsApi.md#waybills_generate_pool) | **POST** /v3/clients/generate_marketplace_awb/ | Top up the AWB pool
[**waybills_poll**](WaybillsApi.md#waybills_poll) | **GET** /v1/clients/awb/{request_id}/ | Poll an AWB request
[**waybills_request**](WaybillsApi.md#waybills_request) | **POST** /v1/clients/awb/ | Request always-fresh AWBs


# **waybills_generate_pool**
> ShadowfaxAwbPoolResponse waybills_generate_pool(shadowfax_awb_pool_request)

Top up the AWB pool

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_awb_pool_request import ShadowfaxAwbPoolRequest
from open_logistics.shadowfax.models.shadowfax_awb_pool_response import ShadowfaxAwbPoolResponse
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
    api_instance = open_logistics.shadowfax.WaybillsApi(api_client)
    shadowfax_awb_pool_request = open_logistics.shadowfax.ShadowfaxAwbPoolRequest() # ShadowfaxAwbPoolRequest | 

    try:
        # Top up the AWB pool
        api_response = api_instance.waybills_generate_pool(shadowfax_awb_pool_request)
        print("The response of WaybillsApi->waybills_generate_pool:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WaybillsApi->waybills_generate_pool: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shadowfax_awb_pool_request** | [**ShadowfaxAwbPoolRequest**](ShadowfaxAwbPoolRequest.md)|  | 

### Return type

[**ShadowfaxAwbPoolResponse**](ShadowfaxAwbPoolResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Pool AWBs |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **waybills_poll**
> ShadowfaxAwbResultResponse waybills_poll(request_id)

Poll an AWB request

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_awb_result_response import ShadowfaxAwbResultResponse
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
    api_instance = open_logistics.shadowfax.WaybillsApi(api_client)
    request_id = 56 # int | 

    try:
        # Poll an AWB request
        api_response = api_instance.waybills_poll(request_id)
        print("The response of WaybillsApi->waybills_poll:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WaybillsApi->waybills_poll: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request_id** | **int**|  | 

### Return type

[**ShadowfaxAwbResultResponse**](ShadowfaxAwbResultResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | AWB request result |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **waybills_request**
> ShadowfaxAwbRequestResponse waybills_request(shadowfax_awb_request_payload)

Request always-fresh AWBs

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_awb_request_payload import ShadowfaxAwbRequestPayload
from open_logistics.shadowfax.models.shadowfax_awb_request_response import ShadowfaxAwbRequestResponse
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
    api_instance = open_logistics.shadowfax.WaybillsApi(api_client)
    shadowfax_awb_request_payload = open_logistics.shadowfax.ShadowfaxAwbRequestPayload() # ShadowfaxAwbRequestPayload | 

    try:
        # Request always-fresh AWBs
        api_response = api_instance.waybills_request(shadowfax_awb_request_payload)
        print("The response of WaybillsApi->waybills_request:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WaybillsApi->waybills_request: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shadowfax_awb_request_payload** | [**ShadowfaxAwbRequestPayload**](ShadowfaxAwbRequestPayload.md)|  | 

### Return type

[**ShadowfaxAwbRequestResponse**](ShadowfaxAwbRequestResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | AWB request accepted |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

