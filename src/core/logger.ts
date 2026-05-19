const isDebug =
  process.env.SDK_DEBUG === "true";

export const logger = {
  debug: (...args: unknown[]) => {
    if (isDebug) {
      console.debug("[SDK DEBUG]", ...args);
    }
  },

  info: (...args: unknown[]) => {
    console.info("[SDK INFO]", ...args);
  },

  error: (...args: unknown[]) => {
    console.error("[SDK ERROR]", ...args);
  },
};