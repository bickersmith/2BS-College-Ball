import { dataHealthCheck } from "./utils/dataHealthCheck.js";
import { setCachedData } from "./utils/dataCache.js";

import { fetchOwners } from "./fetch/fetchOwner.js";
import { fetchTeams } from "./fetch/fetchTeam.js";
import { fetchGames } from "./fetch/fetchGame.js";
import { fetchAwards } from "./fetch/fetchAward.js";
import { fetchDraft } from "./fetch/fetchDraft.js";

import { composeTeamWithOwner } from "./compose/composeTeamWithOwner.js";
import { composeGame } from "./compose/composeGame.js";
import { composeAward } from "./compose/composeAward.js";
import { composeDraft } from "./compose/composeDraft.js";

export async function loadAllData() {
  // Fetch raw normalized objects
  const owners = await fetchOwners();
  const teams = await fetchTeams();
  const games = await fetchGames();
  const awards = await fetchAwards();
  const draft = await fetchDraft();

  // Composition layer
  const teamsWithOwners = teams.map(team => composeTeamWithOwner(team, owners));
  const gamesComposed = games.map(game => composeGame(game, teams, owners));
  const awardsComposed = awards.map(award => composeAward(award, teams, owners));
  const draftComposed = draft.map(d => composeDraft(d, teams, owners));

  // Build the final object BEFORE health check + cache
  const allData = {
    owners,
    teams,
    games,
    awards,
    draft,

    teamsWithOwners,
    gamesComposed,
    awardsComposed,
    draftComposed
  };

  // Run health check
  const errors = dataHealthCheck(allData);
  if (errors.length > 0) {
    console.warn("Data Health Check Errors:", errors);
  }

  // Cache it
  setCachedData(allData);

  return allData;
}
