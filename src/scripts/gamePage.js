// src/scripts/gamePage.js

import { log } from "../scripts/diagnostics/logger.js";
import { loadConfig } from "./config/env.js";
import { getOwners } from "./api/api.owners.js";
import { getTeams } from "./api/api.teams.js";
import { getGame } from "./api/api.games.js";
import { loadNavigation } from "../utils/navigation.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigation();
  renderGamePage();
});

window.goToTeam = teamId => {
  window.location.href = `team.html?team=${teamId}`;
};

window.goToOwner = ownerId => {
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

  // ============================================================
  // USE REAL NORMALIZED FLAGS
  // ============================================================

  const flags = {
    Win: game.win,
    Loss: game.loss,

    BlowoutWin: game.blowoutWin,
    CloseWin: game.closeWin,
    ShutoutWin: game.shutoutWin,
    OTWin: game.otWin,
    OTLoss: game.otLoss,

    BeatTop10: game.beatTop10,
    BeatTop25: game.beatTop25,

    RivalWin: game.rivalWin,
    RivalLoss: game.rivalLoss
  };

  log("GAME PAGE flags =", flags);

  // ============================================================
  // BREAKDOWN RENDERER (Unified)
  // ============================================================

  function getBreakdownItems(game, isWinner) {
    const breakdownFlags = [
      { key: "win", label: "Win (+3)", winnerOnly: true },
      { key: "loss", label: "Loss (–2)", winnerOnly: false },

      { key: "blowoutWin", label: "Blowout Win (+2)", winnerOnly: true },
      { key: "closeWin", label: "Close Win (+1)", winnerOnly: true },
      { key: "shutoutWin", label: "Shutout Win (+3)", winnerOnly: true },
      { key: "otWin", label: "OT Win (+3)", winnerOnly: true },
      { key: "otLoss", label: "OT Loss (+1)", winnerOnly: false },

      { key: "beatTop10", label: "Beat Top 10 (+5)", winnerOnly: true },
      { key: "beatTop25", label: "Beat Top 25 (+2)", winnerOnly: true },

      { key: "rivalWin", label: "Rival Win (+3)", winnerOnly: true },
      { key: "rivalLoss", label: "Rival Loss (–3)", winnerOnly: false }
    ];

    return breakdownFlags
      .filter(f => {
        const val = game[f.key];
        if (!val) return false;
        return f.winnerOnly ? isWinner : !isWinner;
      })
      .map(f => `<li>${f.label}</li>`)
      .join("");
  }

  // ============================================================
  // RECOMPUTE TEAM POINTS
  // ============================================================

  function computeTeamPoints(isWinner) {
    let pts = 0;

    // Outcome
    pts += isWinner ? 3 : -2;

    // Style bonuses
    if (isWinner && flags.BlowoutWin) pts += 2;
    if (isWinner && flags.CloseWin) pts += 1;
    if (isWinner && flags.ShutoutWin) pts += 3;
    if (isWinner && flags.OTWin) pts += 3;
    if (!isWinner && flags.OTLoss) pts += 1;

    // Ranked bonuses
    if (isWinner && flags.BeatTop10) pts += 5;
    if (isWinner && flags.BeatTop25) pts += 2;

    // Rivalry
    if (isWinner && flags.RivalWin) pts += 3;
    if (!isWinner && flags.RivalLoss) pts -= 3;

    return pts;
  }

  const awayPoints = computeTeamPoints(game.score.away > game.score.home);
  const homePoints = computeTeamPoints(game.score.home > game.score.away);

  const container = document.getElementById("content");

  // ============================================================
  // HERO CARD
  // ============================================================

  container.innerHTML = `
    <div class="game-hero-card">

      <div class="game-hero-header">

        <a href="team.html?team=${away.teamId}" class="team-block away">
          <img src="${away.teamLogo}" class="team-logo-xl">
          <div class="team-name-xl">${away.teamName}</div>
        </a>

        <div class="vs-block">
          <div class="vs-text">AT</div>
          <div class="game-date-xl">${game.dateFormatted}</div>
        </div>

        <a href="team.html?team=${home.teamId}" class="team-block home">
          <img src="${home.teamLogo}" class="team-logo-xl">
          <div class="team-name-xl">${home.teamName}</div>
        </a>

      </div>

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

  // ============================================================
  // TEAM POINTS BREAKDOWN
  // ============================================================

  const teamBreakdown = [
    {
      name: away.teamName,
      points: awayPoints,
      isWinner: game.score.away > game.score.home
    },
    {
      name: home.teamName,
      points: homePoints,
      isWinner: game.score.home > game.score.away
    }
  ].sort((a, b) => b.points - a.points);

  container.innerHTML += `
    <div class="game-two-col">

      <section class="detail-card flex-2">
        <h2>Game Details</h2>

        <div class="detail-grid">
          <div><strong>Away Team</strong></div><div>${away.teamName}</div>
          <div><strong>Home Team</strong></div><div>${home.teamName}</div>
          <div><strong>Date</strong></div><div>${game.dateFormatted}</div>
          <div><strong>Venue</strong></div><div>${game.venue}</div>
          <div><strong>Location</strong></div><div>${game.location}</div>
          <div><strong>Neutral Site</strong></div><div>${game.neutral ? "Yes" : "No"}</div>
          <div><strong>Broadcast</strong></div><div>${game.broadcast || "N/A"}</div>
          <div><strong>Weather</strong></div><div>${game.weather || "N/A"}</div>
          <div><strong>Temperature</strong></div><div>${game.temperature || "N/A"}</div>
          <div><strong>Conditions</strong></div><div>${game.conditions || "N/A"}</div>
        </div>
      </section>

      <section class="detail-card flex-1">
        <h2>Game Points Breakdown</h2>

        <div class="team-points-grid">
          ${teamBreakdown.map(t => `
            <div class="team-points-card">
              <h3>${t.name}</h3>
              <div class="team-total-points"><strong>${t.points} pts</strong></div>

              <ul class="team-points-list">
                ${getBreakdownItems(game, t.isWinner)}
              </ul>
            </div>
          `).join("")}
        </div>
      </section>

    </div>
  `;
}
