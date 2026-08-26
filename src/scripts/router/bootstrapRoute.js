// scripts/router/bootstrapRoute.js
import { getRoute } from "./router.js";
import { validateRoute } from "./validateRoute.js";

export function bootstrapRoute() {
  const route = getRoute();
  const validation = validateRoute(route.pathname, route.params);

  if (!validation.valid) {
    // simple guard: send them home for now
    window.location.href = "/index.html";
    return null;
  }

  return route;
}
