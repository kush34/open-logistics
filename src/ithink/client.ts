import type {
  IthinkApiErrorBody,
  IthinkCancelOrderResponse,
  IthinkCreateOrderRequest,
  IthinkCredentials,
  IthinkDocumentResponse,
  IthinkOrderCreateResponse,
  IthinkPageSize,
  IthinkRateQuery,
  IthinkRateResponse,
  IthinkServiceabilityQuery,
  IthinkServiceabilityResponse,
  IthinkTrackingResponse,
} from "./types/index.js";
import { Orders } from "./resources/orders.js";
import { Shipments } from "./resources/shipments.js";
import { Tracking } from "./resources/tracking.js";
import { Rates } from "./resources/rates.js";
import { Serviceability } from "./resources/serviceability.js";
import { isErrorPayload, isRecord, statusCodeOf } from "./resources/helpers.js";

export const BASE_URL = "https://my.ithinklogistics.com";

export class IthinkClient {
  public readonly accessToken: string;
  public readonly secretKey: string;
  public readonly baseUrl: string;

  constructor(credentials: IthinkCredentials) {
    if (!credentials.accessToken) {
      throw new Error("iThink accessToken is required");
    }
    if (!credentials.secretKey) {
      throw new Error("iThink secretKey is required");
    }

    this.accessToken = credentials.accessToken;
    this.secretKey = credentials.secretKey;
    this.baseUrl = credentials.baseUrl?.replace(/\/+$/, "") ?? BASE_URL;
  }

  createOrder(
    payload: IthinkCreateOrderRequest,
  ): Promise<IthinkOrderCreateResponse> {
    return new Orders(this).create(payload);
  }

  cancelOrder(waybill: string): Promise<IthinkCancelOrderResponse> {
    return new Orders(this).cancel(waybill);
  }

  trackByWaybill(waybill: string): Promise<IthinkTrackingResponse> {
    return new Tracking(this).byWaybill(waybill);
  }

  trackByWaybills(waybills: string[]): Promise<IthinkTrackingResponse> {
    return new Tracking(this).byWaybills(waybills);
  }

  checkServiceability(
    params: IthinkServiceabilityQuery,
  ): Promise<IthinkServiceabilityResponse> {
    return new Serviceability(this).check(params);
  }

  calculateRate(params: IthinkRateQuery): Promise<IthinkRateResponse> {
    return new Rates(this).calculate(params);
  }

  generateLabel(
    waybills: string | string[],
    pageSize: IthinkPageSize = "A4",
  ): Promise<IthinkDocumentResponse> {
    return new Shipments(this).generateLabel(waybills, pageSize);
  }

  generateManifest(
    waybills: string | string[],
  ): Promise<IthinkDocumentResponse> {
    return new Shipments(this).generateManifest(waybills);
  }

  /**
   * Posts to an `api_v3` path. iThink authenticates by including the
   * credentials in the JSON body, so every call is a POST.
   *
   * A non-2xx HTTP status always throws. iThink also signals failure with HTTP
   * 200, so callers that have no per-item result to report (tracking, rates,
   * serviceability) pass `throwOnErrorBody` to throw on an error body too.
   * Orders, cancellation, and documents instead map the body to
   * `success: false`.
   */
  async request<T>(
    path: string,
    data: Record<string, unknown>,
    { throwOnErrorBody = false }: { throwOnErrorBody?: boolean } = {},
  ): Promise<T> {
    const url = this.buildUrl(path);
    const res = await fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      }),
      body: JSON.stringify({
        data: {
          ...data,
          access_token: this.accessToken,
          secret_key: this.secretKey,
        },
      }),
    });

    const parsed = await this.parseResponse(res);
    const errorBody = throwOnErrorBody && isErrorPayload(parsed);

    if (!res.ok || errorBody) {
      const message = this.extractErrorMessage(
        parsed,
        res.ok ? "iThink request failed" : res.statusText,
      );
      const bodyStatus = isRecord(parsed) ? statusCodeOf(parsed) : null;
      throw new IthinkAPIError(message, bodyStatus ?? res.status, parsed);
    }

    return parsed as T;
  }

  private buildUrl(path: string): string {
    return new URL(path, `${this.baseUrl}/`).toString();
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
      const error = body as IthinkApiErrorBody;
      return (
        error.html_message ??
        error.message ??
        error.error ??
        error.detail ??
        fallback
      );
    }
    return fallback;
  }
}

export class IthinkAPIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = "IthinkAPIError";
  }
}
