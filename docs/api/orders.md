# Orders API

## `orders.create(payload)`

Creates an ad hoc order.

Returns: `OrderResponse`

## `orders.list(page?, perPage?)`

Lists orders with pagination.

Returns: `PaginatedResponse<OrderResponse>`

## `orders.get(orderId)`

Fetches a single order by numeric id.

Returns: `OrderResponse`

## `orders.cancel(ids)`

Cancels one or more orders.

Returns: `{ message: string }`

## Types

See `CreateOrderPayload`, `OrderItem`, `OrderResponse`, and `PaginatedResponse` in `src/types/index.ts`.
