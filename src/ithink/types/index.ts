// ─── Auth ────────────────────────────────────────────────────────────────────
export interface IthinkCredentials {
  accessToken: string;
  secretKey: string;
  baseUrl?: string;
}

// ─── Common ──────────────────────────────────────────────────────────────────
export interface IthinkApiErrorBody {
  message?: string;
  error?: string;
  detail?: string;
  html_message?: string;
  status?: string;
  status_code?: number;
  [key: string]: unknown;
}

// ─── Orders / Shipments ──────────────────────────────────────────────────────
export interface IthinkProduct {
  product_name: string;
  product_sku?: string;
  product_quantity: number | string;
  product_price: number | string;
  product_tax_rate?: number | string;
  product_hsn_code?: string;
  product_discount?: number | string;
  product_img_url?: string;
}

export interface IthinkShipmentPayload {
  order: string;
  waybill?: string;
  sub_order?: string;
  order_date: string;
  total_amount: number | string;
  name: string;
  company_name?: string;
  add: string;
  add2?: string;
  add3?: string;
  pin: number | string;
  city?: string;
  state?: string;
  country?: string;
  phone: number | string;
  alt_phone?: number | string;
  email?: string;
  is_billing_same_as_shipping?: "yes" | "no";
  billing_name: string;
  billing_company_name?: string;
  billing_add: string;
  billing_add2?: string;
  billing_add3?: string;
  billing_pin: number | string;
  billing_city?: string;
  billing_state?: string;
  billing_country?: string;
  billing_phone: number | string;
  billing_alt_phone?: number | string;
  billing_email?: string;
  products: IthinkProduct[];
  shipment_length: number | string;
  shipment_width: number | string;
  shipment_height: number | string;
  weight: number | string;
  shipping_charges?: number | string;
  giftwrap_charges?: number | string;
  transaction_charges?: number | string;
  total_discount?: number | string;
  first_attemp_discount?: number | string;
  cod_charges?: number | string;
  advance_amount?: number | string;
  cod_amount?: number | string;
  payment_mode?: "COD" | "Prepaid";
  reseller_name?: string;
  eway_bill_number?: string;
  gst_number?: string;
  what3words?: string;
  return_address_id: number | string;
  api_source?: number | string;
  store_id?: number | string;
}

export interface IthinkCreateOrderRequest {
  shipments: IthinkShipmentPayload[];
  pickup_address_id: number | string;
  logistics?: string;
  s_type?: string;
  order_type?: "forward" | "reverse";
}

export interface IthinkOrderShipmentResult {
  success: boolean;
  status: string | null;
  remark: string | null;
  waybill: string | null;
  order_id: string | null;
  logistic: string | null;
  tracking_url: string | null;
  raw: unknown;
}

export interface IthinkOrderCreateResponse {
  success: boolean;
  message: string | null;
  order_id: string | null;
  waybill: string | null;
  tracking_url: string | null;
  shipments: IthinkOrderShipmentResult[];
  raw: unknown;
}

export interface IthinkCancelOrderResponse {
  success: boolean;
  message: string | null;
  waybills: string[];
  raw: unknown;
}

// ─── Tracking ────────────────────────────────────────────────────────────────
export interface IthinkTrackingScan {
  status?: string;
  status_code?: string;
  scan_location?: string;
  remark?: string;
  scan_date_time?: string;
  status_reason?: string;
  [key: string]: unknown;
}

export interface IthinkTrackingShipment {
  awb: string;
  currentStatus: string | null;
  statusCode: string | null;
  courier: string | null;
  orderType: string | null;
  expectedDeliveryDate: string | null;
  scans: IthinkTrackingScan[];
  raw: unknown;
}

export interface IthinkTrackingResponse {
  waybills: string[];
  currentStatus: string | null;
  statusCode: string | null;
  scans: IthinkTrackingScan[];
  shipments: IthinkTrackingShipment[];
  raw: unknown;
}

// ─── Serviceability ──────────────────────────────────────────────────────────
export interface IthinkServiceabilityQuery {
  pincode: string | number;
}

export interface IthinkCourierServiceability {
  courier: string;
  prepaid: boolean;
  cod: boolean;
  pickup: boolean;
  district: string | null;
  state_code: string | null;
  sort_code: string | null;
  raw: unknown;
}

export interface IthinkServiceabilityResponse {
  pincode: string | null;
  serviceable: boolean;
  couriers: IthinkCourierServiceability[];
  raw: unknown;
}

// ─── Rates ───────────────────────────────────────────────────────────────────
export interface IthinkRateQuery {
  from_pincode: string | number;
  to_pincode?: string | number;
  shipping_length_cms?: number | string;
  shipping_width_cms?: number | string;
  shipping_height_cms?: number | string;
  shipping_weight_kg: number | string;
  order_type?: "forward" | "reverse";
  payment_method: "prepaid" | "cod";
  product_mrp: number | string;
}

export interface IthinkCourierRate {
  courier: string | null;
  serviceType: string | null;
  rate: number | null;
  prepaid: boolean;
  cod: boolean;
  pickup: boolean;
  reversePickup: boolean;
  zone: string | null;
  deliveryTat: string | null;
  raw: unknown;
}

export interface IthinkRateResponse {
  zone: string | null;
  expectedDeliveryDate: string | null;
  rates: IthinkCourierRate[];
  raw: unknown;
}

// ─── Labels / Manifest ───────────────────────────────────────────────────────
export type IthinkPageSize = "A4" | "A5" | "A6";

export interface IthinkDocumentResponse {
  success: boolean;
  message: string | null;
  url: string | null;
  raw: unknown;
}
