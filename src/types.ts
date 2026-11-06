// src/types.ts

export interface LogisticsConfig {
  shiprocket?: ShiprocketConfig;
  delhivery?: DelhiveryConfig;
}

export interface ShiprocketConfig {
  email: string;
  password: string;
}

export interface DelhiveryConfig {
  token: string;
}

export type TrackingStatus =
  | "PENDING"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "UNKNOWN";

export interface TrackingResult {
  awb: string;
  status: TrackingStatus;
  location?: string;
  estimatedDelivery?: string;
  provider: "shiprocket" | "delhivery";
}
