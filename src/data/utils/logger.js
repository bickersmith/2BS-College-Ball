let DEBUG = true;

export function setDebugMode(value) {
  DEBUG = value;
}

export function log(...args) {
  if (DEBUG) console.log("[2BS]", ...args);
}

export function warn(...args) {
  console.warn("[2BS WARNING]", ...args);
}

export function error(...args) {
  console.error("[2BS ERROR]", ...args);
}
