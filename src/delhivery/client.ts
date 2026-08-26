import type {
  DelhiveryApiErrorBody,
  DelhiveryCancelOrderResponse,
  DelhiveryCredentials,
  DelhiveryOrderCreateResponse,
  DelhiveryOrderUpdatePayload,
  DelhiveryOrderUpdateResponse,
  DelhiveryPackingSlipResponse,
  DelhiveryPickupRequestPayload,
  DelhiveryPickupRequestResponse,
  DelhiveryRateQuery,
  DelhiveryRateResponse,
  DelhiveryServiceabilityQuery,
  DelhiveryServiceabilityResponse,
  DelhiveryTrackingResponse,
  DelhiveryWaybillFetchQuery,
  DelhiveryWaybillResponse,
  DelhiveryBulkWaybillResponse,
  DelhiveryShipmentPayload,
} from "./types/index.js";

export const BASE_URL = "https://staging-express.delhivery.com";

export class DelhiveryClient {
  public readonly token: string;
  public readonly clientName: string;
  public readonly baseUrl: string;

  constructor(credentials: DelhiveryCredentials) {
    if (!credentials.token) {
      throw new Error("Delhivery token is required");
    }
    if (!credentials.clientName) {
      throw new Error("Delhivery clientName is required");
    }

    this.token = credentials.token;
    this.clientName = credentials.clientName;
    this.baseUrl = credentials.baseUrl?.replace(/\/+$/, "") ?? BASE_URL;
  }

  createOrder(
    payload: DelhiveryShipmentPayload,
  ): Promise<DelhiveryOrderCreateResponse> {
    const shipment = this.normalizeShipmentPayload(payload);
    const body = new URLSearchParams({
      format: "json",
      data: JSON.stringify({ shipments: [shipment] }),
    });

    return this.request<unknown>("POST", "/api/cmu/create.json", { body }).then(
      (response) => this.mapCreateResponse(response),
    );
  }

  updateOrder(
    payload: DelhiveryOrderUpdatePayload,
  ): Promise<DelhiveryOrderUpdateResponse> {
    return this.request<unknown>("POST", "/api/p/edit", { body: payload }).then(
      (response) => this.mapUpdateResponse(response),
    );
  }

  cancelOrder(waybill: string): Promise<DelhiveryCancelOrderResponse> {
    return this.request<unknown>("POST", "/api/p/edit", {
      body: { waybill, cancellation: true as const },
    }).then((response) => this.mapCancelResponse(response, waybill));
  }

  trackByWaybill(waybill: string): Promise<DelhiveryTrackingResponse> {
    return this.request<unknown>("GET", "/api/v1/packages/json/", {
      query: { waybill },
    }).then((response) => this.mapTrackingResponse(response, waybill));
  }

  trackByOrderId(orderId: string): Promise<DelhiveryTrackingResponse> {
    return this.request<unknown>("GET", "/api/v1/packages/json/", {
      query: { ref_nos: orderId },
    }).then((response) => this.mapTrackingResponse(response, orderId));
  }

  trackByWaybills(waybills: string[]): Promise<DelhiveryTrackingResponse> {
    return this.request<unknown>("GET", "/api/v1/packages/json/", {
      query: { waybill: waybills.join(",") },
    }).then((response) =>
      this.mapTrackingResponse(response, waybills.join(",")),
    );
  }

  checkServiceability(
    params: DelhiveryServiceabilityQuery,
  ): Promise<DelhiveryServiceabilityResponse> {
    return this.request<unknown>("GET", "/c/api/pin-codes/json/", {
      query: params as Record<
        string,
        string | number | boolean | undefined | null
      >,
    }).then((response) => this.mapServiceabilityResponse(response));
  }

  calculateRate(params: DelhiveryRateQuery): Promise<DelhiveryRateResponse> {
    return this.request<unknown>("GET", "/api/kinko/v1/invoice/charges/.json", {
      query: {
        md: params.md,
        cgm: params.cgm,
        o_pin: params.o_pin,
        d_pin: params.d_pin,
        ss: params.ss,
        pt: params.pt,
      },
    }).then((response) => this.mapRateResponse(response));
  }

  generateLabel(
    waybill: string,
    pdf = false,
  ): Promise<DelhiveryPackingSlipResponse> {
    return this.request<unknown>("GET", "/api/p/packing_slip", {
      query: {
        wbns: waybill,
        pdf: pdf ? "True" : undefined,
      },
    }).then((response) => this.mapLabelResponse(response, waybill));
  }

  createPickupRequest(
    payload: DelhiveryPickupRequestPayload,
  ): Promise<DelhiveryPickupRequestResponse> {
    return this.request<unknown>("POST", "/fm/request/new/", {
      body: payload,
    }).then((response) => this.mapPickupResponse(response));
  }

  fetchWaybill(): Promise<DelhiveryWaybillResponse> {
    return this.request<unknown>("GET", "/waybill/api/fetch/json/", {
      query: {
        cl: this.clientName,
        client_name: this.clientName,
        token: this.token,
      },
    }).then((response) => this.mapSingleWaybill(response));
  }

  fetchWaybills(
    params: DelhiveryWaybillFetchQuery,
  ): Promise<DelhiveryBulkWaybillResponse> {
    const query = {
      cl: this.clientName,
      client_name: this.clientName,
      token: this.token,
      action: params.action ?? "next",
      count: params.count,
      wbn: params.wbn,
    };

    return this.request<unknown>("GET", "/waybill/api/bulk/json/", {
      query,
    }).then((response) => this.mapBulkWaybills(response));
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
      throw new DelhiveryAPIError(message, res.status, parsed);
    }

    return parsed as T;
  }

  private buildUrl(
    path: string,
    query?: Record<string, string | number | boolean | undefined | null>,
  ): string {
    const url = new URL(path, `${this.baseUrl}/`);
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
      const error = body as DelhiveryApiErrorBody;
      return error.message ?? error.error ?? error.detail ?? fallback;
    }
    return fallback;
  }

  private normalizeShipmentPayload(
    payload: DelhiveryShipmentPayload,
  ): DelhiveryShipmentPayload {
    const normalized: DelhiveryShipmentPayload = {
      ...payload,
      client: payload.client ?? this.clientName,
      pickup_location: {
        name: payload.pickup_location.name,
      },
    };

    if (normalized.address === undefined && normalized.add !== undefined) {
      normalized.address = normalized.add;
    }

    if (normalized.add === undefined && normalized.address !== undefined) {
      normalized.add = normalized.address;
    }

    if (normalized.weight !== undefined && normalized.gm === undefined) {
      normalized.gm = normalized.weight;
    }

    if (
      normalized.product_details === undefined &&
      normalized.products_desc !== undefined
    ) {
      normalized.product_details = normalized.products_desc;
    }

    if (normalized.payment_mode === undefined) {
      normalized.payment_mode = normalized.package_type;
    }

    return normalized;
  }

  private mapCreateResponse(response: unknown): DelhiveryOrderCreateResponse {
    const obj = this.toObject(response);
    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["message", "status", "remarks", "detail"]),
      order_id: this.pickString(obj, ["order_id", "orderId", "orderid"]),
      waybill: this.pickString(obj, ["waybill", "awb", "awb_code", "wbn"]),
      status: this.pickString(obj, ["status", "shipment_status"]),
      shipment_id: this.pickString(obj, ["shipment_id", "shipmentId"]),
      raw: response,
    };
  }

  private mapUpdateResponse(response: unknown): DelhiveryOrderUpdateResponse {
    const obj = this.toObject(response);
    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["message", "status", "remarks", "detail"]),
      waybill: this.pickString(obj, ["waybill", "awb", "awb_code", "wbn"]),
      raw: response,
    };
  }

  private mapCancelResponse(
    response: unknown,
    waybill: string,
  ): DelhiveryCancelOrderResponse {
    const obj = this.toObject(response);
    return {
      success: this.isSuccess(obj),
      message: this.pickString(obj, ["message", "status", "remarks", "detail"]),
      waybill:
        this.pickString(obj, ["waybill", "awb", "awb_code", "wbn"]) ?? waybill,
      raw: response,
    };
  }

  private mapTrackingResponse(
    response: unknown,
    fallbackWaybill: string,
  ): DelhiveryTrackingResponse {
    const obj = this.toObject(response);
    const shipment = this.extractShipment(obj);
    const scans = this.extractScans(obj, shipment);
    const waybills = this.extractWaybills(obj, fallbackWaybill);

    return {
      waybills,
      currentStatus: this.pickString(shipment, [
        "status",
        "current_status",
        "status_name",
        "status_code",
      ]),
      statusCode: this.pickString(shipment, ["status_code", "statusCode"]),
      scans,
      raw: response,
    };
  }

  private mapServiceabilityResponse(
    response: unknown,
  ): DelhiveryServiceabilityResponse {
    const obj = this.toObject(response);
    const deliveryCodes = this.extractDeliveryCodes(obj);
    const first = deliveryCodes[0]?.postal_code;

    return {
      serviceable: deliveryCodes.length > 0 && this.isServiceable(first),
      prepaid: this.truthyFlag(first?.pre_paid),
      cod: this.truthyFlag(first?.cod ?? first?.cash),
      pickup: this.truthyFlag(first?.pickup),
      remarks: first?.remarks?.trim() ? first.remarks : null,
      delivery_codes: deliveryCodes,
      raw: response,
    };
  }

  private mapRateResponse(response: unknown): DelhiveryRateResponse {
    const obj = this.toObject(response);
    return {
      totalAmount: this.pickNumber(obj, [
        "total_amount",
        "totalAmount",
        "amount",
        "total",
      ]),
      grossAmount: this.pickNumber(obj, ["gross_amount", "grossAmount"]),
      taxAmount: this.pickNumber(obj, ["tax_amount", "taxAmount", "tax"]),
      currency: "INR",
      raw: response,
    };
  }

  private mapLabelResponse(
    response: unknown,
    fallbackWaybill: string,
  ): DelhiveryPackingSlipResponse {
    const obj = this.toObject(response);
    return {
      waybill: this.pickString(obj, ["waybill", "wbn"]) ?? fallbackWaybill,
      pdfUrl: this.pickString(obj, ["pdf_url", "pdfUrl", "url"]),
      packagesFound: this.pickNumber(obj, ["packages_found", "packagesFound"]),
      packages: this.pickArray(obj, ["packages"]),
      raw: response,
    };
  }

  private mapPickupResponse(response: unknown): DelhiveryPickupRequestResponse {
    const obj = this.toObject(response);
    return {
      pickup_id: this.pickString(obj, ["pickup_id", "pickupId", "id"]),
      message: this.pickString(obj, ["message", "status", "remarks", "detail"]),
      raw: response,
    };
  }

  private mapSingleWaybill(response: unknown): DelhiveryWaybillResponse {
    const obj = this.toObject(response);
    return {
      waybill: this.pickString(obj, ["waybill", "wbn", "awb", "awb_code"]),
      raw: response,
    };
  }

  private mapBulkWaybills(response: unknown): DelhiveryBulkWaybillResponse {
    const obj = this.toObject(response);
    const candidates = [obj.waybills, obj.waybill, obj.data, obj.results];
    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return {
          waybills: candidate.map(String).filter(Boolean),
          raw: response,
        };
      }
    }

    const single = this.pickString(obj, ["waybill", "wbn", "awb", "awb_code"]);
    return {
      waybills: single ? [single] : [],
      raw: response,
    };
  }

  private toObject(value: unknown): Record<string, unknown> {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
    return {};
  }

  private isSuccess(obj: Record<string, unknown>): boolean {
    const status = obj.status ?? obj.success ?? obj.ok;
    if (typeof status === "boolean") return status;
    if (typeof status === "number") return status >= 200 && status < 300;
    if (typeof status === "string") {
      return ["ok", "success", "created", "updated"].includes(
        status.toLowerCase(),
      );
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

  private pickArray(
    obj: Record<string, unknown>,
    keys: string[],
  ): unknown[] | null {
    for (const key of keys) {
      const value = obj[key];
      if (Array.isArray(value)) return value;
    }
    return null;
  }

  private extractShipment(
    obj: Record<string, unknown>,
  ): Record<string, unknown> {
    const candidates = [
      this.toObject(obj.tracking_data),
      this.toObject(obj.data),
      this.toObject(obj.packages),
      this.toObject(obj.package),
      obj,
    ];

    for (const candidate of candidates) {
      if (Object.keys(candidate).length > 0) return candidate;
    }
    return obj;
  }

  private extractScans(
    obj: Record<string, unknown>,
    shipment: Record<string, unknown>,
  ): Array<Record<string, unknown>> {
    const candidateArrays = [
      obj.scans,
      obj.scan,
      obj.events,
      shipment.scans,
      shipment.scan,
      shipment.events,
      obj.shipment_track_activities,
      shipment.shipment_track_activities,
    ];

    for (const candidate of candidateArrays) {
      if (Array.isArray(candidate)) {
        return candidate.filter((item): item is Record<string, unknown> => {
          return item !== null && typeof item === "object";
        });
      }
    }
    return [];
  }

  private extractWaybills(
    obj: Record<string, unknown>,
    fallbackWaybill: string,
  ): string[] {
    const candidateArrays = [obj.waybills, obj.waybill, obj.ref_nos];
    for (const candidate of candidateArrays) {
      if (Array.isArray(candidate)) {
        return candidate.map(String).filter(Boolean);
      }
      if (typeof candidate === "string" && candidate.trim()) {
        return candidate
          .split(",")
          .map((part) => part.trim())
          .filter(Boolean);
      }
    }
    return fallbackWaybill
      ? fallbackWaybill
          .split(",")
          .map((part) => part.trim())
          .filter(Boolean)
      : [];
  }

  private extractDeliveryCodes(obj: Record<string, unknown>): Array<{
    postal_code: {
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
    };
  }> {
    const deliveryCodes = obj.delivery_codes;
    if (!Array.isArray(deliveryCodes)) {
      return [];
    }

    return deliveryCodes.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const postalCode = this.toPostalCodeObject(
        (item as Record<string, unknown>).postal_code,
      );
      return postalCode ? [{ postal_code: postalCode }] : [];
    });
  }

  private isServiceable(postalCode?: {
    pre_paid?: string;
    cod?: string;
    cash?: string;
  }): boolean {
    if (!postalCode) return false;
    return (
      this.truthyFlag(postalCode.pre_paid) ||
      this.truthyFlag(postalCode.cod ?? postalCode.cash)
    );
  }

  private truthyFlag(value?: string | null): boolean {
    return typeof value === "string" && value.toUpperCase() === "Y";
  }

  private toPostalCodeObject(value: unknown): {
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
  } | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return null;
    }

    return value as {
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
    };
  }
}

export class DelhiveryAPIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = "DelhiveryAPIError";
  }
}
