# open_logistics.delhivery.OrdersApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**orders_create**](OrdersApi.md#orders_create) | **POST** /api/cmu/create.json | Create a shipment/order
[**orders_edit**](OrdersApi.md#orders_edit) | **POST** /api/p/edit | Update or cancel a shipment


# **orders_create**
> DelhiveryOrderCreateResponse orders_create(format, data)

Create a shipment/order

Form-encoded endpoint. `data` is a JSON string of the form
`{"shipments": [DelhiveryShipmentPayload]}`.


### Example

* Api Key Authentication (delhiveryToken):

```python
import os
import open_logistics.delhivery
from open_logistics.delhivery.models.delhivery_order_create_response import DelhiveryOrderCreateResponse
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
    api_instance = open_logistics.delhivery.OrdersApi(api_client)
    format = 'json' # str |  (default to 'json')
    data = 'data_example' # str | JSON-encoded object with a `shipments` array.

    try:
        # Create a shipment/order
        api_response = api_instance.orders_create(format, data)
        print("The response of OrdersApi->orders_create:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_create: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **format** | **str**|  | [default to &#39;json&#39;]
 **data** | **str**| JSON-encoded object with a &#x60;shipments&#x60; array. | 

### Return type

[**DelhiveryOrderCreateResponse**](DelhiveryOrderCreateResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Order created |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **orders_edit**
> DelhiveryOrderEditResponse orders_edit(delhivery_order_edit_payload)

Update or cancel a shipment

Send an update payload to change shipment details, or
`{waybill, cancellation: true}` to cancel.


### Example

* Api Key Authentication (delhiveryToken):

```python
import os
import open_logistics.delhivery
from open_logistics.delhivery.models.delhivery_order_edit_payload import DelhiveryOrderEditPayload
from open_logistics.delhivery.models.delhivery_order_edit_response import DelhiveryOrderEditResponse
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
    api_instance = open_logistics.delhivery.OrdersApi(api_client)
    delhivery_order_edit_payload = open_logistics.delhivery.DelhiveryOrderEditPayload() # DelhiveryOrderEditPayload | 

    try:
        # Update or cancel a shipment
        api_response = api_instance.orders_edit(delhivery_order_edit_payload)
        print("The response of OrdersApi->orders_edit:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling OrdersApi->orders_edit: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **delhivery_order_edit_payload** | [**DelhiveryOrderEditPayload**](DelhiveryOrderEditPayload.md)|  | 

### Return type

[**DelhiveryOrderEditResponse**](DelhiveryOrderEditResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Edit result |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

