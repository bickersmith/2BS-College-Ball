// scripts/state/selectors.js
import { getState } from "./store.js";

export const selectLeague = () => getState().league;
export const selectSeason = () => getState().season;

export const selectTeams = () => getState().teams;
export const selectScores = () => getState().scores;
export const selectOwners = () => getState().owners;
export const selectGames = () => getState().games;
export const selectAwards = () => getState().awards;
export const selectDraft = () => getState().draft;

export function selectOwners() {
  return window.__STATE__.owners || [];
}
