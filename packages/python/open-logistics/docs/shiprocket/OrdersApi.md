# open_logistics.shiprocket.OrdersApi

All URIs are relative to *https://apiv2.shiprocket.in/v1/external*

Method | HTTP request | Description
------------- | ------------- | -------------
[**orders_cancel**](OrdersApi.md#orders_cancel) | **POST** /orders/cancel | Cancel orders
[**orders_create**](OrdersApi.md#orders_create) | **POST** /orders/create/adhoc | Create a single ad-hoc order
[**orders_get**](OrdersApi.md#orders_get) | **GET** /orders/show/{orderId} | Get one order
[**orders_list**](OrdersApi.md#orders_list) | **GET** /orders | List orders


# **orders_cancel**
> MessageResponse orders_cancel(cancel_orders_payload)

Cancel orders

### Example

* Bearer Authentication (bearerAuth):

```python
import os
import open_logistics.shiprocket
from open_logistics.shiprocket.models.cancel_orders_payload import CancelOrdersPayload
from open_logistics.shiprocket.models.message_response import MessageResponse
from open_logistics.shiprocket.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://apiv2.shiprocket.in/v1/external
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.shiprocket.Configuration(
    host = "https://apiv2.shiprocket.in/v1/external"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = open_logistics.shiprocket.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with open_logistics.shiprocket.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.shiprocket.OrdersApi(api_client)
    cancel_orders_payload = open_logistics.shiprocket.CancelOrdersPayload() # CancelOrdersPayload | 

    try:
        # Cancel orders
        api_response = api_instance.orders_cancel(cancel_orders_payload)
        print("The response of OrdersApi->orders_cancel:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_cancel: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cancel_orders_payload** | [**CancelOrdersPayload**](CancelOrdersPayload.md)|  | 

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

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
> OrderResponse orders_create(create_order_payload)

Create a single ad-hoc order

### Example

* Bearer Authentication (bearerAuth):

```python
import os
import open_logistics.shiprocket
from open_logistics.shiprocket.models.create_order_payload import CreateOrderPayload
from open_logistics.shiprocket.models.order_response import OrderResponse
from open_logistics.shiprocket.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://apiv2.shiprocket.in/v1/external
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.shiprocket.Configuration(
    host = "https://apiv2.shiprocket.in/v1/external"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = open_logistics.shiprocket.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with open_logistics.shiprocket.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.shiprocket.OrdersApi(api_client)
    create_order_payload = open_logistics.shiprocket.CreateOrderPayload() # CreateOrderPayload | 

    try:
        # Create a single ad-hoc order
        api_response = api_instance.orders_create(create_order_payload)
        print("The response of OrdersApi->orders_create:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_create: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_order_payload** | [**CreateOrderPayload**](CreateOrderPayload.md)|  | 

### Return type

[**OrderResponse**](OrderResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Order created |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **orders_get**
> OrderResponse orders_get(order_id)

Get one order

### Example

* Bearer Authentication (bearerAuth):

```python
import os
import open_logistics.shiprocket
from open_logistics.shiprocket.models.order_response import OrderResponse
from open_logistics.shiprocket.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://apiv2.shiprocket.in/v1/external
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.shiprocket.Configuration(
    host = "https://apiv2.shiprocket.in/v1/external"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = open_logistics.shiprocket.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with open_logistics.shiprocket.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.shiprocket.OrdersApi(api_client)
    order_id = 56 # int | 

    try:
        # Get one order
        api_response = api_instance.orders_get(order_id)
        print("The response of OrdersApi->orders_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **order_id** | **int**|  | 

### Return type

[**OrderResponse**](OrderResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Order |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **orders_list**
> PaginatedOrders orders_list(page=page, per_page=per_page)

List orders

### Example

* Bearer Authentication (bearerAuth):

```python
import os
import open_logistics.shiprocket
from open_logistics.shiprocket.models.paginated_orders import PaginatedOrders
from open_logistics.shiprocket.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://apiv2.shiprocket.in/v1/external
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.shiprocket.Configuration(
    host = "https://apiv2.shiprocket.in/v1/external"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization: bearerAuth
configuration = open_logistics.shiprocket.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with open_logistics.shiprocket.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.shiprocket.OrdersApi(api_client)
    page = 1 # int |  (optional) (default to 1)
    per_page = 20 # int |  (optional) (default to 20)

    try:
        # List orders
        api_response = api_instance.orders_list(page=page, per_page=per_page)
        print("The response of OrdersApi->orders_list:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_list: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int**|  | [optional] [default to 1]
 **per_page** | **int**|  | [optional] [default to 20]

### Return type

[**PaginatedOrders**](PaginatedOrders.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Paginated orders |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

