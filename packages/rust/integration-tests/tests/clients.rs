//! Round-trip tests against a local HTTP server: real request building,
//! auth headers, serialization, and response parsing. No provider access.

use std::io::{BufRead, BufReader, Read, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::{Arc, Mutex};
use std::thread;

use open_logistics_shiprocket::apis::configuration::Configuration;
use open_logistics_shiprocket::apis::{auth_api, orders_api, tracking_api};
use open_logistics_shiprocket::models::create_order_payload::PaymentMethod;
use open_logistics_shiprocket::models::{AuthCredentials, CreateOrderPayload, OrderItem};

#[derive(Debug, Clone)]
struct Record {
    method: String,
    url: String,
    headers: String,
    body: String,
}

fn start_server() -> (u16, Arc<Mutex<Vec<Record>>>) {
    let listener = TcpListener::bind("127.0.0.1:0").unwrap();
    let port = listener.local_addr().unwrap().port();
    let records = Arc::new(Mutex::new(Vec::new()));
    let store = Arc::clone(&records);

    thread::spawn(move || {
        for stream in listener.incoming() {
            if let Ok(stream) = stream {
                let _ = handle(stream, &store);
            }
        }
    });

    (port, records)
}

fn handle(mut stream: TcpStream, store: &Arc<Mutex<Vec<Record>>>) -> std::io::Result<()> {
    let mut reader = BufReader::new(stream.try_clone()?);

    let mut request_line = String::new();
    reader.read_line(&mut request_line)?;
    let mut parts = request_line.split_whitespace();
    let method = parts.next().unwrap_or_default().to_string();
    let url = parts.next().unwrap_or_default().to_string();
    let path = url.split('?').next().unwrap_or_default();

    let mut content_length = 0usize;
    let mut headers = String::new();
    loop {
        let mut line = String::new();
        if reader.read_line(&mut line)? == 0 || line == "\r\n" {
            break;
        }
        if let Some(value) = line.to_ascii_lowercase().strip_prefix("content-length:") {
            content_length = value.trim().parse().unwrap_or(0);
        }
        headers.push_str(&line);
    }

    let mut body = vec![0u8; content_length];
    if content_length > 0 {
        reader.read_exact(&mut body)?;
    }

    store.lock().unwrap().push(Record {
        method,
        url: url.clone(),
        headers: headers.to_ascii_lowercase(),
        body: String::from_utf8_lossy(&body).to_string(),
    });

    let payload = match path {
        "/auth/login" => {
            r#"{"token":"mock-token","email":"a@b.c","first_name":"A","last_name":"B","company_id":1}"#
        }
        "/orders/create/adhoc" => {
            r#"{"order_id":123,"shipment_id":456,"status":"NEW","status_code":1,"onboarding_completed_now":false,"awb_code":null,"courier_company_id":null,"courier_name":null}"#
        }
        "/courier/track/awb/ABC" => {
            r#"{"tracking_data":{"track_status":1,"shipment_status":1,"shipment_track":[],"shipment_track_activities":[],"track_url":"https://example.test/track"}}"#
        }
        "/api/cmu/create.json" => {
            r#"{"success":true,"rmk":"","upload_wbn":"W1"}"#
        }
        "/api/v1/packages/json/" => {
            r#"{"ShipmentData":[{"Shipment":{"AWB":"W1","Status":{"Status":"In Transit","StatusType":"UD","StatusDateTime":"2026-01-01T10:00:00"}}}]}"#
        }
        "/c/api/pin-codes/json/" => {
            r#"{"delivery_codes":[{"postal_code":{"pin":400001,"pre_paid":"Y","cod":"Y","pickup":"Y","city":"Mumbai","remarks":""}}]}"#
        }
        "/api/kinko/v1/invoice/charges/.json" => {
            r#"[{"total_amount":47.2,"gross_amount":40,"zone":"C","charged_weight":0,"tax_data":{"SGST":3.6,"CGST":3.6}}]"#
        }
        "/waybill/api/fetch/json/" => r#""W9""#,
        _ => "{}",
    };

    let response = format!(
        "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}",
        payload.len(),
        payload
    );
    stream.write_all(response.as_bytes())?;
    stream.flush()
}

#[tokio::test]
async fn shiprocket_auth_create_and_track() {
    let (port, records) = start_server();
    let mut configuration = Configuration::default();
    configuration.base_path = format!("http://127.0.0.1:{port}");

    let auth = auth_api::auth_login(
        &configuration,
        AuthCredentials::new("a@b.c".to_string(), "pw".to_string()),
    )
    .await
    .unwrap();
    assert_eq!(auth.token, "mock-token");
    configuration.bearer_access_token = Some(auth.token);

    let payload = CreateOrderPayload::new(
        "ORD-1".to_string(),
        "2026-01-01 10:00".to_string(),
        "Primary".to_string(),
        "John".to_string(),
        "123 Street".to_string(),
        "Mumbai".to_string(),
        "400001".to_string(),
        "MH".to_string(),
        "India".to_string(),
        "john@example.com".to_string(),
        "9999999999".to_string(),
        true,
        vec![OrderItem::new("Item".to_string(), "SKU1".to_string(), 1, 500.0)],
        PaymentMethod::Prepaid,
        500.0,
        10.0,
        10.0,
        10.0,
        0.5,
    );

    let order = orders_api::orders_create(&configuration, payload).await.unwrap();
    assert_eq!(order.order_id, 123);

    let tracking = tracking_api::tracking_by_awb(&configuration, "ABC")
        .await
        .unwrap();
    assert_eq!(tracking.tracking_data.track_status, 1);

    let records = records.lock().unwrap();
    let create = records
        .iter()
        .find(|record| record.url == "/orders/create/adhoc")
        .unwrap();
    assert_eq!(create.method, "POST");
    assert!(create.headers.contains("authorization: bearer mock-token"));
    assert!(create.body.contains(r#""order_id":"ORD-1""#));
    assert!(records
        .iter()
        .any(|record| record.url == "/courier/track/awb/ABC"));
}

#[tokio::test]
async fn delhivery_raw_responses() {
    let (port, records) = start_server();
    let mut configuration =
        open_logistics_delhivery::apis::configuration::Configuration::default();
    configuration.base_path = format!("http://127.0.0.1:{port}");
    configuration.api_key = Some(
        open_logistics_delhivery::apis::configuration::ApiKey {
            prefix: Some("Token".to_string()),
            key: "delta-token".to_string(),
        },
    );

    let data = r#"{"shipments":[{"order_id":"O1"}]}"#;
    let order =
        open_logistics_delhivery::apis::orders_api::orders_create(&configuration, "json", data)
            .await
            .unwrap();
    assert_eq!(order.success, Some(true));
    assert_eq!(order.upload_wbn.as_deref(), Some("W1"));

    let tracking = open_logistics_delhivery::apis::tracking_api::tracking_fetch(
        &configuration,
        Some("W1"),
        None,
    )
    .await
    .unwrap();
    let shipment = &tracking.shipment_data.unwrap()[0];
    assert_eq!(shipment["Shipment"]["Status"]["Status"], "In Transit");

    let serviceability =
        open_logistics_delhivery::apis::serviceability_api::serviceability_check(
            &configuration,
            Some("400001"),
            None,
            None,
        )
        .await
        .unwrap();
    let delivery_code = &serviceability.delivery_codes.unwrap()[0];
    assert_eq!(delivery_code.postal_code.as_ref().unwrap().pin, Some(400001));

    let rate = open_logistics_delhivery::apis::rates_api::rates_calculate(
        &configuration,
        "S",
        0.5,
        "Delivered",
        Some("400001"),
        Some("110001"),
        None,
    )
    .await
    .unwrap();
    assert_eq!(rate[0].total_amount, Some(47.2));

    let waybill = open_logistics_delhivery::apis::waybills_api::waybills_fetch(
        &configuration,
        None,
        None,
        None,
    )
    .await
    .unwrap();
    assert_eq!(waybill, "W9");

    let records = records.lock().unwrap();
    let create = records
        .iter()
        .find(|record| record.url == "/api/cmu/create.json")
        .unwrap();
    assert_eq!(create.method, "POST");
    assert!(create.headers.contains("authorization: token delta-token"));
    assert!(create.headers.contains("application/x-www-form-urlencoded"));
    assert!(create.body.contains("format=json"));

    let track = records
        .iter()
        .find(|record| record.url.starts_with("/api/v1/packages/json/"))
        .unwrap();
    assert!(track.url.contains("waybill=W1"));

    let serviceability = records
        .iter()
        .find(|record| record.url.starts_with("/c/api/pin-codes/json/"))
        .unwrap();
    assert!(serviceability.url.contains("filter_codes=400001"));

    let rate = records
        .iter()
        .find(|record| record.url.starts_with("/api/kinko/v1/invoice/charges/.json"))
        .unwrap();
    assert!(rate.url.contains("cgm=0.5"));
    assert!(rate.url.contains("d_pin=110001"));

    assert!(records
        .iter()
        .any(|record| record.url == "/waybill/api/fetch/json/"));
}
