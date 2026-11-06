# open_logistics.shiprocket.TrackingApi

All URIs are relative to *https://apiv2.shiprocket.in/v1/external*

Method | HTTP request | Description
------------- | ------------- | -------------
[**tracking_by_awb**](TrackingApi.md#tracking_by_awb) | **GET** /courier/track/awb/{awb} | Track by AWB code
[**tracking_by_order**](TrackingApi.md#tracking_by_order) | **GET** /orders/track/{orderId} | Track by order ID
[**tracking_by_shipment**](TrackingApi.md#tracking_by_shipment) | **GET** /courier/track/shipment/{shipmentId} | Track by shipment ID


# **tracking_by_awb**
> TrackByAWBResponse tracking_by_awb(awb)

Track by AWB code

### Example

* Bearer Authentication (bearerAuth):

```python
import os
import open_logistics.shiprocket
from open_logistics.shiprocket.models.track_by_awb_response import TrackByAWBResponse
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
    api_instance = open_logistics.shiprocket.TrackingApi(api_client)
    awb = 'awb_example' # str | 

    try:
        # Track by AWB code
        api_response = api_instance.tracking_by_awb(awb)
        print("The response of TrackingApi->tracking_by_awb:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TrackingApi->tracking_by_awb: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **awb** | **str**|  | 

### Return type

[**TrackByAWBResponse**](TrackByAWBResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tracking data |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tracking_by_order**
> TrackByAWBResponse tracking_by_order(order_id)

Track by order ID

### Example

* Bearer Authentication (bearerAuth):

```python
import os
import open_logistics.shiprocket
from open_logistics.shiprocket.models.track_by_awb_response import TrackByAWBResponse
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
    api_instance = open_logistics.shiprocket.TrackingApi(api_client)
    order_id = 'order_id_example' # str | 

    try:
        # Track by order ID
        api_response = api_instance.tracking_by_order(order_id)
        print("The response of TrackingApi->tracking_by_order:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TrackingApi->tracking_by_order: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **order_id** | **str**|  | 

### Return type

[**TrackByAWBResponse**](TrackByAWBResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tracking data |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tracking_by_shipment**
> TrackByAWBResponse tracking_by_shipment(shipment_id)

Track by shipment ID

### Example

* Bearer Authentication (bearerAuth):

```python
import os
import open_logistics.shiprocket
from open_logistics.shiprocket.models.track_by_awb_response import TrackByAWBResponse
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
    api_instance = open_logistics.shiprocket.TrackingApi(api_client)
    shipment_id = 56 # int | 

    try:
        # Track by shipment ID
        api_response = api_instance.tracking_by_shipment(shipment_id)
        print("The response of TrackingApi->tracking_by_shipment:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TrackingApi->tracking_by_shipment: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shipment_id** | **int**|  | 

### Return type

[**TrackByAWBResponse**](TrackByAWBResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tracking data |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

