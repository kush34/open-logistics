# open_logistics_delhivery.PickupRequestsApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**pickup_requests_create**](PickupRequestsApi.md#pickup_requests_create) | **POST** /fm/request/new/ | Create a pickup request


# **pickup_requests_create**
> DelhiveryPickupRequestResponse pickup_requests_create(delhivery_pickup_request_payload)

Create a pickup request

### Example

* Api Key Authentication (delhiveryToken):

```python
import os
import open_logistics_delhivery
from open_logistics_delhivery.models.delhivery_pickup_request_payload import DelhiveryPickupRequestPayload
from open_logistics_delhivery.models.delhivery_pickup_request_response import DelhiveryPickupRequestResponse
from open_logistics_delhivery.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://track.delhivery.com
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics_delhivery.Configuration(
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
with open_logistics_delhivery.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics_delhivery.PickupRequestsApi(api_client)
    delhivery_pickup_request_payload = open_logistics_delhivery.DelhiveryPickupRequestPayload() # DelhiveryPickupRequestPayload | 

    try:
        # Create a pickup request
        api_response = api_instance.pickup_requests_create(delhivery_pickup_request_payload)
        print("The response of PickupRequestsApi->pickup_requests_create:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling PickupRequestsApi->pickup_requests_create: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **delhivery_pickup_request_payload** | [**DelhiveryPickupRequestPayload**](DelhiveryPickupRequestPayload.md)|  | 

### Return type

[**DelhiveryPickupRequestResponse**](DelhiveryPickupRequestResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Pickup request result |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

