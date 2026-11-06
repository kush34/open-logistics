import { ShiprocketConfig, TrackingResult } from "../types.js";

export class ShiprocketTracker {
  constructor(private config: ShiprocketConfig) {}

  async track(awb: string): Promise<TrackingResult> {
    throw new Error(`Not Implemented: ${awb}`);
  }
}
