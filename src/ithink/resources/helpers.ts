export function toObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

export function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function pickString(
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

export function pickNumber(
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

export function truthyFlag(value: unknown): boolean {
  return typeof value === "string" && value.toUpperCase() === "Y";
}

export function statusCodeOf(obj: Record<string, unknown>): number | null {
  const value = obj.status_code ?? obj.statusCode;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (
    typeof value === "string" &&
    value.trim() &&
    !Number.isNaN(Number(value))
  ) {
    return Number(value);
  }
  return null;
}

/**
 * iThink returns HTTP 200 with a failure body. Rule used across the provider:
 * `status` of `"error"`/`"failed"`/`"failure"` or a `status_code >= 400` means
 * the call failed; `html_message`/`message` carries the error text.
 */
export function isErrorPayload(body: unknown): boolean {
  if (!isRecord(body)) return false;
  const status = body.status;
  if (
    typeof status === "string" &&
    ["error", "failed", "failure"].includes(status.toLowerCase())
  ) {
    return true;
  }
  const code = statusCodeOf(body);
  return code !== null && code >= 400;
}

export function isSuccess(obj: Record<string, unknown>): boolean {
  const code = statusCodeOf(obj);
  if (code !== null && code >= 400) return false;

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

export function assertBatchSize(
  count: number,
  max: number,
  what: string,
): void {
  if (count > max) {
    throw new Error(`iThink ${what} accepts at most ${max} per request`);
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
