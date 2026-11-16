# open_logistics.ithink.TrackingApi

All URIs are relative to *https://my.ithinklogistics.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**tracking_fetch**](TrackingApi.md#tracking_fetch) | **POST** /api_v3/order/track.json | Track up to 10 waybills


# **tracking_fetch**
> IthinkTrackingResponse tracking_fetch(ithink_tracking_request)

Track up to 10 waybills

### Example


```python
import open_logistics.ithink
from open_logistics.ithink.models.ithink_tracking_request import IthinkTrackingRequest
from open_logistics.ithink.models.ithink_tracking_response import IthinkTrackingResponse
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
    api_instance = open_logistics.ithink.TrackingApi(api_client)
    ithink_tracking_request = open_logistics.ithink.IthinkTrackingRequest() # IthinkTrackingRequest | 

    try:
        # Track up to 10 waybills
        api_response = api_instance.tracking_fetch(ithink_tracking_request)
        print("The response of TrackingApi->tracking_fetch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TrackingApi->tracking_fetch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ithink_tracking_request** | [**IthinkTrackingRequest**](IthinkTrackingRequest.md)|  | 

### Return type

[**IthinkTrackingResponse**](IthinkTrackingResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tracking data |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

