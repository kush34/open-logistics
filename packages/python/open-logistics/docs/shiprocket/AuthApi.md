# open_logistics.shiprocket.AuthApi

All URIs are relative to *https://apiv2.shiprocket.in/v1/external*

Method | HTTP request | Description
------------- | ------------- | -------------
[**auth_login**](AuthApi.md#auth_login) | **POST** /auth/login | Authenticate and obtain a bearer token


# **auth_login**
> AuthResponse auth_login(auth_credentials)

Authenticate and obtain a bearer token

### Example


```python
import open_logistics.shiprocket
from open_logistics.shiprocket.models.auth_credentials import AuthCredentials
from open_logistics.shiprocket.models.auth_response import AuthResponse
from open_logistics.shiprocket.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://apiv2.shiprocket.in/v1/external
# See configuration.py for a list of all supported configuration parameters.
configuration = open_logistics.shiprocket.Configuration(
    host = "https://apiv2.shiprocket.in/v1/external"
)


# Enter a context with an instance of the API client
with open_logistics.shiprocket.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = open_logistics.shiprocket.AuthApi(api_client)
    auth_credentials = open_logistics.shiprocket.AuthCredentials() # AuthCredentials | 

    try:
        # Authenticate and obtain a bearer token
        api_response = api_instance.auth_login(auth_credentials)
        print("The response of AuthApi->auth_login:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AuthApi->auth_login: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **auth_credentials** | [**AuthCredentials**](AuthCredentials.md)|  | 

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Authenticated |  -  |
**0** | Provider error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

