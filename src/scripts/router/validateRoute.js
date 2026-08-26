// scripts/router/validateRoute.js
import { routes } from "./routes.js";

export function validateRoute(pathname, params) {
  const route = routes[pathname];
  if (!route) return { valid: false, reason: "UNKNOWN_ROUTE" };

  if (route.requiredParams && route.requiredParams.length > 0) {
    const missing = route.requiredParams.filter(p => !params.get(p));
    if (missing.length > 0) {
      return { valid: false, reason: "MISSING_PARAMS", missing };
    }
  }

  return { valid: true };
}
