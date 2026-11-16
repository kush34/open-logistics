# open_logistics.shadowfax.TrackingApi

All URIs are relative to *https://dale.shadowfax.in/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**tracking_bulk**](TrackingApi.md#tracking_bulk) | **POST** /v4/clients/bulk_track/ | Track up to 50 AWBs
[**tracking_fetch**](TrackingApi.md#tracking_fetch) | **GET** /v4/clients/orders/{awb_number}/track/ | Track one order by AWB


# **tracking_bulk**
> ShadowfaxBulkTrackingResponse tracking_bulk(shadowfax_bulk_tracking_payload)

Track up to 50 AWBs

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_bulk_tracking_payload import ShadowfaxBulkTrackingPayload
from open_logistics.shadowfax.models.shadowfax_bulk_tracking_response import ShadowfaxBulkTrackingResponse
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
    api_instance = open_logistics.shadowfax.TrackingApi(api_client)
    shadowfax_bulk_tracking_payload = open_logistics.shadowfax.ShadowfaxBulkTrackingPayload() # ShadowfaxBulkTrackingPayload | 

    try:
        # Track up to 50 AWBs
        api_response = api_instance.tracking_bulk(shadowfax_bulk_tracking_payload)
        print("The response of TrackingApi->tracking_bulk:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TrackingApi->tracking_bulk: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shadowfax_bulk_tracking_payload** | [**ShadowfaxBulkTrackingPayload**](ShadowfaxBulkTrackingPayload.md)|  | 

### Return type

[**ShadowfaxBulkTrackingResponse**](ShadowfaxBulkTrackingResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tracking data |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tracking_fetch**
> ShadowfaxTrackingResponse tracking_fetch(awb_number)

Track one order by AWB

### Example

* Api Key Authentication (shadowfaxToken):

```python
import os
import open_logistics.shadowfax
from open_logistics.shadowfax.models.shadowfax_tracking_response import ShadowfaxTrackingResponse
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
    api_instance = open_logistics.shadowfax.TrackingApi(api_client)
    awb_number = 'awb_number_example' # str | 

    try:
        # Track one order by AWB
        api_response = api_instance.tracking_fetch(awb_number)
        print("The response of TrackingApi->tracking_fetch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TrackingApi->tracking_fetch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **awb_number** | **str**|  | 

### Return type

[**ShadowfaxTrackingResponse**](ShadowfaxTrackingResponse.md)

### Authorization

[shadowfaxToken](../README.md#shadowfaxToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tracking data |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

