# open_logistics.delhivery.WaybillsApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**waybills_fetch**](WaybillsApi.md#waybills_fetch) | **GET** /waybill/api/fetch/json/ | Fetch a single waybill
[**waybills_fetch_bulk**](WaybillsApi.md#waybills_fetch_bulk) | **GET** /waybill/api/bulk/json/ | Fetch waybills in bulk


# **waybills_fetch**
> str waybills_fetch(cl=cl, client_name=client_name, token=token)

Fetch a single waybill

### Example

* Api Key Authentication (delhiveryToken):

```python
import os
import open_logistics.delhivery
from open_logistics.delhivery.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://track.delhivery.com
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.delhivery.Configuration(
    host = "https://track.delhivery.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: delhiveryToken
configuration.api_key['delhiveryToken'] = os.environ["API_KEY"]

# Set the required API key prefix
configuration.api_key_prefix['delhiveryToken'] = 'Token'

# Enter a context with an instance of the API client
with open_logistics.delhivery.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.delhivery.WaybillsApi(api_client)
    cl = 'cl_example' # str | Client code. Pass explicitly; generated clients do not read it from credentials. (optional)
    client_name = 'client_name_example' # str | Client name. Pass explicitly; generated clients do not read it from credentials. (optional)
    token = 'token_example' # str | API token. Pass explicitly; generated clients do not read it from credentials. (optional)

    try:
        # Fetch a single waybill
        api_response = api_instance.waybills_fetch(cl=cl, client_name=client_name, token=token)
        print("The response of WaybillsApi->waybills_fetch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WaybillsApi->waybills_fetch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cl** | **str**| Client code. Pass explicitly; generated clients do not read it from credentials. | [optional] 
 **client_name** | **str**| Client name. Pass explicitly; generated clients do not read it from credentials. | [optional] 
 **token** | **str**| API token. Pass explicitly; generated clients do not read it from credentials. | [optional] 

### Return type

**str**

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Waybill |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **waybills_fetch_bulk**
> str waybills_fetch_bulk(cl=cl, client_name=client_name, token=token, action=action, count=count, wbn=wbn)

Fetch waybills in bulk

### Example

* Api Key Authentication (delhiveryToken):

```python
import os
import open_logistics.delhivery
from open_logistics.delhivery.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://track.delhivery.com
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.delhivery.Configuration(
    host = "https://track.delhivery.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: delhiveryToken
configuration.api_key['delhiveryToken'] = os.environ["API_KEY"]

# Set the required API key prefix
configuration.api_key_prefix['delhiveryToken'] = 'Token'

# Enter a context with an instance of the API client
with open_logistics.delhivery.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.delhivery.WaybillsApi(api_client)
    cl = 'cl_example' # str | Client code. Pass explicitly; generated clients do not read it from credentials. (optional)
    client_name = 'client_name_example' # str | Client name. Pass explicitly; generated clients do not read it from credentials. (optional)
    token = 'token_example' # str | API token. Pass explicitly; generated clients do not read it from credentials. (optional)
    action = 'next' # str |  (optional) (default to 'next')
    count = 56 # int |  (optional)
    wbn = 'wbn_example' # str |  (optional)

    try:
        # Fetch waybills in bulk
        api_response = api_instance.waybills_fetch_bulk(cl=cl, client_name=client_name, token=token, action=action, count=count, wbn=wbn)
        print("The response of WaybillsApi->waybills_fetch_bulk:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling WaybillsApi->waybills_fetch_bulk: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cl** | **str**| Client code. Pass explicitly; generated clients do not read it from credentials. | [optional] 
 **client_name** | **str**| Client name. Pass explicitly; generated clients do not read it from credentials. | [optional] 
 **token** | **str**| API token. Pass explicitly; generated clients do not read it from credentials. | [optional] 
 **action** | **str**|  | [optional] [default to &#39;next&#39;]
 **count** | **int**|  | [optional] 
 **wbn** | **str**|  | [optional] 

### Return type

**str**

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Waybills |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

