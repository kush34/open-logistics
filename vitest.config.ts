import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    testTimeout:15000,
    setupFiles: ["./tests/setup.ts"],
  },

  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
    },
  },
});