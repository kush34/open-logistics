# open_logistics.shadowfax.OrdersApi

All URIs are relative to *https://dale.shadowfax.in/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**orders_cancel**](OrdersApi.md#orders_cancel) | **POST** /v3/clients/orders/cancel/ | Cancel an order
[**orders_create**](OrdersApi.md#orders_create) | **POST** /v3/clients/orders/ | Create a forward order
[**orders_update**](OrdersApi.md#orders_update) | **POST** /v3/clients/order_update/ | Update an order


# **orders_cancel**
> ShadowfaxCancelOrderResponse orders_cancel(shadowfax_cancel_order_payload)

Cancel an order

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_cancel_order_payload import ShadowfaxCancelOrderPayload
from open_logistics.shadowfax.models.shadowfax_cancel_order_response import ShadowfaxCancelOrderResponse
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
    api_instance = open_logistics.shadowfax.OrdersApi(api_client)
    shadowfax_cancel_order_payload = open_logistics.shadowfax.ShadowfaxCancelOrderPayload() # ShadowfaxCancelOrderPayload | 

    try:
        # Cancel an order
        api_response = api_instance.orders_cancel(shadowfax_cancel_order_payload)
        print("The response of OrdersApi->orders_cancel:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_cancel: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shadowfax_cancel_order_payload** | [**ShadowfaxCancelOrderPayload**](ShadowfaxCancelOrderPayload.md)|  | 

### Return type

[**ShadowfaxCancelOrderResponse**](ShadowfaxCancelOrderResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

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
> ShadowfaxCreateOrderResponse orders_create(shadowfax_create_order_payload)

Create a forward order

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_create_order_payload import ShadowfaxCreateOrderPayload
from open_logistics.shadowfax.models.shadowfax_create_order_response import ShadowfaxCreateOrderResponse
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
    api_instance = open_logistics.shadowfax.OrdersApi(api_client)
    shadowfax_create_order_payload = open_logistics.shadowfax.ShadowfaxCreateOrderPayload() # ShadowfaxCreateOrderPayload | 

    try:
        # Create a forward order
        api_response = api_instance.orders_create(shadowfax_create_order_payload)
        print("The response of OrdersApi->orders_create:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_create: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shadowfax_create_order_payload** | [**ShadowfaxCreateOrderPayload**](ShadowfaxCreateOrderPayload.md)|  | 

### Return type

[**ShadowfaxCreateOrderResponse**](ShadowfaxCreateOrderResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Order creation result |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **orders_update**
> ShadowfaxOrderUpdateResponse orders_update(shadowfax_order_update_payload)

Update an order

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_order_update_payload import ShadowfaxOrderUpdatePayload
from open_logistics.shadowfax.models.shadowfax_order_update_response import ShadowfaxOrderUpdateResponse
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
    api_instance = open_logistics.shadowfax.OrdersApi(api_client)
    shadowfax_order_update_payload = open_logistics.shadowfax.ShadowfaxOrderUpdatePayload() # ShadowfaxOrderUpdatePayload | 

    try:
        # Update an order
        api_response = api_instance.orders_update(shadowfax_order_update_payload)
        print("The response of OrdersApi->orders_update:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_update: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shadowfax_order_update_payload** | [**ShadowfaxOrderUpdatePayload**](ShadowfaxOrderUpdatePayload.md)|  | 

### Return type

[**ShadowfaxOrderUpdateResponse**](ShadowfaxOrderUpdateResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Update result |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

