// src/scripts/gamesPage.js

import { loadConfig } from "./config/env.js";
import { loadNavigation } from "../utils/navigation.js";

import { getGames } from "./api/api.games.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners } from "./api/api.owners.js";

import { gameCard } from "../components/cards/gameCard.js";

window.goToTeam = teamId => {
  window.location.href = `team.html?team=${teamId}`;
};

window.goToOwner = ownerId => {
  window.location.href = `owner.html?owner=${ownerId}`;
};

let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();
let initialized = false;

export function filterOwnedGames(games) {
  return games.filter(
    game => !!game.homeTeam?.owner || !!game.awayTeam?.owner
  );
}

function parseDateSafe(raw) {
  if (!raw) return null;

  let d = new Date(raw);
  if (!isNaN(d.getTime())) return d;

  const parts = raw.split("/");
  if (parts.length === 3) {
    const [m, day, y] = parts;
    d = new Date(`${y}-${m}-${day}`);
    if (!isNaN(d.getTime())) return d;
  }

  return null;
}

function getGameDate(game) {
  if (game.gameDate) {
    const d = parseDateSafe(game.gameDate);
    if (d) return d;
  }

  if (game.date) {
    const d = parseDateSafe(game.date);
    if (d) return d;
  }

  return null;
}

function filterByMonth(games) {
  return games.filter(game => {
    const d = getGameDate(game);
    if (!d) return false;

    return (
      d.getMonth() + 1 === currentMonth &&
      d.getFullYear() === currentYear
    );
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  if (initialized) return;
  initialized = true;

  await loadConfig();
  await loadNavigation();

  renderGamesPage(filterOwnedGames);
});

export async function renderGamesPage(filterFn = null) {
  const games = await getGames();
  const teams = await getTeams();
  const owners = await getOwners();

  const safeGames = Array.isArray(games) ? games : [];

  let filtered = filterFn ? filterFn(safeGames) : safeGames;
  filtered = filterByMonth(filtered);

  filtered.sort((a, b) => {
    const da = getGameDate(a);
    const db = getGameDate(b);

    if (da && db) return da - db;
    if (da && !db) return -1;
    if (!da && db) return 1;

    return String(a.gameId).localeCompare(String(b.gameId));
  });

  const container = document.getElementById("content");

  // ⭐ USE REAL gameCard()
  const gameCardsHtml = filtered
    .map(game => gameCard(game, teams, "md"))
    .join("");

  container.innerHTML = `
    <h1 class="page-title">Games</h1>

    <div class="month-nav">
      <button id="prev-month">◀ Prev</button>
      <span class="month-label">${currentMonth}/${currentYear}</span>
      <button id="next-month">Next ▶</button>
    </div>

    <div class="filter-bar">
      <select id="games-filter">
        <option value="owned">Owned Games Only</option>
        <option value="all">All Games</option>
      </select>
    </div>

    <div class="games-card-grid">
      ${gameCardsHtml}
    </div>
  `;

  document.getElementById("prev-month").onclick = () => {
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
    renderGamesPage(filterFn);
  };

  document.getElementById("next-month").onclick = () => {
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    renderGamesPage(filterFn);
  };

  const filterSelect = document.getElementById("games-filter");
  filterSelect.value = filterFn === filterOwnedGames ? "owned" : "all";

  filterSelect.addEventListener("change", e => {
    const value = e.target.value;
    if (value === "owned") {
      renderGamesPage(filterOwnedGames);
    } else {
      renderGamesPage();
    }
  });
}
