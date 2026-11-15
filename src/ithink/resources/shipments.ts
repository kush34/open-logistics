import type { IthinkClient } from "../client.js";
import type { IthinkDocumentResponse, IthinkPageSize } from "../types/index.js";
import { assertBatchSize, isSuccess, pickString, toObject } from "./helpers.js";

export class Shipments {
  constructor(private client: IthinkClient) {}

  async generateLabel(
    waybills: string | string[],
    pageSize: IthinkPageSize = "A4",
  ): Promise<IthinkDocumentResponse> {
    const awbs = toList(waybills);
    assertBatchSize(awbCount(waybills), 100, "label generation");
    return this.client
      .request<unknown>("/api_v3/shipping/label.json", {
        awb_numbers: awbs,
        page_size: pageSize,
      })
      .then((response) => this.mapDocument(response));
  }

  generateManifest(
    waybills: string | string[],
  ): Promise<IthinkDocumentResponse> {
    const awbs = toList(waybills);
    return this.client
      .request<unknown>("/api_v3/shipping/manifest.json", {
        awb_numbers: awbs,
      })
      .then((response) => this.mapDocument(response));
  }

  private mapDocument(response: unknown): IthinkDocumentResponse {
    const obj = toObject(response);
    return {
      success: isSuccess(obj),
      message: pickString(obj, ["html_message", "message", "error"]),
      url: pickString(obj, ["file_name", "file_url", "url"]),
      raw: response,
    };
  }
}

function toList(value: string | string[]): string {
  return Array.isArray(value) ? value.join(",") : value;
}

function awbCount(value: string | string[]): number {
  return Array.isArray(value) ? value.length : 1;
}
