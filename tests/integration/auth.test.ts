import { describe, it, expect } from "vitest";
import { ShiprocketClient } from "@src/client";
import { logger } from "@src/core/logger";

describe("Shiprocket Auth", () => {
  it("should authenticate successfully", async () => {
    const client = new ShiprocketClient({
      email: process.env.SHIPROCKET_EMAIL!,
      password: process.env.SHIPROCKET_PASSWORD!,
    });

    logger.debug(
      "Client email",
      process.env.SHIPROCKET_EMAIL
    );
    logger.debug("Client Pass", process.env.SHIPROCKET_PASSWORD?.slice(0, 7))
    const token = await client.getAccessToken();
    logger.debug("New Token",token.slice(0,30))
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });
});