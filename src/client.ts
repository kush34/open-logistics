import type { AuthCredentials, AuthResponse, ShiprocketError } from "./types/index.js";

export const BASE_URL = "https://apiv2.shiprocket.in/v1/external";
const TOKEN_TTL_MS = 240 * 60 * 60 * 1000; // 10 days

export class ShiprocketClient {
  private token: string | null = null;
  private tokenExpiry: number = 0;

  constructor(private credentials: AuthCredentials) { }

  // ─── Auth ──────────────────────────────────────────────────────────────────

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

  /** Force token refresh (e.g. after 401) */
  async refreshToken(): Promise<void> {
    this.token = null;
    this.tokenExpiry = 0;
    await this.authenticate();
  }

  // ─── Request ───────────────────────────────────────────────────────────────

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

    // Auto-retry once on 401
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
}

// ─── Custom Error ─────────────────────────────────────────────────────────────

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
