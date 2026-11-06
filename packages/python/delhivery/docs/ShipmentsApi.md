# open_logistics_delhivery.ShipmentsApi

All URIs are relative to *https://track.delhivery.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**shipments_label**](ShipmentsApi.md#shipments_label) | **GET** /api/p/packing_slip | Generate a packing slip / label


# **shipments_label**
> DelhiveryPackingSlipResponse shipments_label(wbns, pdf=pdf)

Generate a packing slip / label

### Example

* Api Key Authentication (delhiveryToken):

```python
import open_logistics_delhivery
from open_logistics_delhivery.models.delhivery_packing_slip_response import DelhiveryPackingSlipResponse
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

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['delhiveryToken'] = 'Bearer'

# Enter a context with an instance of the API client
with open_logistics_delhivery.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics_delhivery.ShipmentsApi(api_client)
    wbns = 'wbns_example' # str | Waybill number(s).
    pdf = 'pdf_example' # str |  (optional)

    try:
        # Generate a packing slip / label
        api_response = api_instance.shipments_label(wbns, pdf=pdf)
        print("The response of ShipmentsApi->shipments_label:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ShipmentsApi->shipments_label: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **wbns** | **str**| Waybill number(s). | 
 **pdf** | **str**|  | [optional] 

### Return type

[**DelhiveryPackingSlipResponse**](DelhiveryPackingSlipResponse.md)

### Authorization

[delhiveryToken](../README.md#delhiveryToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Packing slip |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

