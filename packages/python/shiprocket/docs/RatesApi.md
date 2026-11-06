# open_logistics_shiprocket.RatesApi

All URIs are relative to *https://apiv2.shiprocket.in/v1/external*

Method | HTTP request | Description
------------- | ------------- | -------------
[**courier_serviceability**](RatesApi.md#courier_serviceability) | **GET** /courier/serviceability | Check serviceability (also used for rate calculation)


# **courier_serviceability**
> Dict[str, object] courier_serviceability(pickup_postcode, delivery_postcode, weight, cod=cod, order_id=order_id)

Check serviceability (also used for rate calculation)

### Example

* Bearer Authentication (bearerAuth):

```python
import os
import open_logistics_shiprocket
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
    api_instance = open_logistics_shiprocket.RatesApi(api_client)
    pickup_postcode = 'pickup_postcode_example' # str | 
    delivery_postcode = 'delivery_postcode_example' # str | 
    weight = 3.4 # float | 
    cod = 56 # int |  (optional)
    order_id = 'order_id_example' # str |  (optional)

    try:
        # Check serviceability (also used for rate calculation)
        api_response = api_instance.courier_serviceability(pickup_postcode, delivery_postcode, weight, cod=cod, order_id=order_id)
        print("The response of RatesApi->courier_serviceability:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling RatesApi->courier_serviceability: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pickup_postcode** | **str**|  | 
 **delivery_postcode** | **str**|  | 
 **weight** | **float**|  | 
 **cod** | **int**|  | [optional] 
 **order_id** | **str**|  | [optional] 

### Return type

**Dict[str, object]**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Serviceability result (provider-defined shape) |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

