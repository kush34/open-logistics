# open_logistics.ithink.RatesApi

All URIs are relative to *https://my.ithinklogistics.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**rates_calculate**](RatesApi.md#rates_calculate) | **POST** /api_v3/rate/check.json | Calculate courier rates


# **rates_calculate**
> IthinkRateResponse rates_calculate(ithink_rate_request)

Calculate courier rates

### Example


```python
import open_logistics.ithink
from open_logistics.ithink.models.ithink_rate_request import IthinkRateRequest
from open_logistics.ithink.models.ithink_rate_response import IthinkRateResponse
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
    api_instance = open_logistics.ithink.RatesApi(api_client)
    ithink_rate_request = open_logistics.ithink.IthinkRateRequest() # IthinkRateRequest | 

    try:
        # Calculate courier rates
        api_response = api_instance.rates_calculate(ithink_rate_request)
        print("The response of RatesApi->rates_calculate:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RatesApi->rates_calculate: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ithink_rate_request** | [**IthinkRateRequest**](IthinkRateRequest.md)|  | 

### Return type

[**IthinkRateResponse**](IthinkRateResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Rate estimates |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

