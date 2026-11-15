// ─── Auth ────────────────────────────────────────────────────────────────────
export interface ShadowfaxCredentials {
  token: string;
  /**
   * Full API base including the `/api` segment, for example
   * `https://dale.staging.shadowfax.in/api`.
   */
  baseUrl?: string;
}

// ─── Common ──────────────────────────────────────────────────────────────────
export interface ShadowfaxApiErrorBody {
  message?: string;
  error?: string;
  detail?: string;
  responseMsg?: string;
  responseCode?: number;
  errorCode?: string;
  status?: string;
  errors?: unknown;
  [key: string]: unknown;
}

// ─── Orders ──────────────────────────────────────────────────────────────────
export type ShadowfaxOrderType =
  | "marketplace"
  | "warehouse"
  | "d2d"
  | "hyperlocal";

export interface ShadowfaxCustomerDetails {
  name: string;
  contact: string;
  address_line_1: string;
  city: string;
  pincode: number | string;
  address2?: string;
  alternate_contact?: string;
  state?: string;
  latitude?: string;
  longitude?: string;
  location_accuracy?: "L" | "H" | "G";
  location_type?: "commercial" | "residential";
}

export interface ShadowfaxOrderInfo {
  client_order_id: string;
  product_value: number;
  payment_mode: "prepaid" | "cod";
  cod_amount: number;
  awb_number?: string;
  actual_weight?: number;
  volumetric_weight?: number;
  promised_delivery_date?: string;
  total_amount?: number;
  eway_bill?: string;
  order_service?: string;
  shopify_order_id?: string;
  woocommerce_order_id?: string;
  fulfillment_order_id?: string;
  order_identifier?: "premium" | "express" | "regular" | "economy";
  delivery_instructions?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ShadowfaxPickupAddress {
  pickup_type: "seller" | "origin" | "warehouse";
  address_line_1: string;
  city: string;
  pincode: number | string;
  name?: string;
  contact?: string;
  address_line_2?: string;
  pickup_slot?: string;
  pickup_date?: string;
  latitude?: string;
  longitude?: string;
  [key: string]: unknown;
}

export interface ShadowfaxReturnAddress {
  return_type: "seller" | "origin";
  address_line_1: string;
  pincode: number | string;
  name?: string;
  contact?: string;
  city?: string;
  email?: string;
  latitude?: string;
  longitude?: string;
  [key: string]: unknown;
}

export interface ShadowfaxSellerDetails {
  seller_name?: string;
  seller_address?: string;
  seller_state?: string;
  gstin_number?: string;
}

export interface ShadowfaxSkuItem {
  sku_name: string;
  sku_id: string;
  price: number;
  category?: string;
  hsn_code?: string;
  invoice_no?: string;
  brand?: string;
  seller_details?: ShadowfaxSellerDetails;
  taxes?: {
    cgst_amount?: number;
    sgst_amount?: number;
    igst_amount?: number;
    total_tax_value?: number;
  };
  additional_details?: {
    requires_extra_care?: boolean;
    type_extra_care?: string;
    product_id?: string;
    product_weight?: string;
    quantity?: number;
    mode?: "rail" | "air" | "surface";
    slot_type?: "slotted" | "all_day";
  };
}

export interface ShadowfaxCreateOrderPayload {
  customer_details: ShadowfaxCustomerDetails;
  order_details: ShadowfaxOrderInfo;
  pickup_details: ShadowfaxPickupAddress;
  return_details: ShadowfaxReturnAddress;
  product_details: ShadowfaxSkuItem[];
  order_type?: ShadowfaxOrderType;
}

export interface ShadowfaxOrderDetails {
  id?: number;
  client_name?: string;
  client_order_id?: string;
  awb_number?: string;
  product_value?: number;
  cod_amount?: number;
  payment_mode?: string;
  order_date?: string;
  promised_delivery_date?: string;
  status?: string;
  status_display?: string;
  pickup_details?: Record<string, unknown>;
  delivery_details?: Record<string, unknown>;
  product_details?: unknown[];
  eway_bill_number?: string | null;
  sort_code?: string;
  invoice_date?: string | null;
  [key: string]: unknown;
}

export interface ShadowfaxCreateOrderResponse {
  /** False when Shadowfax answers HTTP 200 with `message: "Failure"`. */
  success: boolean;
  message: string | null;
  awb_number: string | null;
  client_order_id: string | null;
  status: string | null;
  status_display: string | null;
  data: ShadowfaxOrderDetails | null;
  errors: unknown;
  raw: unknown;
}

export interface ShadowfaxOrderUpdatePayload {
  awb_number: string;
  delivery_details?: Record<string, unknown>;
  pickup_details?: Record<string, unknown>;
  return_details?: Record<string, unknown>;
  order_details?: Record<string, unknown>;
  status_update?: {
    status: "rto" | "rts" | "reopen_ndr";
    [key: string]: unknown;
  };
}

export interface ShadowfaxOrderUpdateResponse {
  success: boolean;
  message: string | null;
  raw: unknown;
}

export interface ShadowfaxCancelOrderResponse {
  success: boolean;
  message: string | null;
  request_id: string;
  responseCode: number | null;
  raw: unknown;
}

// ─── Tracking ────────────────────────────────────────────────────────────────
export interface ShadowfaxTrackingScan {
  created?: string;
  location?: string;
  status_id?: string;
  status?: string;
  remarks?: string;
  awb_number?: string;
  [key: string]: unknown;
}

export interface ShadowfaxTrackingResponse {
  awb_number: string;
  waybills: string[];
  currentStatus: string | null;
  statusCode: string | null;
  scans: ShadowfaxTrackingScan[];
  order_details: ShadowfaxOrderDetails | null;
  raw: unknown;
}

export interface ShadowfaxBulkTrackingResponse {
  results: ShadowfaxTrackingResponse[];
  raw: unknown;
}

// ─── Serviceability ──────────────────────────────────────────────────────────
export interface ShadowfaxServiceabilityQuery {
  service: string;
  pincodes?: string | number | Array<string | number>;
  page?: number;
  count?: number;
}

export interface ShadowfaxServiceabilityPincode {
  pincode: number | null;
  services: string[];
}

export interface ShadowfaxServiceabilityResponse {
  serviceable: boolean;
  pincodes: ShadowfaxServiceabilityPincode[];
  raw: unknown;
}

// ─── Rates ───────────────────────────────────────────────────────────────────
export interface ShadowfaxRateQuery {
  origin_pincode: number | string;
  destination_pincode: number | string;
  service: "forward" | "reverse" | "reverse_qc";
  weight?: number;
}

export interface ShadowfaxRateResponse {
  success: boolean;
  message: string | null;
  zone: string | null;
  shippingRate: number | null;
  taxAmount: number | null;
  totalAmount: number | null;
  currency: "INR";
  raw: unknown;
}

// ─── Labels and POD ──────────────────────────────────────────────────────────
export interface ShadowfaxLabelResponse {
  success: boolean;
  message: string | null;
  awb_number: string;
  labelUrl: string | null;
  raw: unknown;
}

export interface ShadowfaxPodDetails {
  recipient?: string;
  recipient_name?: string;
  recipient_contact?: string;
  /** An array of signature records, or a signature image URL string. */
  recipient_signature?: unknown[] | string;
  [key: string]: unknown;
}

export interface ShadowfaxPodResponse {
  message: string | null;
  pod_details: Record<string, ShadowfaxPodDetails>;
  raw: unknown;
}

// ─── AWBs ────────────────────────────────────────────────────────────────────
export interface ShadowfaxAwbPoolQuery {
  count?: number;
}

export interface ShadowfaxAwbPoolResponse {
  success: boolean;
  message: string | null;
  awb_numbers: string[];
  raw: unknown;
}

export interface ShadowfaxAwbRequestPayload {
  awb_count?: number;
  request_type?: "fwd" | "rev";
}

export interface ShadowfaxAwbRequestResponse {
  status: string | null;
  request_id: number | null;
  message: string | null;
  delay_time: number | null;
  raw: unknown;
}

export interface ShadowfaxAwbResultResponse {
  awb_numbers: string[];
  status: string | null;
  retry_flag: boolean;
  raw: unknown;
}
