# open_logistics.shadowfax.ServiceabilityApi

All URIs are relative to *https://dale.shadowfax.in/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**serviceability_check**](ServiceabilityApi.md#serviceability_check) | **GET** /v1/clients/serviceability/ | Check pincode serviceability


# **serviceability_check**
> List[ShadowfaxServiceabilityPincode] serviceability_check(service, pincodes=pincodes, page=page, count=count)

Check pincode serviceability

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_serviceability_pincode import ShadowfaxServiceabilityPincode
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
    api_instance = open_logistics.shadowfax.ServiceabilityApi(api_client)
    service = 'service_example' # str | 
    pincodes = 'pincodes_example' # str | Comma-separated pincodes. (optional)
    page = 56 # int |  (optional)
    count = 56 # int |  (optional)

    try:
        # Check pincode serviceability
        api_response = api_instance.serviceability_check(service, pincodes=pincodes, page=page, count=count)
        print("The response of ServiceabilityApi->serviceability_check:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ServiceabilityApi->serviceability_check: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **service** | **str**|  | 
 **pincodes** | **str**| Comma-separated pincodes. | [optional] 
 **page** | **int**|  | [optional] 
 **count** | **int**|  | [optional] 

### Return type

[**List[ShadowfaxServiceabilityPincode]**](ShadowfaxServiceabilityPincode.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Serviceable pincodes |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

