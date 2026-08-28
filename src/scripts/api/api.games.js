import { fetchGameData } from "../../data/fetch/fetchGame.js";
import { fetchTeamData } from "../../data/fetch/fetchTeam.js";
import { fetchOwnerData } from "../../data/fetch/fetchOwner.js";
import { composeGame } from "../../data/compose/composeGame.js";


//import { fetchGameData } from "../data/fetch/fetchGame.js";
//import { composeGame } from "../data/compose/composeGame.js";
import { getTeams } from "./api.teams.js";
import { getOwners } from "./api.owners.js";

export async function getGames() {
  const teams = await getTeams();
  const owners = await getOwners();
  const gamesRaw = await fetchGameData();

  return gamesRaw.map(g => composeGame(g, teams, owners));
}

export async function getGamesByTeam(teamId) {
  const games = await getGames();
  return games.filter(g => g.raw.teamId === teamId || g.raw.opponentTeamId === teamId);
}


/*
export async function getGames() {
  const teams = await fetchTeamData();
  const owners = await fetchOwnerData();
  const rawGames = await fetchGameData();

  const games = rawGames.map(g => composeGame(g, teams, owners));

  return { games, teams, owners };
}

export async function getGamesByTeam(teamId) {
  const games = await getGames();

  return games.filter(g =>
    g.teamId == teamId ||
    g.opponentId == teamId
  );
}
*/