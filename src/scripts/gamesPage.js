// src/scripts/gamesPage.js

import { loadConfig } from "./config/env.js";
import { loadNavigation } from "../utils/navigation.js";

import { getGames } from "./api/api.games.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners } from "./api/api.owners.js";

import { gameCard } from "../components/cards/gameCard.js";

let gamesPageRendered = false;

export function filterOwnedGames(games) {
  return games.filter(game => {
    const hasHomeOwner = !!game.homeTeam?.owner;
    const hasAwayOwner = !!game.awayTeam?.owner;
    return hasHomeOwner || hasAwayOwner;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  if (gamesPageRendered) return;
  gamesPageRendered = true;

  await loadConfig();
  await loadNavigation();

  renderGamesPage();
});

export async function renderGamesPage(filterFn = null) {
  const games = await getGames();
  const teams = await getTeams();
  const owners = await getOwners();

  const safeGames = Array.isArray(games) ? games : [];
  const filteredGames = filterFn ? filterFn(safeGames) : safeGames;

  const container = document.getElementById("content");

  const gameCardsHtml = filteredGames.map(game => {
    return gameCard(game, teams, "md");
  }).join("");

  container.innerHTML = `
    <h1 class="page-title">Games</h1>

    <div class="filter-bar">
      <select id="games-filter">
        <option value="all">All Games</option>
        <option value="owned">Owned Games Only</option>
      </select>
    </div>

    <div class="games-card-grid">
      ${gameCardsHtml}
    </div>
  `;

  const filterSelect = document.getElementById("games-filter");
  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
      const value = e.target.value;
      if (value === "owned") {
        renderGamesPage(filterOwnedGames);
      } else {
        renderGamesPage();
      }
    });
  }
}
