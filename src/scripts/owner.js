// src/scripts/owner.js

import { bootstrapRoute } from "./router/bootstrapRoute.js";
import { initState } from "./state/initState.js";
import {
  updateOwners,
  updateTeams
} from "./state/updateState.js";

import {
  selectOwners,
  selectTeams,
  selectLeague,
  selectSeason
} from "./state/selectors.js";

import { getOwners, getTeams } from "./api/api.js";
import { renderComponent } from "../components/core/componentRegistry.js";

import { perfStart, perfEnd } from "./perf/perf.js";
import { PERF_MARKS } from "./perf/perfMarks.js";
import { log } from "./diagnostics/logger.js";
import { withErrorBoundary } from "./errors/errorBoundary.js";

export async function initOwnerPage() {
  perfStart(PERF_MARKS.PAGE_INIT);
  log("ROUTE", "Owner detail page init");

  const route = bootstrapRoute();
  if (!route) return;

  const ownerId = route.params.get("ownerId");
  if (!ownerId) {
    document.getElementById("owner-container").innerHTML =
      "<p>Missing ownerId.</p>";
    return;
  }

  initState();

  const league = selectLeague();
  const season = selectSeason();

  const owners = await withErrorBoundary(
    () => getOwners(league, season),
    () => {
      document.getElementById("owner-container").innerHTML =
        "<p>Error loading owner.</p>";
      return [];
    }
  );

  updateOwners(owners);

  const owner = owners.find(o => o.ownerId === ownerId);

  if (!owner) {
    document.getElementById("owner-container").innerHTML =
      "<p>Owner not found.</p>";
    return;
  }

  renderOwner(owner);

  const teams = await withErrorBoundary(
    () => getTeams(league, season),
    () => {
      document.getElementById("owner-teams-container").innerHTML =
        "<p>Error loading teams.</p>";
      return [];
    }
  );

  updateTeams(teams);

  const ownerTeams = teams.filter(t => t.ownerId === ownerId);
  renderOwnerTeams(ownerTeams);

  perfEnd(PERF_MARKS.PAGE_INIT);
}

function renderOwner(owner) {
  const container = document.getElementById("owner-container");
  container.innerHTML = renderComponent("owner", owner);
}

function renderOwnerTeams(teams) {
  const container = document.getElementById("owner-teams-container");
  container.innerHTML = teams
    .map(team => renderComponent("team", team))
    .join("");
}
