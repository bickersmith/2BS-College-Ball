// src/scripts/api/api.games.js

import { fetchGameData } from "../../data/fetch/fetchGame.js";
import { composeGame } from "../../data/compose/composeGame.js";

import { getTeams } from "./api.teams.js";
import { getOwners } from "./api.owners.js";

// Raw rows (for standings)
import { fetchGameDataRaw } from "../../data/fetch/fetchGame.js";
import { normalizeStandingsRow } from "../../data/normalize/normalizeStandingsRow.js";

export async function getGames() {
  const teams = await getTeams();
  const owners = await getOwners();

  // Already normalized rows
  const normalizedRows = await fetchGameData();

  return normalizedRows
    .map(row => composeGame(row, teams, owners))
    .filter(g => g !== null);
}

export async function getGame(gameId) {
  const games = await getGames();
  return games.find(g => String(g.gameId) === String(gameId)) || null;
}

export async function getGamesByTeam(teamId) {
  const games = await getGames();

  return games.filter(g =>
    g.homeTeam && g.awayTeam &&
    (
      String(g.homeTeam.teamId) === String(teamId) ||
      String(g.awayTeam.teamId) === String(teamId)
    )
  );
}

export async function getGameRows() {
  const raw = await fetchGameDataRaw();   // array-of-arrays from sheet
  if (!raw || raw.length === 0) return [];

  const header = raw[0].map(h => String(h).trim());
  const dataRows = raw.slice(1);

  return dataRows.map(row => normalizeStandingsRow(header, row));
}

