# open_logistics.ithink.OrdersApi

All URIs are relative to *https://my.ithinklogistics.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**orders_cancel**](OrdersApi.md#orders_cancel) | **POST** /api_v3/order/cancel.json | Cancel up to 100 orders
[**orders_create**](OrdersApi.md#orders_create) | **POST** /api_v3/order/add.json | Create orders (up to 10 shipments)


# **orders_cancel**
> IthinkCancelResponse orders_cancel(ithink_order_cancel_request)

Cancel up to 100 orders

### Example


```python
import open_logistics.ithink
from open_logistics.ithink.models.ithink_cancel_response import IthinkCancelResponse
from open_logistics.ithink.models.ithink_order_cancel_request import IthinkOrderCancelRequest
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
    api_instance = open_logistics.ithink.OrdersApi(api_client)
    ithink_order_cancel_request = open_logistics.ithink.IthinkOrderCancelRequest() # IthinkOrderCancelRequest | 

    try:
        # Cancel up to 100 orders
        api_response = api_instance.orders_cancel(ithink_order_cancel_request)
        print("The response of OrdersApi->orders_cancel:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_cancel: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ithink_order_cancel_request** | [**IthinkOrderCancelRequest**](IthinkOrderCancelRequest.md)|  | 

### Return type

[**IthinkCancelResponse**](IthinkCancelResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Cancellation result |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **orders_create**
> IthinkOrderCreateResponse orders_create(ithink_order_create_request)

Create orders (up to 10 shipments)

### Example


```python
import open_logistics.ithink
from open_logistics.ithink.models.ithink_order_create_request import IthinkOrderCreateRequest
from open_logistics.ithink.models.ithink_order_create_response import IthinkOrderCreateResponse
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
    api_instance = open_logistics.ithink.OrdersApi(api_client)
    ithink_order_create_request = open_logistics.ithink.IthinkOrderCreateRequest() # IthinkOrderCreateRequest | 

    try:
        # Create orders (up to 10 shipments)
        api_response = api_instance.orders_create(ithink_order_create_request)
        print("The response of OrdersApi->orders_create:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_create: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ithink_order_create_request** | [**IthinkOrderCreateRequest**](IthinkOrderCreateRequest.md)|  | 

### Return type

[**IthinkOrderCreateResponse**](IthinkOrderCreateResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Order creation result |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

