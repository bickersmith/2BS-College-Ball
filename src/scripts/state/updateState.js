// scripts/state/updateState.js
import { setSlice } from "./store.js";

export function updateLeague(leagueId) {
  setSlice("league", leagueId);
}

export function updateSeason(seasonId) {
  setSlice("season", seasonId);
}

export function updateTeams(teams) {
  setSlice("teams", teams);
}

export function updateScores(scores) {
  setSlice("scores", scores);
}

export function updateOwners(owners) {
  setSlice("owners", owners);
}

export function updateGames(games) {
  setSlice("games", games);
}

export function updateAwards(awards) {
  setSlice("awards", awards);
}

export function updateDraft(draft) {
  setSlice("draft", draft);
}
