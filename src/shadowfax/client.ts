import type {
  ShadowfaxApiErrorBody,
  ShadowfaxAwbPoolQuery,
  ShadowfaxAwbPoolResponse,
  ShadowfaxAwbRequestPayload,
  ShadowfaxAwbRequestResponse,
  ShadowfaxAwbResultResponse,
  ShadowfaxBulkTrackingResponse,
  ShadowfaxCancelOrderResponse,
  ShadowfaxCreateOrderPayload,
  ShadowfaxCreateOrderResponse,
  ShadowfaxCredentials,
  ShadowfaxLabelResponse,
  ShadowfaxOrderDetails,
  ShadowfaxOrderUpdatePayload,
  ShadowfaxOrderUpdateResponse,
  ShadowfaxPodResponse,
  ShadowfaxRateQuery,
  ShadowfaxRateResponse,
  ShadowfaxServiceabilityQuery,
  ShadowfaxServiceabilityResponse,
  ShadowfaxTrackingResponse,
  ShadowfaxTrackingScan,
} from "./types/index.js";

export const BASE_URL = "https://dale.shadowfax.in/api";
export const STAGING_BASE_URL = "https://dale.staging.shadowfax.in/api";

export class ShadowfaxClient {
  public readonly token: string;
  public readonly baseUrl: string;

  constructor(credentials: ShadowfaxCredentials) {
    if (!credentials.token) {
      throw new Error("Shadowfax token is required");
    }

    this.token = credentials.token;
    this.baseUrl = (credentials.baseUrl ?? BASE_URL).replace(/\/+$/, "");
  }

  createOrder(
    payload: ShadowfaxCreateOrderPayload,
  ): Promise<ShadowfaxCreateOrderResponse> {
    return this.request<unknown>("POST", "/v3/clients/orders/", {
      body: payload,
    }).then((response) => this.mapCreateResponse(response));
  }

  updateOrder(
    payload: ShadowfaxOrderUpdatePayload,
  ): Promise<ShadowfaxOrderUpdateResponse> {
    return this.request<unknown>("POST", "/v3/clients/order_update/", {
      body: payload,
    }).then((response) => this.mapUpdateResponse(response));
  }

  cancelOrder(
    requestId: string,
    cancelRemarks?: string,
  ): Promise<ShadowfaxCancelOrderResponse> {
    return this.request<unknown>("POST", "/v3/clients/orders/cancel/", {
      body: {
        request_id: requestId,
        ...(cancelRemarks === undefined
          ? {}
          : { cancel_remarks: cancelRemarks }),
      },
    }).then((response) => this.mapCancelResponse(response, requestId));
  }

  trackByAwb(awbNumber: string): Promise<ShadowfaxTrackingResponse> {
    return this.request<unknown>(
      "GET",
      `/v4/clients/orders/${encodeURIComponent(awbNumber)}/track/`,
    ).then((response) => this.mapTrackingResponse(response, awbNumber));
  }

  trackBulk(awbNumbers: string[]): Promise<ShadowfaxBulkTrackingResponse> {
    return this.request<unknown>("POST", "/v4/clients/bulk_track/", {
      body: { awb_numbers: awbNumbers },
    }).then((response) => this.mapBulkTrackingResponse(response));
  }

  checkServiceability(
    params: ShadowfaxServiceabilityQuery,
  ): Promise<ShadowfaxServiceabilityResponse> {
    return this.request<unknown>("GET", "/v1/clients/serviceability/", {
      query: {
        service: params.service,
        pincodes: Array.isArray(params.pincodes)
          ? params.pincodes.length > 0
            ? params.pincodes.join(",")
            : undefined
          : params.pincodes,
        page: params.page,
        count: params.count,
      },
    }).then((response) => this.mapServiceabilityResponse(response));
  }

  calculateRate(params: ShadowfaxRateQuery): Promise<ShadowfaxRateResponse> {
    return this.request<unknown>("POST", "/v1/clients/rate_calculator/", {
      body: {
        origin_pincode: params.origin_pincode,
        destination_pincode: params.destination_pincode,
        service: params.service,
        weight: params.weight,
      },
    }).then((response) => this.mapRateResponse(response));
  }

  generateLabel(
    awbNumber: string,
    fileType: "pdf" | "prn" = "pdf",
  ): Promise<ShadowfaxLabelResponse> {
    return this.request<unknown>("POST", "/client/generate_label/", {
      body: { awb_number: awbNumber, file_type: fileType },
    }).then((response) => this.mapLabelResponse(response, awbNumber));
  }

  fetchPod(awbNumbers: string[]): Promise<ShadowfaxPodResponse> {
    return this.request<unknown>("POST", "/v1/clients/pod_details/", {
      body: { awb_numbers: awbNumbers },
    }).then((response) => this.mapPodResponse(response));
  }

  generateAwbs(
    params: ShadowfaxAwbPoolQuery = {},
  ): Promise<ShadowfaxAwbPoolResponse> {
    return this.request<unknown>(
      "POST",
      "/v3/clients/generate_marketplace_awb/",
      { body: { count: params.count } },
    ).then((response) => this.mapAwbPoolResponse(response));
  }

  requestAwbs(
    payload: ShadowfaxAwbRequestPayload = {},
  ): Promise<ShadowfaxAwbRequestResponse> {
    return this.request<unknown>("POST", "/v1/clients/awb/", {
      body: payload,
    }).then((response) => this.mapAwbRequestResponse(response));
  }

  pollAwbs(requestId: number): Promise<ShadowfaxAwbResultResponse> {
    return this.request<unknown>("GET", `/v1/clients/awb/${requestId}/`).then(
      (response) => this.mapAwbResultResponse(response),
    );
  }

  async request<T>(
    method: string,
    path: string,
    options: {
      query?: Record<string, string | number | boolean | undefined | null>;
      body?: BodyInit | object | null;
      headers?: Record<string, string>;
    } = {},
  ): Promise<T> {
    const url = this.buildUrl(path, options.query);
    const headers = new Headers(options.headers);
    headers.set("Authorization", `Token ${this.token}`);

    let body: BodyInit | undefined;
    if (options.body !== undefined && options.body !== null) {
      if (typeof options.body === "string") {
        body = options.body;
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/x-www-form-urlencoded");
        }
      } else if (options.body instanceof URLSearchParams) {
        body = options.body;
        if (!headers.has("Content-Type")) {
          headers.set(
            "Content-Type",
            "application/x-www-form-urlencoded;charset=UTF-8",
          );
        }
      } else {
        body = JSON.stringify(options.body);
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json");
        }
      }
    }

    const res = await fetch(url, {
      method,
      headers,
      body: method.toUpperCase() === "GET" ? undefined : body,
    });

    const parsed = await this.parseResponse(res);

    if (!res.ok) {
      const message = this.extractErrorMessage(parsed, res.statusText);
      throw new ShadowfaxAPIError(message, res.status, parsed);
    }

    return parsed as T;
  }

  private buildUrl(
    path: string,
    query?: Record<string, string | number | boolean | undefined | null>,
  ): string {
    const url = new URL(
      `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`,
    );
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null) continue;
        url.searchParams.set(key, String(value));
      }
    }
    return url.toString();
  }

  private async parseResponse(res: Response): Promise<unknown> {
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return await res.json();
    }

    const text = await res.text();
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return text;
    }
  }

  private extractErrorMessage(body: unknown, fallback: string): string {
    if (typeof body === "string" && body.trim()) return body;
    if (body && typeof body === "object") {
      const error = body as ShadowfaxApiErrorBody;
      return (
        error.message ??
        error.responseMsg ??
        error.error ??
        error.detail ??
        fallback
      );
    }
    return fallback;
  }

  private mapCreateResponse(response: unknown): ShadowfaxCreateOrderResponse {
    const obj = this.toObject(response);
    const data = this.toObjectOrNull(obj.data);

    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["message"]),
      awb_number:
        this.pickString(data ?? {}, ["awb_number"]) ??
        this.pickString(obj, ["awb_number"]),
      client_order_id:
        this.pickString(data ?? {}, ["client_order_id"]) ??
        this.pickString(obj, ["client_order_id"]),
      status:
        this.pickString(data ?? {}, ["status"]) ??
        this.pickString(obj, ["status"]),
      status_display: this.pickString(data ?? {}, ["status_display"]),
      data: data as ShadowfaxOrderDetails | null,
      errors: obj.errors ?? null,
      raw: response,
    };
  }

  private mapUpdateResponse(response: unknown): ShadowfaxOrderUpdateResponse {
    const obj = this.toObject(response);
    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["message", "responseMsg"]),
      raw: response,
    };
  }

  private mapCancelResponse(
    response: unknown,
    requestId: string,
  ): ShadowfaxCancelOrderResponse {
    const obj = this.toObject(response);
    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["responseMsg", "message"]),
      request_id: requestId,
      responseCode: this.pickNumber(obj, ["responseCode"]),
      raw: response,
    };
  }

  private mapTrackingResponse(
    response: unknown,
    fallbackAwb: string,
  ): ShadowfaxTrackingResponse {
    const obj = this.toObject(response);
    const orderDetails = this.toObjectOrNull(obj.order_details);
    const awbNumber =
      this.pickString(orderDetails ?? {}, ["awb_number"]) ?? fallbackAwb;

    return {
      awb_number: awbNumber,
      waybills: awbNumber ? [awbNumber] : [],
      currentStatus:
        this.pickString(orderDetails ?? {}, ["status_display", "status"]) ??
        this.pickString(obj, ["message"]),
      statusCode:
        this.pickString(orderDetails ?? {}, ["status"]) ??
        this.pickString(obj, ["status"]),
      scans: this.extractScans(obj),
      order_details: orderDetails as ShadowfaxOrderDetails | null,
      raw: response,
    };
  }

  private mapBulkTrackingResponse(
    response: unknown,
  ): ShadowfaxBulkTrackingResponse {
    const obj = this.toObject(response);
    const entries = Array.isArray(obj.data) ? obj.data : [];

    return {
      results: entries.flatMap((entry) => {
        if (!entry || typeof entry !== "object") return [];
        const tracking = this.mapTrackingResponse(entry, "");
        return tracking.awb_number ? [tracking] : [];
      }),
      raw: response,
    };
  }

  private mapServiceabilityResponse(
    response: unknown,
  ): ShadowfaxServiceabilityResponse {
    const entries = Array.isArray(response) ? response : [];
    const pincodes = entries.flatMap((entry) => {
      if (!entry || typeof entry !== "object") return [];
      const obj = entry as Record<string, unknown>;
      const pincode = this.pickNumber(obj, ["code", "pincode"]);
      if (pincode === null) return [];
      return [
        {
          pincode,
          services: Array.isArray(obj.services)
            ? obj.services.map(String)
            : [],
        },
      ];
    });

    return {
      serviceable: pincodes.length > 0,
      pincodes,
      raw: response,
    };
  }

  private mapRateResponse(response: unknown): ShadowfaxRateResponse {
    const obj = this.toObject(response);
    const shippingRate = this.pickNumber(obj, ["shipping_rate"]);
    const taxAmount = this.pickNumber(obj, ["gst"]);

    return {
      success: shippingRate !== null,
      message: this.pickString(obj, ["message"]),
      zone: this.pickString(obj, ["zone"]),
      shippingRate,
      taxAmount,
      totalAmount:
        shippingRate === null || taxAmount === null
          ? shippingRate
          : shippingRate + taxAmount,
      currency: "INR",
      raw: response,
    };
  }

  private mapLabelResponse(
    response: unknown,
    fallbackAwb: string,
  ): ShadowfaxLabelResponse {
    const obj = this.toObject(response);
    const data = this.toObjectOrNull(obj.data);

    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["message"]),
      awb_number: fallbackAwb,
      labelUrl: this.pickString(data ?? {}, ["label_url"]),
      raw: response,
    };
  }

  private mapPodResponse(response: unknown): ShadowfaxPodResponse {
    const obj = this.toObject(response);
    return {
      message: this.pickString(obj, ["message"]),
      pod_details: this.toObject(obj.pod_details) as ShadowfaxPodResponse["pod_details"],
      raw: response,
    };
  }

  private mapAwbPoolResponse(response: unknown): ShadowfaxAwbPoolResponse {
    const obj = this.toObject(response);
    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["message"]),
      awb_numbers: this.toStringArray(obj.awb_numbers),
      raw: response,
    };
  }

  private mapAwbRequestResponse(
    response: unknown,
  ): ShadowfaxAwbRequestResponse {
    const obj = this.toObject(response);
    return {
      status: this.pickString(obj, ["status"]),
      request_id: this.pickNumber(obj, ["request_id"]),
      message: this.pickString(obj, ["message"]),
      delay_time: this.pickNumber(obj, ["delay_time"]),
      raw: response,
    };
  }

  private mapAwbResultResponse(
    response: unknown,
  ): ShadowfaxAwbResultResponse {
    const obj = this.toObject(response);
    return {
      awb_numbers: this.toStringArray(obj.awb_numbers),
      status: this.pickString(obj, ["status"]),
      retry_flag: obj.retry_flag === true,
      raw: response,
    };
  }

  private extractScans(obj: Record<string, unknown>): ShadowfaxTrackingScan[] {
    const candidateArrays = [obj.tracking_details, obj.scans, obj.events];
    for (const candidate of candidateArrays) {
      if (Array.isArray(candidate)) {
        return candidate.filter(
          (item): item is ShadowfaxTrackingScan =>
            item !== null && typeof item === "object",
        );
      }
    }
    return [];
  }

  private toObject(value: unknown): Record<string, unknown> {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
    return {};
  }

  private toObjectOrNull(value: unknown): Record<string, unknown> | null {
    const obj = this.toObject(value);
    return Object.keys(obj).length > 0 ? obj : null;
  }

  private isSuccess(obj: Record<string, unknown>): boolean {
    const message = obj.message;
    if (typeof message === "string") {
      const normalized = message.trim().toLowerCase();
      // Forward order creation reports rejections with HTTP 200.
      if (normalized === "success" || normalized === "request accepted.") {
        return true;
      }
      if (normalized === "failure") return false;
    }

    const code = obj.responseCode;
    if (typeof code === "number") return code >= 200 && code < 300;

    const status = obj.status;
    if (typeof status === "string") {
      return status.toUpperCase() === "SUCCESS";
    }

    return true;
  }

  private pickString(
    obj: Record<string, unknown>,
    keys: string[],
  ): string | null {
    for (const key of keys) {
      const value = obj[key];
      if (typeof value === "string" && value.trim()) return value;
      if (typeof value === "number" && Number.isFinite(value))
        return String(value);
    }
    return null;
  }

  private pickNumber(
    obj: Record<string, unknown>,
    keys: string[],
  ): number | null {
    for (const key of keys) {
      const value = obj[key];
      if (typeof value === "number" && Number.isFinite(value)) return value;
      if (
        typeof value === "string" &&
        value.trim() &&
        !Number.isNaN(Number(value))
      ) {
        return Number(value);
      }
    }
    return null;
  }

  private toStringArray(value: unknown): string[] {
    return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
  }
}

export class ShadowfaxAPIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ShadowfaxAPIError";
  }
}
