"""Round-trip tests for the generated Python clients.

Runs against a local HTTP server, so it exercises real request building,
auth headers, serialization, and response parsing. No provider credentials
and no network access beyond 127.0.0.1.
"""

import json
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit

from open_logistics.delhivery import (
    ApiClient as DelhiveryApiClient,
    Configuration as DelhiveryConfiguration,
    OrdersApi as DelhiveryOrdersApi,
    RatesApi as DelhiveryRatesApi,
    ServiceabilityApi as DelhiveryServiceabilityApi,
    TrackingApi as DelhiveryTrackingApi,
    WaybillsApi as DelhiveryWaybillsApi,
)
from open_logistics.ithink import (
    ApiClient as IthinkApiClient,
    Configuration as IthinkConfiguration,
    IthinkOrderCreateData,
    IthinkOrderCreateRequest,
    IthinkProduct,
    IthinkShipmentPayload,
    IthinkTrackingRequest,
    IthinkTrackingRequestData,
    OrdersApi as IthinkOrdersApi,
    TrackingApi as IthinkTrackingApi,
)
from open_logistics.shadowfax import (
    ApiClient as ShadowfaxApiClient,
    Configuration as ShadowfaxConfiguration,
    OrdersApi as ShadowfaxOrdersApi,
    ServiceabilityApi as ShadowfaxServiceabilityApi,
    ShadowfaxCreateOrderPayload,
    ShadowfaxCustomerDetails,
    ShadowfaxOrderInfo,
    ShadowfaxPickupAddress,
    ShadowfaxReturnAddress,
    ShadowfaxSkuItem,
    TrackingApi as ShadowfaxTrackingApi,
)
from open_logistics.shiprocket import (
    ApiClient as ShiprocketApiClient,
    AuthApi,
    AuthCredentials,
    Configuration as ShiprocketConfiguration,
    CreateOrderPayload,
    OrderItem,
    OrdersApi,
    TrackingApi,
)

ROUTES = {
    "/auth/login": {
        "token": "mock-token",
        "email": "a@b.c",
        "first_name": "A",
        "last_name": "B",
        "company_id": 1,
    },
    "/orders/create/adhoc": {
        "order_id": 123,
        "shipment_id": 456,
        "status": "NEW",
        "status_code": 1,
        "onboarding_completed_now": False,
        "awb_code": None,
        "courier_company_id": None,
        "courier_name": None,
    },
    "/courier/track/awb/ABC": {
        "tracking_data": {
            "track_status": 1,
            "shipment_status": 1,
            "shipment_track": [],
            "shipment_track_activities": [],
            "track_url": "https://example.test/track",
        }
    },
    "/api/cmu/create.json": {
        "success": True,
        "rmk": "",
        "upload_wbn": "W1",
    },
    "/api/v1/packages/json/": {
        "ShipmentData": [
            {
                "Shipment": {
                    "AWB": "W1",
                    "Status": {
                        "Status": "In Transit",
                        "StatusType": "UD",
                        "StatusDateTime": "2026-01-01T10:00:00",
                    },
                }
            }
        ]
    },
    "/c/api/pin-codes/json/": {
        "delivery_codes": [
            {
                "postal_code": {
                    "pin": 400001,
                    "pre_paid": "Y",
                    "cod": "Y",
                    "pickup": "Y",
                    "city": "Mumbai",
                    "remarks": "",
                }
            }
        ]
    },
    "/api/kinko/v1/invoice/charges/.json": [
        {
            "total_amount": 47.2,
            "gross_amount": 40,
            "zone": "C",
            "charged_weight": 0,
            "tax_data": {"SGST": 3.6, "CGST": 3.6},
        }
    ],
    "/waybill/api/fetch/json/": "W9",
    "/api_v3/order/add.json": {
        "status": "success",
        "data": {"1": {"waybill": "AWB1", "refnum": "O1", "status": "success"}},
    },
    "/api_v3/order/track.json": {
        "status": "success",
        "status_code": "200",
        "data": {"AWB1": {"current_status": "In Transit"}},
    },
    "/v3/clients/orders/": {
        "message": "Success",
        "data": {"awb_number": "SF1", "client_order_id": "FWD-1"},
    },
    "/v4/clients/orders/SF1/track/": {
        "order_details": {"awb_number": "SF1", "status": "IN_TRANSIT"}
    },
    "/v1/clients/serviceability/": [
        {"code": "400001", "services": ["forward"]}
    ],
}


class RecordingHandler(BaseHTTPRequestHandler):
    requests = []

    def _record_and_reply(self):
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length).decode() if length else ""
        path = urlsplit(self.path).path
        RecordingHandler.requests.append(
            {
                "method": self.command,
                "url": self.path,
                "path": path,
                "headers": {key.lower(): value for key, value in self.headers.items()},
                "body": body,
            }
        )

        data = json.dumps(ROUTES.get(path, {})).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    do_GET = _record_and_reply
    do_POST = _record_and_reply

    def log_message(self, *args):
        pass


class GeneratedClientTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), RecordingHandler)
        cls.base = f"http://127.0.0.1:{cls.server.server_address[1]}"
        threading.Thread(target=cls.server.serve_forever, daemon=True).start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()

    def setUp(self):
        RecordingHandler.requests.clear()

    def test_shiprocket_auth_create_and_track(self):
        configuration = ShiprocketConfiguration(host=self.base)
        with ShiprocketApiClient(configuration) as api_client:
            auth = AuthApi(api_client).auth_login(
                AuthCredentials(email="a@b.c", password="pw")
            )
            configuration.access_token = auth.token

            order = OrdersApi(api_client).orders_create(
                CreateOrderPayload(
                    order_id="ORD-1",
                    order_date="2026-01-01 10:00",
                    pickup_location="Primary",
                    billing_customer_name="John",
                    billing_address="123 Street",
                    billing_city="Mumbai",
                    billing_pincode="400001",
                    billing_state="MH",
                    billing_country="India",
                    billing_email="john@example.com",
                    billing_phone="9999999999",
                    shipping_is_billing=True,
                    order_items=[
                        OrderItem(
                            name="Item", sku="SKU1", units=1, selling_price=500.0
                        )
                    ],
                    payment_method="prepaid",
                    sub_total=500.0,
                    length=10.0,
                    breadth=10.0,
                    height=10.0,
                    weight=0.5,
                )
            )
            tracking = TrackingApi(api_client).tracking_by_awb("ABC")

        self.assertEqual(order.order_id, 123)
        self.assertEqual(tracking.tracking_data.track_status, 1)

        auth_request, create_request, track_request = RecordingHandler.requests
        self.assertEqual(auth_request["path"], "/auth/login")
        self.assertEqual(auth_request["method"], "POST")
        self.assertEqual(create_request["path"], "/orders/create/adhoc")
        self.assertEqual(
            create_request["headers"]["authorization"], "Bearer mock-token"
        )
        self.assertIn('"order_id":"ORD-1"', create_request["body"].replace(" ", ""))
        self.assertEqual(track_request["path"], "/courier/track/awb/ABC")

    def test_delhivery_raw_responses(self):
        configuration = DelhiveryConfiguration(host=self.base)
        configuration.api_key["delhiveryToken"] = "delta-token"
        configuration.api_key_prefix["delhiveryToken"] = "Token"

        with DelhiveryApiClient(configuration) as api_client:
            order = DelhiveryOrdersApi(api_client).orders_create(
                "json",
                json.dumps(
                    {
                        "shipments": [
                            {
                                "order_id": "O1",
                                "pickup_location": {"name": "Warehouse"},
                                "package_type": "Pre-paid",
                                "name": "John",
                                "phone": "9999999999",
                                "pin": "400001",
                            }
                        ]
                    }
                ),
            )
            tracking = DelhiveryTrackingApi(api_client).tracking_fetch(waybill="W1")
            serviceability = DelhiveryServiceabilityApi(api_client).serviceability_check(
                filter_codes="400001"
            )
            rate = DelhiveryRatesApi(api_client).rates_calculate(
                md="S", cgm=0.5, ss="Delivered", o_pin="400001", d_pin="110001"
            )
            waybill = DelhiveryWaybillsApi(api_client).waybills_fetch()

        self.assertIs(order.success, True)
        self.assertEqual(order.upload_wbn, "W1")
        self.assertEqual(
            tracking.shipment_data[0]["Shipment"]["Status"]["Status"], "In Transit"
        )
        self.assertEqual(serviceability.delivery_codes[0].postal_code.pin, 400001)
        self.assertEqual(rate[0].total_amount, 47.2)
        self.assertEqual(waybill, "W9")

        (
            create_request,
            track_request,
            serviceability_request,
            rate_request,
            waybill_request,
        ) = RecordingHandler.requests
        self.assertEqual(create_request["path"], "/api/cmu/create.json")
        self.assertEqual(
            create_request["headers"]["authorization"], "Token delta-token"
        )
        self.assertIn("x-www-form-urlencoded", create_request["headers"]["content-type"])
        self.assertIn("format=json", create_request["body"])
        self.assertEqual(track_request["path"], "/api/v1/packages/json/")
        self.assertIn("waybill=W1", track_request["url"])
        self.assertIn("filter_codes=400001", serviceability_request["url"])
        self.assertIn("cgm=0.5", rate_request["url"])
        self.assertIn("d_pin=110001", rate_request["url"])
        self.assertEqual(waybill_request["path"], "/waybill/api/fetch/json/")


    def test_ithink_body_auth_and_raw_responses(self):
        configuration = IthinkConfiguration(host=self.base)
        with IthinkApiClient(configuration) as api_client:
            order = IthinkOrdersApi(api_client).orders_create(
                IthinkOrderCreateRequest(
                    data=IthinkOrderCreateData(
                        access_token="at",
                        secret_key="sk",
                        pickup_address_id="24",
                        shipments=[
                            IthinkShipmentPayload(
                                order="O1",
                                order_date="2026-01-01",
                                total_amount=999,
                                name="John",
                                add="Street",
                                pin="400001",
                                phone="9999999999",
                                billing_name="John",
                                billing_add="Street",
                                billing_pin="400001",
                                billing_phone="9999999999",
                                products=[
                                    IthinkProduct(
                                        product_name="Shoes",
                                        product_quantity=1,
                                        product_price=999,
                                    )
                                ],
                                shipment_length=10,
                                shipment_width=10,
                                shipment_height=5,
                                weight=0.5,
                                return_address_id="24",
                            )
                        ],
                    )
                )
            )
            tracking = IthinkTrackingApi(api_client).tracking_fetch(
                IthinkTrackingRequest(
                    data=IthinkTrackingRequestData(
                        access_token="at",
                        secret_key="sk",
                        awb_number_list="AWB1",
                    )
                )
            )

        self.assertEqual(order.data["1"]["waybill"], "AWB1")
        self.assertEqual(tracking.status_code, "200")
        self.assertEqual(tracking.data["AWB1"]["current_status"], "In Transit")

        create_request, track_request = RecordingHandler.requests
        self.assertEqual(create_request["path"], "/api_v3/order/add.json")
        body = json.loads(create_request["body"])
        self.assertEqual(body["data"]["access_token"], "at")
        self.assertEqual(body["data"]["secret_key"], "sk")
        self.assertEqual(body["data"]["shipments"][0]["order"], "O1")
        self.assertEqual(track_request["path"], "/api_v3/order/track.json")
        self.assertEqual(
            json.loads(track_request["body"])["data"]["awb_number_list"], "AWB1"
        )

    def test_shadowfax_token_auth_and_raw_responses(self):
        configuration = ShadowfaxConfiguration(host=self.base)
        configuration.api_key["shadowfaxToken"] = "sf-token"
        configuration.api_key_prefix["shadowfaxToken"] = "Token"

        with ShadowfaxApiClient(configuration) as api_client:
            order = ShadowfaxOrdersApi(api_client).orders_create(
                ShadowfaxCreateOrderPayload(
                    customer_details=ShadowfaxCustomerDetails(
                        name="John",
                        contact="9999999999",
                        address_line_1="Street",
                        city="Mumbai",
                        pincode="400001",
                    ),
                    order_details=ShadowfaxOrderInfo(
                        client_order_id="FWD-1",
                        product_value=1299,
                        payment_mode="prepaid",
                        cod_amount=0,
                    ),
                    pickup_details=ShadowfaxPickupAddress(
                        pickup_type="seller",
                        address_line_1="Street",
                        city="Mumbai",
                        pincode="400001",
                    ),
                    return_details=ShadowfaxReturnAddress(
                        return_type="seller",
                        address_line_1="Street",
                        pincode="400001",
                    ),
                    product_details=[
                        ShadowfaxSkuItem(
                            sku_name="Shoes", sku_id="SKU1", price=1299
                        )
                    ],
                )
            )
            tracking = ShadowfaxTrackingApi(api_client).tracking_fetch("SF1")
            serviceability = ShadowfaxServiceabilityApi(
                api_client
            ).serviceability_check("forward", pincodes="400001")

        self.assertEqual(order.data.awb_number, "SF1")
        self.assertEqual(tracking.order_details.awb_number, "SF1")
        self.assertEqual(serviceability[0].code, "400001")

        create_request, track_request, serviceability_request = (
            RecordingHandler.requests
        )
        self.assertEqual(create_request["path"], "/v3/clients/orders/")
        self.assertEqual(
            create_request["headers"]["authorization"], "Token sf-token"
        )
        self.assertEqual(
            json.loads(create_request["body"])["order_details"]["client_order_id"],
            "FWD-1",
        )
        self.assertEqual(
            track_request["path"], "/v4/clients/orders/SF1/track/"
        )
        self.assertEqual(
            serviceability_request["path"], "/v1/clients/serviceability/"
        )
        self.assertIn("service=forward", serviceability_request["url"])
        self.assertIn("pincodes=400001", serviceability_request["url"])


if __name__ == "__main__":
    unittest.main()
