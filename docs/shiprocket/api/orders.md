# Shiprocket orders

## `ShiprocketClient#createOrder(payload)`

Creates an ad hoc order.

Returns: `OrderResponse`

## `ShiprocketClient#listOrders(page?, perPage?)`

Lists orders with pagination.

Returns: `PaginatedResponse<OrderResponse>`

## `ShiprocketClient#getOrder(orderId)`

Fetches a single order by numeric id.

Returns: `OrderResponse`

## `ShiprocketClient#cancelOrders(ids)`

Cancels one or more orders.

Returns: `{ message: string }`

## Types

See `CreateOrderPayload`, `OrderItem`, `OrderResponse`, and `PaginatedResponse` in `src/shiprocket/types/index.ts`.
