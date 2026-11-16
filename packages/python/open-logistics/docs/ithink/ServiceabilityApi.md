# open_logistics.ithink.ServiceabilityApi

All URIs are relative to *https://my.ithinklogistics.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**serviceability_check**](ServiceabilityApi.md#serviceability_check) | **POST** /api_v3/pincode/check.json | Check pincode serviceability


# **serviceability_check**
> IthinkServiceabilityResponse serviceability_check(ithink_serviceability_request)

Check pincode serviceability

### Example


```python
import open_logistics.ithink
from open_logistics.ithink.models.ithink_serviceability_request import IthinkServiceabilityRequest
from open_logistics.ithink.models.ithink_serviceability_response import IthinkServiceabilityResponse
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
    api_instance = open_logistics.ithink.ServiceabilityApi(api_client)
    ithink_serviceability_request = open_logistics.ithink.IthinkServiceabilityRequest() # IthinkServiceabilityRequest | 

    try:
        # Check pincode serviceability
        api_response = api_instance.serviceability_check(ithink_serviceability_request)
        print("The response of ServiceabilityApi->serviceability_check:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ServiceabilityApi->serviceability_check: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ithink_serviceability_request** | [**IthinkServiceabilityRequest**](IthinkServiceabilityRequest.md)|  | 

### Return type

[**IthinkServiceabilityResponse**](IthinkServiceabilityResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Serviceability result |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

