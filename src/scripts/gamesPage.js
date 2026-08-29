// src/scripts/gamesPage.js

import { loadConfig } from "./config/env.js";
import { loadNavigation } from "../utils/navigation.js";

import { getGames } from "./api/api.games.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners } from "./api/api.owners.js";

import { gameCard } from "../components/cards/gameCard.js";

/* ============================================================
   NAV HELPERS
   ============================================================ */

window.goToTeam = teamId => {
  window.location.href = `team.html?team=${teamId}`;
};

window.goToOwner = ownerId => {
  window.location.href = `owner.html?owner=${ownerId}`;
};

/* ============================================================
   STATE
   ============================================================ */

let currentMonth = new Date().getMonth() + 1; // 1–12
let currentYear = new Date().getFullYear();
let initialized = false;

/* ============================================================
   FILTERS
   ============================================================ */

export function filterOwnedGames(games) {
  return games.filter(game =>
    !!game.homeTeam?.owner || !!game.awayTeam?.owner
  );
}

function filterByMonth(games) {
  return games.filter(game => {
    const d = new Date(game.date);
    return (d.getMonth() + 1) === currentMonth && d.getFullYear() === currentYear;
  });
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", async () => {
  if (initialized) return;
  initialized = true;

  await loadConfig();
  await loadNavigation();

  renderGamesPage(filterOwnedGames);
});

/* ============================================================
   PAGE RENDER
   ============================================================ */

export async function renderGamesPage(filterFn = null) {
  const games = await getGames();
  const teams = await getTeams();
  const owners = await getOwners();

  const safeGames = Array.isArray(games) ? games : [];

  // Apply filters
  let filtered = filterFn ? filterFn(safeGames) : safeGames;
  filtered = filterByMonth(filtered);

  const container = document.getElementById("content");

  const gameCardsHtml = filtered.map(game => {
    return gameCard(game, teams, "md");
  }).join("");

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

  /* -----------------------------
     MONTH NAVIGATION
     ----------------------------- */

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

  /* -----------------------------
     FILTER DROPDOWN
     ----------------------------- */

  const filterSelect = document.getElementById("games-filter");
  filterSelect.value = filterFn === filterOwnedGames ? "owned" : "all";

  filterSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    if (value === "owned") {
      renderGamesPage(filterOwnedGames);
    } else {
      renderGamesPage();
    }
  });
}
