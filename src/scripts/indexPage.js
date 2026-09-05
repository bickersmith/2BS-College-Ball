// src/scripts/indexPage.js

import { loadConfig } from "/src/scripts/config/env.js";
import { loadNavigation } from "/src/utils/navigation.js";

import { getOwners } from "/src/scripts/api/api.owners.js";
import { getTeams } from "/src/scripts/api/api.teams.js";
import { getGames } from "/src/scripts/api/api.games.js";
import { computeTeamStandings } from "/src/data/compute/computeTeamStandings.js";

/* ============================================================
   INDEX NAVIGATION
   ============================================================ */

async function loadNavigationForIndex() {
  await injectPartial("#header", "/src/components/header.html");
  await injectPartial("#navbar", "/src/components/navbar.html");
  await injectPartial("#footer", "/src/components/footer.html");
}

async function injectPartial(selector, path) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const response = await fetch(path);
    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Index navigation load failed for ${path}`, err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigationForIndex();
  renderIndexPage();
});

/* ============================================================
   UNIFIED GAME CARD (same style as gamesPage)
   ============================================================ */

function renderIndexGameCard(g, isRecent = false) {
  const away = g.awayTeam;
  const home = g.homeTeam;

  const date = g.dateFormatted;
  const score = isRecent ? `${g.score.away} - ${g.score.home}` : null;
//   <div class="game-team-name-lg">${away.teamName}</div>
//        <div class="game-team-name-lg">${home.teamName}</div>
  return `
    <a href="/src/pages/game.html?game=${g.gameId}" class="index-game-card-v2">

      <div class="game-logo-block">
        <img src="${away.teamLogo}" class="game-logo-lg">
     
      </div>

      <div class="game-at">@</div>

      <div class="game-logo-block">
        <img src="${home.teamLogo}" class="game-logo-lg">
      </div>

      <div class="game-meta-v2">
        <div class="game-date-lg">${date}</div>
        ${
          isRecent
            ? `<div class="game-score-lg">${score}</div>`
            : `<div class="game-time-lg">${g.timeFormatted || ""}</div>`
        }
      </div>

    </a>
  `;
}

/* ============================================================
   MAIN INDEX PAGE RENDER
   ============================================================ */

async function renderIndexPage() {
  const container = document.getElementById("content");

  const standings = await computeTeamStandings();
  const owners = await getOwners();
  const games = await getGames();

  /* ============================================================
     OWNER STANDINGS — PREMIUM CARD OUTPUT
     ============================================================ */

  const ownerStandings = owners
    .map(owner => {
      const ownerTeams = standings.filter(
        t => String(t.ownerId) === String(owner.id)
      );

      const totalGamePoints = ownerTeams.reduce(
        (sum, t) => sum + Number(t.totalGamePoints || 0),
        0
      );

      return {
        owner,
        totalGamePoints,
        teamCount: ownerTeams.length,
        teams: ownerTeams
      };
    })
    .sort((a, b) => b.totalGamePoints - a.totalGamePoints);

const ownerStandingsHTML = ownerStandings
    .map((s, idx) => {
      const teamsList = s.teams
        .map(t => `
          <li class="owner-team-item">
            <a href="/src/pages/team.html?team=${t.teamId}">
              ${t.teamName}
            </a>
          </li>
        `)
        .join("");

      return `
        <a href="/src/pages/owner.html?owner=${s.owner.id}" class="owner-card-link">
          <div class="owner-card">

            <div class="owner-col owner-col-left">
              <div class="owner-rank">#${idx + 1}</div>
            </div>

            <div class="owner-col owner-col-center">
              <div class="owner-name">${s.owner.name}</div>
              <div class="owner-sub">${s.teamCount} Teams • ${s.totalGamePoints} GPts</div>


            </div>

            <div class="owner-col owner-col-right">
              <div class="owner-total-label">Total Points</div>
              <div class="owner-total-value">${s.totalGamePoints}</div>
            </div>

          </div>
        </a>
      `;
    })
    .join("");

  /* ============================================================
     OWNED TEAM FILTER
     ============================================================ */

  const ownerIds = owners.map(o => String(o.id));
  const now = new Date();

  function gameHasOwner(g) {
    return (
      ownerIds.includes(String(g.homeTeam.ownerId)) ||
      ownerIds.includes(String(g.awayTeam.ownerId))
    );
  }

  /* ============================================================
     NEXT FIVE GAMES
     ============================================================ */

  const upcoming = games
    .filter(gameHasOwner)
    .filter(g => new Date(g.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const nextFiveHTML = upcoming
    .map(g => renderIndexGameCard(g, false))
    .join("");

  /* ============================================================
     RECENT FIVE GAMES
     ============================================================ */

  const recent = games
    .filter(gameHasOwner)
    .filter(g => new Date(g.date) <= now && g.updateFlag !== "NEW")
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const recentFiveHTML = recent
    .map(g => renderIndexGameCard(g, true))
    .join("");

  /* ============================================================
     FINAL INDEX DASHBOARD
     ============================================================ */

  container.innerHTML = `
    <div class="index-dashboard">

      <!-- OWNER STANDINGS -->
      <section class="index-module owner-standings-section">
        <div class="owner-standings-grid">
          ${ownerStandingsHTML}
        </div>
      </section>

      <!-- NEXT FIVE GAMES -->
      <section class="index-module">
        <h2>Next Five Games</h2>
        <div class="index-games-grid">
          ${nextFiveHTML}
        </div>
      </section>

      <!-- RECENT FIVE GAMES -->
      <section class="index-module">
        <h2>Recent Games</h2>
        <div class="index-games-grid">
          ${recentFiveHTML}
        </div>
      </section>

    </div>
  `;
}
