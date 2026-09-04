import { loadConfig } from "/src/scripts/config/env.js";
import { loadNavigation } from "/src/utils/navigation.js";

import { getOwners } from "/src/scripts/api/api.owners.js";
import { getTeams } from "/src/scripts/api/api.teams.js";
import { getGames } from "/src/scripts/api/api.games.js";

/* ============================================================
   INDEX NAVIGATION (special pathing rules)
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
   MAIN INDEX PAGE RENDER
   ============================================================ */

async function renderIndexPage() {
  const container = document.getElementById("content");

  const owners = await getOwners();
  const teams = await getTeams();
  const games = await getGames();

  /* ============================================================
   OWNER STANDINGS (compact, includes total game points)
   ============================================================ */

/* ============================================================
   OWNER STANDINGS (correct GamePoints totals)
   ============================================================ */

/* ============================================================
   OWNER STANDINGS (compact, includes total game points)
   ============================================================ */

const ownerStandings = owners
  .map(owner => {
    const ownerTeams = teams.filter(t => String(t.ownerId) === String(owner.id));

    // ✅ Match standings page: use t.totalGamePoints
    const totalGamePoints = ownerTeams.reduce(
      (sum, t) => sum + Number(t.totalGamePoints || 0),
      0
    );

    return {
      owner,
      totalGamePoints,
      teamCount: ownerTeams.length
    };
  })
  .sort((a, b) => b.totalGamePoints - a.totalGamePoints);

const ownerStandingsHTML = ownerStandings
  .map(s => `
    <tr>
      <td><a href="/src/pages/owner.html?owner=${s.owner.id}">${s.owner.name}</a></td>
      <td>${s.teamCount}</td>
      <td>${s.totalGamePoints}</td>
    </tr>
  `)
  .join("");


  /* ============================================================
     OWNED TEAM FILTER (strict owner check)
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
     NEXT FIVE GAMES (owned teams only)
     ============================================================ */

  const upcoming = games
    .filter(gameHasOwner)
    .filter(g => new Date(g.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const nextFiveHTML = upcoming
    .map(g => `
      <div class="mini-game-card">
        <a href="/src/pages/game.html?game=${g.gameId}">
          <div class="mini-game-row">
            <span>${g.dateFormatted}</span>
            <span>${g.homeTeam.teamName} vs ${g.awayTeam.teamName}</span>
          </div>
        </a>
      </div>
    `)
    .join("");

  /* ============================================================
     RECENT FIVE GAMES (owned teams only)
     ============================================================ */

  const recent = games
    .filter(gameHasOwner)
    .filter(g => new Date(g.date) <= now && g.updateFlag !== "NEW")
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const recentFiveHTML = recent
    .map(g => `
      <div class="mini-game-card">
        <a href="/src/pages/game.html?game=${g.gameId}">
          <div class="mini-game-row">
            <span>${g.dateFormatted}</span>
            <span>${g.homeTeam.teamName} ${g.score.home} - ${g.score.away} ${g.awayTeam.teamName}</span>
          </div>
        </a>
      </div>
    `)
    .join("");

  /* ============================================================
     FINAL INDEX DASHBOARD LAYOUT
     ============================================================ */

  container.innerHTML = `
    <div class="index-dashboard">

      <!-- OWNER STANDINGS -->
      <section class="index-module">
        <h2>Owner Standings</h2>
        <table class="index-table">
          <thead>
            <tr>
              <th>Owner</th>
              <th>Teams</th>
              <th>Game Points</th>
            </tr>
          </thead>
          <tbody>
            ${ownerStandingsHTML}
          </tbody>
        </table>
      </section>

      <!-- NEXT FIVE GAMES -->
      <section class="index-module">
        <h2>Next Five Games</h2>
        ${nextFiveHTML}
      </section>

      <!-- RECENT FIVE GAMES -->
      <section class="index-module">
        <h2>Recent Games</h2>
        ${recentFiveHTML}
      </section>

    </div>
  `;
}
