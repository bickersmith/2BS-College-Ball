// src/scripts/api/api.games.js

import { fetchGameData } from "../../data/fetch/fetchGame.js";
import { composeGame } from "../../data/compose/composeGame.js";

import { getTeams } from "./api.teams.js";
import { getOwners } from "./api.owners.js";

export async function getGames() {
  const teams = await getTeams();
  const owners = await getOwners();
  const gamesRawGroups = await fetchGameData();

  return gamesRawGroups.map(group => composeGame(group, teams, owners));
}

export async function getGame(gameId) {
  const games = await getGames();
  return games.find(g => String(g.gameId) === String(gameId)) || null;
}

export async function getGamesByTeam(teamId) {
  const games = await getGames();

  return games.filter(g =>
    String(g.homeTeam.teamId) === String(teamId) ||
    String(g.awayTeam.teamId) === String(teamId)
  );
}
