// src/scripts/owners.js

import { loadConfig } from "./config/env.js";
import { bootstrapRoute } from "./router/bootstrapRoute.js";

import { initState } from "./state/initState.js";
import { updateOwners } from "./state/updateState.js";

import {
  selectOwners,
  selectLeague,
  selectSeason
} from "./state/selectors.js";

import { getOwners } from "./api/api.js";
import { renderComponent } from "../components/core/componentRegistry.js";

import { perfStart, perfEnd } from "./perf/perf.js";
import { PERF_MARKS } from "./perf/perfMarks.js";

import { log } from "./diagnostics/logger.js";
import { withErrorBoundary } from "./errors/errorBoundary.js";

export async function initOwnersPage() {
  perfStart(PERF_MARKS.PAGE_INIT);
  log("ROUTE", "Owners page init");

  // Ensure config is loaded (owners.html already calls loadConfig)
  await loadConfig();

  const route = bootstrapRoute();
  if (!route) {
    console.error("Route bootstrap failed");
    return;
  }

  // Initialize state AFTER config is loaded
  initState();

  const league = selectLeague();
  const season = selectSeason();

  const owners = await withErrorBoundary(
    () => getOwners(league, season),
    () => {
      document.getElementById("owners-container").innerHTML =
        "<p>Error loading owners.</p>";
      return [];
    }
  );

  updateOwners(owners);

  renderOwnersList(selectOwners());

  perfEnd(PERF_MARKS.PAGE_INIT);
}

function renderOwnersList(owners) {
  const container = document.getElementById("owners-container");

  container.innerHTML = owners
    .map(owner => renderComponent("owner", owner))
    .join("");
}
