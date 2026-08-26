// scripts/router/router.js
import { getDefaultLeague, getDefaultSeason } from "../config/envHelpers.js";

export function getRoute() {
  const { pathname, search } = window.location;
  const params = new URLSearchParams(search);

  const league = params.get("league") || getDefaultLeague();
  const season = params.get("season") || getDefaultSeason();

  return { pathname, params, league, season };
}

export function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function navigate(path, extraParams = {}) {
  const params = new URLSearchParams(window.location.search);

  Object.entries(extraParams).forEach(([key, value]) => {
    if (value == null) return;
    params.set(key, value);
  });

  window.location.href = `${path}?${params.toString()}`;
}
