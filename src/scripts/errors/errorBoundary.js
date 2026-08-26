// src/scripts/errors/errorBoundary.js

export function withErrorBoundary(fn, onError) {
  try {
    return fn();
  } catch (err) {
    console.error("ErrorBoundary caught:", err);
    if (onError) return onError(err);
    return null;
  }
}
