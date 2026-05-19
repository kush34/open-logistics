// ─── Auth ────────────────────────────────────────────────────────────────────
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  first_name: string;
  last_name: string;
  company_id: number;
}

// ─── Orders ──────────────────────────────────────────────────────────────────
export interface CreateOrderPayload {
  order_id: string;
  order_date: string; // YYYY-MM-DD HH:mm
  pickup_location: string;
  billing_customer_name: string;
  billing_last_name?: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  order_items: OrderItem[];
  payment_method: "prepaid" | "COD";
  sub_total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
}

export interface OrderItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount?: number;
  tax?: number;
  hsn?: string;
}

export interface OrderResponse {
  order_id: number;
  shipment_id: number;
  status: string;
  status_code: number;
  onboarding_completed_now: boolean;
  awb_code: string | null;
  courier_company_id: number | null;
  courier_name: string | null;
}

// ─── Courier ─────────────────────────────────────────────────────────────────
export interface ServiceabilityParams {
  pickup_postcode: string;
  delivery_postcode: string;
  weight: number;
  cod?: 0 | 1;
}

export interface AssignAWBPayload {
  shipment_id: string;
  courier_id: string;
}

// ─── Shipments ───────────────────────────────────────────────────────────────
export interface GeneratePickupPayload {
  shipment_id: number[];
}

export interface GenerateLabelPayload {
  shipment_id: number[];
}

export interface GenerateManifestPayload {
  shipment_id: number[];
}

// ─── Tracking ────────────────────────────────────────────────────────────────
export interface TrackByAWBResponse {
  tracking_data: {
    track_status: number;
    shipment_status: number;
    shipment_track: TrackEvent[];
    shipment_track_activities: TrackActivity[];
    track_url: string;
  };
}

export interface TrackEvent {
  id: number;
  awb_code: string;
  courier_company_id: number;
  shipment_id: number;
  order_id: number;
  pickup_date: string | null;
  delivered_date: string | null;
  weight: string;
  packages: number;
  current_status: string;
  delivered_to: string;
  destination: string;
  consignee_name: string;
  origin: string;
  courier_agent_details: string | null;
}

export interface TrackActivity {
  date: string;
  activity: string;
  location: string;
  "sr-status": string;
  "sr-status-label": string;
}

// ─── Rates ───────────────────────────────────────────────────────────────────
export interface RateCheckParams {
  pickup_postcode: string;
  delivery_postcode: string;
  weight: number;
  cod?: 0 | 1;
  order_id?: string;
}

// ─── Generic ─────────────────────────────────────────────────────────────────
export interface ShiprocketError {
  status_code: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
}
