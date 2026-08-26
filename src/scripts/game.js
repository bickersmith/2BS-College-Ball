// ===============================
// 2BS College Ball — game.js
// Game Detail Page Logic
// ===============================

import { fetchSheet } from "../scripts/fetchSheet.js";

async function loadGamePage() {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("game");

  const teams = await fetchSheet("Teams");
  const scores = await fetchSheet("Scores");

  const game = scores.find(g => g.gameId == gameId);
  if (!game) return;

  const team = teams.find(t => t.id == game.teamId);
  const opp = teams.find(t => t.id == game.opponentId);

  const teamLogo = team?.logoUrl || "";
  const oppLogo = opp?.logoUrl || "";

  const teamName = team?.teamSchool || "";
  const oppName = opp?.teamSchool || game.opponent;

  const teamScore = game.schoolScore ?? "—";
  const oppScore = game.opponentScore ?? "—";

  const rivalry =
    team?.ownerId &&
    opp?.ownerId &&
    team.ownerId !== opp.ownerId;

  const dateLabel = new Date(game.gameDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  const timeLabel = game.gameTime || "";

  // HERO SECTION
  const hero = document.getElementById("game-hero");
  hero.innerHTML = `
    <div class="game-hero-card">

      ${rivalry ? `<div class="game-rivalry-badge">RIVALRY</div>` : ""}

      <div class="game-hero-logos">
        <div class="game-team-side">
          <img src="${teamLogo}" class="logo-xl">
          <a href="./team.html?team=${team.id}" class="game-team-name">${teamName}</a>
        </div>

        <div class="game-vs">vs</div>

        <div class="game-team-side">
          <img src="${oppLogo}" class="logo-xl">
          <a href="./team.html?team=${opp?.id || ""}" class="game-team-name">${oppName}</a>
        </div>
      </div>

      <div class="game-scoreline">
        <span class="game-score ${teamScore > oppScore ? "score-win" : ""}">
          ${teamScore}
        </span>
        –
        <span class="game-score ${oppScore > teamScore ? "score-win" : ""}">
          ${oppScore}
        </span>
      </div>

    </div>
  `;

  // META SECTION
  const meta = document.getElementById("game-meta");
  meta.innerHTML = `
    <div class="game-meta-row"><strong>Date:</strong> ${dateLabel}</div>
    <div class="game-meta-row"><strong>Time:</strong> ${timeLabel}</div>
    <div class="game-meta-row"><strong>Venue:</strong> ${game.gameVenue}</div>
    <div class="game-meta-row"><strong>Location:</strong> ${game.gameLocation}</div>
  `;

  // TEAM SECTION
  const teamBox = document.getElementById("game-teams");
  teamBox.innerHTML = `
    <div class="game-team-info">
      <h3>${teamName}</h3>
      <div><strong>Owner:</strong> 
        <a href="./owner.html?owner=${team.ownerId}" class="owner-name-highlight">
          ${team.ownerName}
        </a>
      </div>
      <div><strong>Conference:</strong> ${team.conference}</div>
      <div><strong>Location:</strong> ${team.location}</div>
      <div><strong>Coach:</strong> ${team.coach || "—"}</div>
    </div>

    <div class="game-team-info">
      <h3>${oppName}</h3>
      <div><strong>Owner:</strong> 
        <a href="./owner.html?owner=${opp?.ownerId || ""}" class="owner-name-highlight">
          ${opp?.ownerName || "Unowned"}
        </a>
      </div>
      <div><strong>Conference:</strong> ${opp?.conference || "—"}</div>
      <div><strong>Location:</strong> ${opp?.location || "—"}</div>
      <div><strong>Coach:</strong> ${opp?.coach || "—"}</div>
    </div>
  `;
}

loadGamePage();
