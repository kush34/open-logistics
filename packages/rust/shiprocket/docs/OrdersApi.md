# \OrdersApi

All URIs are relative to *https://apiv2.shiprocket.in/v1/external*

Method | HTTP request | Description
------------- | ------------- | -------------
[**orders_cancel**](OrdersApi.md#orders_cancel) | **POST** /orders/cancel | Cancel orders
[**orders_create**](OrdersApi.md#orders_create) | **POST** /orders/create/adhoc | Create a single ad-hoc order
[**orders_get**](OrdersApi.md#orders_get) | **GET** /orders/show/{orderId} | Get one order
[**orders_list**](OrdersApi.md#orders_list) | **GET** /orders | List orders



## orders_cancel

> models::MessageResponse orders_cancel(cancel_orders_payload)
Cancel orders

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**cancel_orders_payload** | [**CancelOrdersPayload**](CancelOrdersPayload.md) |  | [required] |

### Return type

[**models::MessageResponse**](MessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## orders_create

> models::OrderResponse orders_create(create_order_payload)
Create a single ad-hoc order

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**create_order_payload** | [**CreateOrderPayload**](CreateOrderPayload.md) |  | [required] |

### Return type

[**models::OrderResponse**](OrderResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## orders_get

> models::OrderResponse orders_get(order_id)
Get one order

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**order_id** | **i32** |  | [required] |

### Return type

[**models::OrderResponse**](OrderResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## orders_list

> models::PaginatedOrders orders_list(page, per_page)
List orders

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**page** | Option<**i32**> |  |  |[default to 1]
**per_page** | Option<**i32**> |  |  |[default to 20]

### Return type

[**models::PaginatedOrders**](PaginatedOrders.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

