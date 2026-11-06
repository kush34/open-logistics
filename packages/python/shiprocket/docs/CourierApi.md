# open_logistics_shiprocket.CourierApi

All URIs are relative to *https://apiv2.shiprocket.in/v1/external*

Method | HTTP request | Description
------------- | ------------- | -------------
[**courier_assign_awb**](CourierApi.md#courier_assign_awb) | **POST** /courier/assign/awb | Assign an AWB to a shipment
[**courier_list**](CourierApi.md#courier_list) | **GET** /courier/courierListWithCounts | List couriers with counts
[**courier_serviceability**](CourierApi.md#courier_serviceability) | **GET** /courier/serviceability | Check serviceability (also used for rate calculation)


# **courier_assign_awb**
> AssignAWBResponse courier_assign_awb(assign_awb_payload)

Assign an AWB to a shipment

### Example

* Bearer Authentication (bearerAuth):

```python
import os
import open_logistics_shiprocket
from open_logistics_shiprocket.models.assign_awb_payload import AssignAWBPayload
from open_logistics_shiprocket.models.assign_awb_response import AssignAWBResponse
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
    api_instance = open_logistics_shiprocket.CourierApi(api_client)
    assign_awb_payload = open_logistics_shiprocket.AssignAWBPayload() # AssignAWBPayload | 

    try:
        # Assign an AWB to a shipment
        api_response = api_instance.courier_assign_awb(assign_awb_payload)
        print("The response of CourierApi->courier_assign_awb:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CourierApi->courier_assign_awb: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assign_awb_payload** | [**AssignAWBPayload**](AssignAWBPayload.md)|  | 

### Return type

[**AssignAWBResponse**](AssignAWBResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | AWB assigned |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **courier_list**
> Dict[str, object] courier_list()

List couriers with counts

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
    api_instance = open_logistics_shiprocket.CourierApi(api_client)

    try:
        # List couriers with counts
        api_response = api_instance.courier_list()
        print("The response of CourierApi->courier_list:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CourierApi->courier_list: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

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
**200** | Courier list (provider-defined shape) |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

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
    api_instance = open_logistics_shiprocket.CourierApi(api_client)
    pickup_postcode = 'pickup_postcode_example' # str | 
    delivery_postcode = 'delivery_postcode_example' # str | 
    weight = 3.4 # float | 
    cod = 56 # int |  (optional)
    order_id = 'order_id_example' # str |  (optional)

    try:
        # Check serviceability (also used for rate calculation)
        api_response = api_instance.courier_serviceability(pickup_postcode, delivery_postcode, weight, cod=cod, order_id=order_id)
        print("The response of CourierApi->courier_serviceability:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CourierApi->courier_serviceability: %s\n" % e)
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

