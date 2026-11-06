# open_logistics.delhivery.TrackingApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**tracking_fetch**](TrackingApi.md#tracking_fetch) | **GET** /api/v1/packages/json/ | Fetch tracking by waybill or order reference


# **tracking_fetch**
> DelhiveryTrackingResponse tracking_fetch(waybill=waybill, ref_nos=ref_nos)

Fetch tracking by waybill or order reference

### Example

* Api Key Authentication (delhiveryToken):

```python
import os
import open_logistics.delhivery
from open_logistics.delhivery.models.delhivery_tracking_response import DelhiveryTrackingResponse
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
    api_instance = open_logistics.delhivery.TrackingApi(api_client)
    waybill = 'waybill_example' # str | One waybill, or a comma-separated list. (optional)
    ref_nos = 'ref_nos_example' # str | Order reference number. (optional)

    try:
        # Fetch tracking by waybill or order reference
        api_response = api_instance.tracking_fetch(waybill=waybill, ref_nos=ref_nos)
        print("The response of TrackingApi->tracking_fetch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TrackingApi->tracking_fetch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **waybill** | **str**| One waybill, or a comma-separated list. | [optional] 
 **ref_nos** | **str**| Order reference number. | [optional] 

### Return type

[**DelhiveryTrackingResponse**](DelhiveryTrackingResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tracking data |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

