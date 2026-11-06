# open_logistics.delhivery.RatesApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**rates_calculate**](RatesApi.md#rates_calculate) | **GET** /api/kinko/v1/invoice/charges/.json | Calculate shipping charges


# **rates_calculate**
> List[DelhiveryRateResponseInner] rates_calculate(md, cgm, ss, o_pin=o_pin, d_pin=d_pin, pt=pt)

Calculate shipping charges

### Example

* Api Key Authentication (delhiveryToken):

```python
import os
import open_logistics.delhivery
from open_logistics.delhivery.models.delhivery_rate_response_inner import DelhiveryRateResponseInner
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
    api_instance = open_logistics.delhivery.RatesApi(api_client)
    md = 'md_example' # str | 
    cgm = 3.4 # float | 
    ss = 'ss_example' # str | 
    o_pin = 'o_pin_example' # str |  (optional)
    d_pin = 'd_pin_example' # str |  (optional)
    pt = 'pt_example' # str |  (optional)

    try:
        # Calculate shipping charges
        api_response = api_instance.rates_calculate(md, cgm, ss, o_pin=o_pin, d_pin=d_pin, pt=pt)
        print("The response of RatesApi->rates_calculate:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RatesApi->rates_calculate: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **md** | **str**|  | 
 **cgm** | **float**|  | 
 **ss** | **str**|  | 
 **o_pin** | **str**|  | [optional] 
 **d_pin** | **str**|  | [optional] 
 **pt** | **str**|  | [optional] 

### Return type

[**List[DelhiveryRateResponseInner]**](DelhiveryRateResponseInner.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Charges |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

