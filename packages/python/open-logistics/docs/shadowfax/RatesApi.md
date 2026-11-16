# open_logistics.shadowfax.RatesApi

All URIs are relative to *https://dale.shadowfax.in/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**rates_calculate**](RatesApi.md#rates_calculate) | **POST** /v1/clients/rate_calculator/ | Calculate a shipping rate


# **rates_calculate**
> ShadowfaxRateResponse rates_calculate(shadowfax_rate_request)

Calculate a shipping rate

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_rate_request import ShadowfaxRateRequest
from open_logistics.shadowfax.models.shadowfax_rate_response import ShadowfaxRateResponse
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
    api_instance = open_logistics.shadowfax.RatesApi(api_client)
    shadowfax_rate_request = open_logistics.shadowfax.ShadowfaxRateRequest() # ShadowfaxRateRequest | 

    try:
        # Calculate a shipping rate
        api_response = api_instance.rates_calculate(shadowfax_rate_request)
        print("The response of RatesApi->rates_calculate:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RatesApi->rates_calculate: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shadowfax_rate_request** | [**ShadowfaxRateRequest**](ShadowfaxRateRequest.md)|  | 

### Return type

[**ShadowfaxRateResponse**](ShadowfaxRateResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Rate estimate |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

