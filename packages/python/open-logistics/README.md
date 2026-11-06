# open-logistics

Python client for the Shiprocket and Delhivery APIs.

## Install

```bash
pip install open-logistics
```

## Modules

- `open_logistics.shiprocket` — Shiprocket APIs and models (docs in `docs/shiprocket/`)
- `open_logistics.delhivery` — Delhivery APIs and models (docs in `docs/delhivery/`)

```python
from open_logistics.shiprocket import ApiClient, AuthApi, AuthCredentials, Configuration, OrdersApi

configuration = Configuration(host="https://apiv2.shiprocket.in/v1/external")
with ApiClient(configuration) as api_client:
    auth = AuthApi(api_client).auth_login(AuthCredentials(email=..., password=...))
    configuration.access_token = auth.token
    order = OrdersApi(api_client).orders_create(payload)
```
