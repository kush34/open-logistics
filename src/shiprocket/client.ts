import type {
  AuthCredentials,
  AuthResponse,
  CreateOrderPayload,
  OrderResponse,
  PaginatedResponse,
  GeneratePickupPayload,
  GenerateLabelPayload,
  GenerateManifestPayload,
  TrackByAWBResponse,
  ServiceabilityParams,
  RateCheckParams,
  AssignAWBPayload,
  ShiprocketError,
} from "./types/index.js";

export const BASE_URL = "https://apiv2.shiprocket.in/v1/external";
const TOKEN_TTL_MS = 240 * 60 * 60 * 1000; // 10 days

export class ShiprocketClient {
  private token: string | null = null;
  private tokenExpiry: number = 0;

  constructor(private credentials: AuthCredentials) {}

  private async authenticate(): Promise<void> {
    if (this.token && Date.now() < this.tokenExpiry) return;

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.credentials),
    });

    if (!res.ok) {
      const err = (await res.json()) as ShiprocketError;
      throw new Error(`Auth failed: ${err.message}`);
    }

    const data = (await res.json()) as AuthResponse;
    this.token = data.token;
    this.tokenExpiry = Date.now() + TOKEN_TTL_MS;
  }

  async refreshToken(): Promise<void> {
    this.token = null;
    this.tokenExpiry = 0;
    await this.authenticate();
  }

  async request<T>(
    method: string,
    path: string,
    body?: object,
    params?: Record<string, string | number>
  ): Promise<T> {
    await this.authenticate();

    let url = `${BASE_URL}${path}`;
    if (params) {
      const qs = new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      );
      url += `?${qs}`;
    }

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.status === 401) {
      await this.refreshToken();
      return this.request<T>(method, path, body, params);
    }

    const data = await res.json();

    if (!res.ok) {
      const err = data as ShiprocketError;
      throw new ShiprocketAPIError(err.message, res.status, err.errors);
    }

    return data as T;
  }

  async getAccessToken(): Promise<string> {
    await this.authenticate();

    if (!this.token) {
      throw new Error("Authentication failed");
    }

    return this.token;
  }

  createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
    return this.request("POST", "/orders/create/adhoc", payload);
  }

  listOrders(page = 1, perPage = 20): Promise<PaginatedResponse<OrderResponse>> {
    return this.request("GET", "/orders", undefined, {
      page,
      per_page: perPage,
    });
  }

  getOrder(orderId: number): Promise<OrderResponse> {
    return this.request("GET", `/orders/show/${orderId}`);
  }

  cancelOrders(ids: number[]): Promise<{ message: string }> {
    return this.request("POST", "/orders/cancel", { ids });
  }

  generatePickup(
    payload: GeneratePickupPayload
  ): Promise<{ pickup_status: number; response: { data: { appointment_delivery_date: string } } }> {
    return this.request("POST", "/courier/generate/pickup", payload);
  }

  generateLabel(
    payload: GenerateLabelPayload
  ): Promise<{ label_created: number; url: string }> {
    return this.request("POST", "/courier/generate/label", payload);
  }

  generateManifest(
    payload: GenerateManifestPayload
  ): Promise<{ manifest_url: string }> {
    return this.request("POST", "/manifests/generate", payload);
  }

  printManifest(orderId: number): Promise<{ manifest_url: string }> {
    return this.request("POST", "/manifests/print", { order_ids: [orderId] });
  }

  trackByAWB(awbCode: string): Promise<TrackByAWBResponse> {
    return this.request("GET", `/courier/track/awb/${awbCode}`);
  }

  trackByShipmentId(shipmentId: number): Promise<TrackByAWBResponse> {
    return this.request("GET", `/courier/track/shipment/${shipmentId}`);
  }

  trackByOrderId(orderId: string): Promise<TrackByAWBResponse> {
    return this.request("GET", `/orders/track/${orderId}`);
  }

  checkServiceability(params: ServiceabilityParams): Promise<unknown> {
    return this.request("GET", "/courier/serviceability", undefined, params as unknown as Record<string, string | number>);
  }

  calculateRates(params: RateCheckParams): Promise<unknown> {
    return this.request("GET", "/courier/serviceability", undefined, params as unknown as Record<string, string | number>);
  }

  assignAWB(payload: AssignAWBPayload): Promise<{ awb_assign_status: number; response: { data: { awb_code: string; courier_name: string } } }> {
    return this.request("POST", "/courier/assign/awb", payload);
  }

  listCouriers(): Promise<unknown> {
    return this.request("GET", "/courier/courierListWithCounts");
  }
}

export class ShiprocketAPIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ShiprocketAPIError";
  }
}
