// ===============================
// 2BS College Ball — rivalries.js
// Rivalry Page Logic
// ===============================

import { fetchSheet } from "../scripts/fetchSheet.js";

async function loadRivalries() {
  const teams = await fetchSheet("Teams");
  const scores = await fetchSheet("Scores");

  // Identify rivalry games (different owner IDs)
  const rivalryGamesRaw = scores.filter(g => {
    const team = teams.find(t => t.id == g.teamId);
    const opp = teams.find(t => t.id == g.opponentId);
    return team?.ownerId && opp?.ownerId && team.ownerId !== opp.ownerId;
  });

  // ⭐ DEDUPE BY GAME ID
  const rivalryGames = Array.from(
    new Map(rivalryGamesRaw.map(g => [g.gameId, g])).values()
  );

  const container = document.getElementById("rivalry-list");

  container.innerHTML = rivalryGames
    .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate))
    .map(g => renderRivalryCard(g, teams))
    .join("");
}

function renderRivalryCard(g, teams) {
  const team = teams.find(t => t.id == g.teamId);
  const opp = teams.find(t => t.id == g.opponentId);

  const dateLabel = new Date(g.gameDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  return `
    <a href="./game.html?game=${g.gameId}" class="rivalry-card">

      <div class="rivalry-badge">RIVALRY</div>

      <div class="rivalry-teams">

        <div class="rivalry-team">
          <img src="${team.logoUrl}" class="logo-sm">
          <div class="rivalry-team-name">${team.teamSchool}</div>
        </div>

        <div class="rivalry-vs">vs</div>

        <div class="rivalry-team">
          <img src="${opp.logoUrl}" class="logo-sm">
          <div class="rivalry-team-name">${opp.teamSchool}</div>
        </div>

      </div>

      <div class="rivalry-info">
        <div class="rivalry-date">${dateLabel}</div>
        <div class="rivalry-location">${g.gameVenue} — ${g.gameLocation}</div>
      </div>

    </a>
  `;
}

loadRivalries();
