// ===============================
// schedulePage.js — RAW MODE (v2)
// ===============================
import { getGames } from "./api/api.games.js";
import { getTeams } from "./api/api.teams.js";


import { loadConfig } from "./config/env.js";
import { bootstrapRoute } from "./router/bootstrapRoute.js";

import { initState } from "./state/initState.js";
import { updateGames } from "./state/updateState.js";
import { selectGames } from "./state/selectors.js";

import { getGames } from "./api/api.js";
import { renderComponent } from "../components/core/componentRegistry.js";

import { perfStart, perfEnd } from "./perf/perf.js";
import { PERF_MARKS } from "./perf/perfMarks.js";

import { log } from "./diagnostics/logger.js";
import { withErrorBoundary } from "./errors/errorBoundary.js";

export async function renderSchedulePage() {
  perfStart(PERF_MARKS.PAGE_INIT);
  log("SCHEDULE", "Initializing schedule page (raw mode)");

  await loadConfig();
  initState();

  // Fetch + normalize + validate + compose games
  const games = await withErrorBoundary(
    () => getGames(),
    () => {
      document.getElementById("content").innerHTML =
        "<p>Error loading schedule.</p>";
      return [];
    }
  );


  // DIAGNOSTIC: what did getGames actually return?
  log("SCHEDULE", `getGames() returned ${Array.isArray(games) ? games.length : "NON-ARRAY"}`);



  // SAFETY: ensure array before storing
  const safeGames = Array.isArray(games) ? games : [];
  updateGames(safeGames);

  // SAFETY: ensure array when selecting
  const selected = selectGames();
  const safeSelected = Array.isArray(selected) ? selected : [];


    // DIAGNOSTIC: what did selectGames return?
  log("SCHEDULE", `selectGames() returned ${safeSelected.length} games`);
  
  // Render raw schedule
  renderRawSchedule(safeSelected);

  perfEnd(PERF_MARKS.PAGE_INIT);
}

function renderRawSchedule(games) {
  // SAFETY: ensure iterable
  const safeGames = Array.isArray(games) ? games : [];

  const container = document.getElementById("content");

  let html = `<h1>Season Schedule (Raw Mode)</h1>`;

  for (const game of safeGames) {
    html += `
      <div>
        <strong>${game.homeTeam?.teamName} vs ${game.awayTeam?.teamName}</strong><br>
        Date: ${game.dateFormatted}<br>
        Location: ${game.location}<br>
        Score: ${game.score.home} - ${game.score.away}<br>
        Game ID: ${game.gameId}
      </div>
      <hr>
    `;
  }

  container.innerHTML = html;
}

// Auto-run
renderSchedulePage();
