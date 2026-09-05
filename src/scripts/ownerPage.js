// src/pages/ownerPage.js

import { loadConfig } from "./config/env.js";
import { getOwners } from "./api/api.owners.js";
import { getTeams } from "./api/api.teams.js";
import { getGames } from "./api/api.games.js";

import { composeOwnerDashboard } from "../data/compose/composeOwnerDashboard.js";

import { ownerCard } from "../components/cards/ownerCard.js";
import { renderActivityFeed } from "../components/cards/ownerActivityCard.js";
import { gameCard } from "../components/cards/gameCard.js";

import { loadNavigation } from "../utils/navigation.js";
import { computeTeamStandings } from "../data/compute/computeTeamStandings.js";

// ------------------------------------------------------
// BOOTSTRAP
// ------------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  await loadNavigation();
  await loadConfig();
  renderOwnerPage();
});

window.goToTeam = function(teamId) {
  window.location.href = `team.html?team=${teamId}`;
};

window.goToOwner = function(ownerId) {
  window.location.href = `owner.html?owner=${ownerId}`;
};

window.goToGame = function(gameId) {
  window.location.href = `game.html?game=${gameId}`;
};

// ------------------------------------------------------
// URL PARAM
// ------------------------------------------------------
function getOwnerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("owner");
}

// ------------------------------------------------------
// MAIN PAGE RENDER
// ------------------------------------------------------
export async function renderOwnerPage() {
  const ownerId = getOwnerIdFromUrl();
  const container = document.getElementById("content");

  // ---------------------------------------------
  // LOAD DATA
  // ---------------------------------------------
  const [owners, teams, games] = await Promise.all([
    getOwners(),
    getTeams(),
    getGames()   // ⭐ normalized games from composeGame()
  ]);

  // ---------------------------------------------
  // FIND OWNER
  // ---------------------------------------------
  const owner = owners.find(o => String(o.id) === String(ownerId));

  if (!owner) {
    container.innerHTML = `<h1>Owner Not Found</h1>`;
    return;
  }

  // ---------------------------------------------
  // NORMALIZED TEAM STANDINGS
  // ---------------------------------------------
  const fullStandings = await computeTeamStandings();

  const ownerTeams = fullStandings.filter(
    t => String(t.ownerId) === String(ownerId)
  );

  ownerTeams.sort((a, b) => b.totalGamePoints - a.totalGamePoints);

  const ownerTeamIds = ownerTeams.map(t => String(t.teamId));

  // ---------------------------------------------
  // OWNER GAMES (using normalized composeGame objects)
  // ---------------------------------------------
  const ownerGames = games.filter(g =>
    ownerTeamIds.includes(String(g.homeTeam.teamId)) ||
    ownerTeamIds.includes(String(g.awayTeam.teamId))
  );

  // Sort by date
  const sortedGames = ownerGames.slice().sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const now = new Date();

  const nextFive = sortedGames.filter(g => new Date(g.date) >= now).slice(0, 5);
  const recentFive = sortedGames.filter(g => new Date(g.date) < now).slice(-5).reverse();

  // ---------------------------------------------
  // BUILD DASHBOARD OBJECT
  // ---------------------------------------------
  const dashboard = composeOwnerDashboard({
    owner,
    teams: ownerTeams,
    games: ownerGames,
    awards: [],
    draft: [],
    storylines: {}
  });

  // ---------------------------------------------
  // PAGE HEADER      
 //   <div class="owner-card-wrapper">
 //     ${ownerCard(owner, ownerTeams, "xl")}
//    </div>
 //   <h2 class="section-title">Team Standings</h2>
    //    <h2 class="section-title">Activity</h2>
     // <section id="owner-activity"></section>
  // ---------------------------------------------
  container.innerHTML = `

<h1 class="page-title">${owner.name}</h1>



    <section id="owner-team-standings"></section>

    <h2 class="section-title">Next Five Games</h2>
    <section id="owner-next-games"></section>

    <h2 class="section-title">Recent Games</h2>
    <section id="owner-recent-games"></section>


  `;

  // ---------------------------------------------
  // TEAM STANDINGS TABLE
  // ---------------------------------------------
  const standingsHTML = `
    <table class="owner-team-standings-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Logo</th>
          <th>Team</th>
          <th>GPts</th>
          <th>W</th>
          <th>L</th>
          <th>PF</th>
          <th>PA</th>
          <th>Diff</th>
          <th>Streak</th>
        </tr>
      </thead>
      <tbody>
        ${ownerTeams.map(t => `
          <tr onclick="goToTeam(${t.teamId})">
            <td>${t.rank}</td>
            <td><img src="${t.teamLogo}" class="team-logo-sm"></td>
            <td>${t.teamName}</td>
            <td>${t.totalGamePoints}</td>
            <td>${t.wins}</td>
            <td>${t.losses}</td>
            <td>${t.pf}</td>
            <td>${t.pa}</td>
            <td>${t.diff}</td>
            <td>${t.streak || "—"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  document.getElementById("owner-team-standings").innerHTML = standingsHTML;

// NEXT FIVE GAMES
document.getElementById("owner-next-games").innerHTML =
  nextFive.length === 0
    ? `<p>No upcoming games.</p>`
    : `<div class="owner-games-grid">
         ${nextFive.map(g => gameCard(g, teams, "sm")).join("")}
       </div>`;

// RECENT FIVE GAMES
document.getElementById("owner-recent-games").innerHTML =
  recentFive.length === 0
    ? `<p>No recent games.</p>`
    : `<div class="owner-games-grid">
         ${recentFive.map(g => gameCard(g, teams, "sm")).join("")}
       </div>`;

  // ---------------------------------------------
  // ACTIVITY FEED
  // ---------------------------------------------
  renderActivityFeed(dashboard.activity);
}
