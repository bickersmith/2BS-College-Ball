// src/scripts/gamePage.js

import { log } from "../scripts/diagnostics/logger.js";
import { loadConfig } from "./config/env.js";
import { getOwners } from "./api/api.owners.js";
import { getTeams } from "./api/api.teams.js";
import { getGames, getGame } from "./api/api.games.js";
import { gameCard } from "../components/cards/gameCard.js";
import { loadNavigation } from "../utils/navigation.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigation();
  renderGamePage();
});


window.goToTeam = function(teamId) {
  window.location.href = `team.html?team=${teamId}`;
};

window.goToOwner = function(ownerId) {
  window.location.href = `owner.html?owner=${ownerId}`;
};

export async function renderGamePage() {

  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("game");

  log("GAME PAGE", `gameId = ${gameId}`);

  const game = await getGame(gameId);
  const teams = await getTeams();
  const owners = await getOwners();

  if (!game) {
    document.getElementById("content").innerHTML = `<h1>Game Not Found</h1>`;
    return;
  }

  const home = game.homeTeam;
  const away = game.awayTeam;

  const container = document.getElementById("content");

  // ============================
  // HERO CARD
  // ============================

  container.innerHTML = `
  <div class="game-hero-card">

    <div class="game-hero-header">

      <!-- AWAY TEAM -->
      <a href="team.html?team=${away.teamId}" class="team-block away">
        <img src="${away.teamLogo}" class="team-logo-xl">
        <div class="team-name-xl">${away.teamName}</div>
      </a>

      <!-- CENTER VS BLOCK -->
      <div class="vs-block">
        <div class="vs-text">AT</div>
        <div class="game-date-xl">${game.dateFormatted}</div>
      </div>

      <!-- HOME TEAM -->
      <a href="team.html?team=${home.teamId}" class="team-block home">
        <img src="${home.teamLogo}" class="team-logo-xl">
        <div class="team-name-xl">${home.teamName}</div>
      </a>

    </div>

    <!-- BIGGER SCORE -->
    <div class="game-hero-score">
      <span class="score-away">${game.score.away}</span>
      <span class="score-dash">–</span>
      <span class="score-home">${game.score.home}</span>
    </div>

    <div class="game-hero-meta">
      <span>${game.venue}</span>
      <span>•</span>
      <span>${game.location}</span>
    </div>

  </div>
`;


  // ============================
  // FULL GAME DETAILS
  // ============================
  
  


  container.innerHTML += `
  <div class="game-detail">

    <!-- TOP ROW: MATCHUP + SCORE -->
    <section class="detail-row">
      <div class="detail-card flex-2">
        <h2>Matchup</h2>
        <div class="detail-grid">
          <div><strong>Away</strong></div><div>${away.teamName}</div>
          <div><strong>Home</strong></div><div>${home.teamName}</div>
          <div><strong>Date</strong></div><div>${game.dateFormatted}</div>
        </div>
      </div>

      <div class="detail-card flex-1">
        <h2>Score</h2>
        <div class="detail-grid">
          <div><strong>${away.teamName}</strong></div><div>${game.score.away}</div>
          <div><strong>${home.teamName}</strong></div><div>${game.score.home}</div>
        </div>
      </div>
    </section>

    <!-- SECOND ROW: WEATHER / BROADCAST / OWNERS -->
    <section class="detail-row">
      <div class="detail-card flex-1">
        <h2>Weather</h2>
        <div class="detail-grid">
          <div><strong>Weather</strong></div><div>${game.weather || "N/A"}</div>
          <div><strong>Temp</strong></div><div>${game.temperature || "N/A"}</div>
          <div><strong>Conditions</strong></div><div>${game.conditions || "N/A"}</div>
        </div>
      </div>

      <div class="detail-card flex-1">
        <h2>Broadcast</h2>
        <div class="detail-grid">
          <div><strong>Network</strong></div><div>${game.broadcast || "N/A"}</div>
        </div>
      </div>

      <div class="detail-card flex-1">
        <h2>Owners</h2>
        <div class="detail-grid">
          <div><strong>Away Owner</strong></div>
          <div>${away.owner ? away.owner.name : "None"}</div>

          <div><strong>Home Owner</strong></div>
          <div>${home.owner ? home.owner.name : "None"}</div>
        </div>
      </div>
    </section>

    <!-- THIRD ROW: VENUE + SEASON INFO -->
    <section class="detail-row">
      <div class="detail-card flex-1">
        <h2>Venue</h2>
        <div class="detail-grid">
          <div><strong>Venue</strong></div><div>${game.venue}</div>
          <div><strong>Neutral</strong></div><div>${game.neutral ? "Yes" : "No"}</div>
        </div>
      </div>

      <div class="detail-card flex-2">
        <h2>Season Info</h2>
        <div class="detail-grid">
          <div><strong>Season</strong></div><div>${game.season}</div>
          <div><strong>Week</strong></div><div>${game.week}</div>
          <div><strong>Game Type</strong></div><div>${game.gameType}</div>
          <div><strong>Postseason</strong></div><div>${game.postseasonType || "N/A"}</div>
          <div><strong>Flags</strong></div><div>${game.postseasonFlags || "None"}</div>
        </div>
      </div>
    </section>

    <!-- LOCATION -->
    <section class="detail-card">
      <h2>Location</h2>
      <p>${game.location}</p>
    </section>

    <!-- SUMMARY -->
    <section class="detail-card">
      <h2>Summary</h2>
      <p>${game.summary || "No summary available."}</p>
    </section>

    <!-- DESCRIPTION -->
    <section class="detail-card">
      <h2>Description</h2>
      <p>${game.description || "No description available."}</p>
    </section>

    <!-- NOTES -->
    <section class="detail-card">
      <h2>Notes</h2>
      <p>${game.notes || "No notes available."}</p>
    </section>

    <hr>
    <p><a href="games.html">Back to Games</a></p>

  </div>
`;

}
