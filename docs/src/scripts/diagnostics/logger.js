import { isDebug } from "../config/envHelpers.js";

export function log(...args) {
  if (isDebug()) console.log("[LOG]", ...args);
}

export function warn(...args) {
  if (isDebug()) console.warn("[WARN]", ...args);
}

export function error(...args) {
  console.error("[ERROR]", ...args);
}
