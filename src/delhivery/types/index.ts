// ─── Auth ────────────────────────────────────────────────────────────────────
export interface DelhiveryCredentials {
  token: string;
  clientName: string;
  baseUrl?: string;
}

// ─── Common ──────────────────────────────────────────────────────────────────
export interface DelhiveryApiErrorBody {
  message?: string;
  error?: string;
  detail?: string;
  status_code?: number;
  errors?: Record<string, string[] | string>;
  [key: string]: unknown;
}

// ─── Orders / Shipments ──────────────────────────────────────────────────────
export interface DelhiveryPickupLocation {
  name: string;
}

export interface DelhiveryShipmentItem {
  name: string;
  quantity?: number;
  sku?: string;
  price?: number;
  hsn_code?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface DelhiveryShipmentPayload {
  order_id: string;
  waybill?: string;
  order_date?: string;
  client?: string;
  pickup_location: DelhiveryPickupLocation;
  package_type: "COD" | "Pre-paid" | "Pickup";
  payment_mode?: "COD" | "Pre-paid" | "Pickup";
  cod_amount?: number;
  name: string;
  add?: string;
  address?: string;
  phone: string;
  pin: string;
  city?: string;
  state?: string;
  country?: string;
  products_desc?: string;
  product_details?: string;
  shipment_length?: number;
  shipment_width?: number;
  shipment_height?: number;
  gm?: number;
  weight?: number;
  fragile_shipment?: boolean;
  ewaybill?: string;
  seller_gst_tin?: string;
  client_gst_tin?: string;
  consignee_gst_tin?: string;
  hsn_code?: string | string[];
  invoice_reference?: string;
  qc?: string | boolean;
  shipment?: DelhiveryShipmentItem[];
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | DelhiveryPickupLocation
    | DelhiveryShipmentItem[]
    | undefined;
}

export interface DelhiveryCreateOrderRequest {
  shipments: DelhiveryShipmentPayload[];
}

export interface DelhiveryOrderCreateResponse {
  success: boolean;
  message?: string | null;
  order_id: string | null;
  waybill: string | null;
  status: string | null;
  shipment_id: string | null;
  raw: unknown;
}

export interface DelhiveryOrderUpdatePayload {
  waybill: string;
  shipment_length?: number;
  shipment_width?: number;
  shipment_height?: number;
  cod?: number;
  gm?: number;
  name?: string;
  add?: string;
  phone?: string;
  product_details?: string;
  pt?: "COD" | "Pre-paid" | "Pickup";
}

export interface DelhiveryOrderUpdateResponse {
  success: boolean;
  message?: string | null;
  waybill: string | null;
  raw: unknown;
}

export interface DelhiveryCancelOrderPayload {
  waybill: string;
  cancellation: true;
}

export interface DelhiveryCancelOrderResponse {
  success: boolean;
  message?: string | null;
  waybill: string | null;
  raw: unknown;
}

// ─── Tracking ────────────────────────────────────────────────────────────────
export interface DelhiveryTrackingQuery {
  waybill?: string;
  ref_nos?: string;
}

export interface DelhiveryTrackingScan {
  scan_date?: string;
  scan_time?: string;
  status?: string;
  status_code?: string;
  location?: string;
  instructions?: string;
  remark?: string;
  [key: string]: unknown;
}

export interface DelhiveryTrackingResponse {
  waybills: string[];
  currentStatus: string | null;
  statusCode: string | null;
  scans: DelhiveryTrackingScan[];
  raw: unknown;
}

// ─── Serviceability ──────────────────────────────────────────────────────────
export interface DelhiveryServiceabilityQuery {
  filter_codes?: string | number;
  dt?: string;
  st?: string;
}

export interface DelhiveryPostalCodeServiceability {
  city?: string;
  cod?: string;
  inc?: string;
  district?: string;
  pin?: number;
  max_amount?: number;
  pre_paid?: string;
  cash?: string;
  state_code?: string;
  max_weight?: number;
  pickup?: string;
  repl?: string;
  covid_zone?: string | null;
  country_code?: string;
  is_oda?: string;
  remarks?: string;
}

export interface DelhiveryServiceabilityResponse {
  serviceable: boolean;
  prepaid: boolean;
  cod: boolean;
  pickup: boolean;
  remarks: string | null;
  delivery_codes: Array<{
    postal_code: DelhiveryPostalCodeServiceability;
  }>;
  raw: unknown;
}

// ─── Rates ───────────────────────────────────────────────────────────────────
export interface DelhiveryRateQuery {
  md: "E" | "S";
  cgm: number;
  o_pin?: number | string;
  d_pin?: number | string;
  ss: "Delivered" | "RTO" | "DTO";
  pt?: "Pre-paid" | "COD";
}

export interface DelhiveryRateResponse {
  totalAmount: number | null;
  grossAmount: number | null;
  taxAmount: number | null;
  currency: "INR";
  raw: unknown;
}

// ─── Waybills ────────────────────────────────────────────────────────────────
export interface DelhiveryWaybillFetchQuery {
  action?: "next" | "fetch";
  count?: number;
  wbn?: string;
}

export interface DelhiveryWaybillResponse {
  waybill: string | null;
  raw: unknown;
}

export interface DelhiveryBulkWaybillResponse {
  waybills: string[];
  raw: unknown;
}

// ─── Pickup Requests ─────────────────────────────────────────────────────────
export interface DelhiveryPickupRequestPayload {
  pickup_time: string;
  pickup_date: string;
  pickup_location: string;
  expected_package_count: number;
}

export interface DelhiveryPickupRequestResponse {
  pickup_id: string | null;
  message?: string | null;
  raw: unknown;
}

// ─── Labels ──────────────────────────────────────────────────────────────────
export interface DelhiveryPackingSlipResponse {
  waybill: string | null;
  pdfUrl: string | null;
  packagesFound: number | null;
  packages: unknown[] | null;
  raw: unknown;
}
