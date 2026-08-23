// ===============================
// 2BS College Ball — team.js
// Team Profile Page Logic
// ===============================

import { fetchSheet } from "../scripts/fetchSheet.js";

async function loadTeamPage() {
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get("team");

  const teams = await fetchSheet("Teams");
  const scores = await fetchSheet("Scores");

  const team = teams.find(t => t.id == teamId);
  if (!team) return;

  const ownerName = team.ownerName || "Unowned";

  // HERO SECTION
  const hero = document.getElementById("team-hero");
  hero.innerHTML = `
    <div class="team-hero-card">
      <img src="${team.logoUrl}" class="logo-xl" alt="${team.teamSchool}">
      <div class="team-hero-name">${team.teamSchool}</div>
      <div class="team-hero-owner">
        Owned by:
        <a href="./owner.html?owner=${team.ownerId}" class="owner-name-highlight">
          ${ownerName}
        </a>
      </div>
    </div>
  `;

  // TEAM DATA SECTION
  const data = document.getElementById("team-data");
  data.innerHTML = `
    <div class="team-data-row"><strong>School:</strong> ${team.teamSchool}</div>
    <div class="team-data-row"><strong>Nickname:</strong> ${team.teamNickname}</div>
    <div class="team-data-row"><strong>Conference:</strong> ${team.conference}</div>
    <div class="team-data-row"><strong>Location:</strong> ${team.location}</div>
    <div class="team-data-row"><strong>Stadium:</strong> ${team.stadium || "—"}</div>
    <div class="team-data-row"><strong>Coach:</strong> ${team.coach || "—"}</div>
    <div class="team-data-row"><strong>Colors:</strong> ${team.colors || "—"}</div>
    <div class="team-data-row"><strong>Mascot:</strong> ${team.mascot || "—"}</div>
    <div class="team-data-row"><strong>AP Rank:</strong> ${team.apRank || "—"}</div>
    <div class="team-data-row"><strong>Conference Rank:</strong> ${team.confRank || "—"}</div>
  `;

  // FILTER ALL GAMES FOR THIS TEAM
  const teamGames = scores.filter(g => g.teamId == teamId);

  // NEXT 5 GAMES
  const upcoming = teamGames
    .filter(g => new Date(g.gameDate) >= new Date())
    .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate))
    .slice(0, 5);

  const nextGamesContainer = document.getElementById("team-next-games");
  nextGamesContainer.innerHTML = upcoming
    .map(g => renderGameCard(g, teams))
    .join("");

  // FULL SCHEDULE
  const fullScheduleContainer = document.getElementById("team-full-schedule");
  fullScheduleContainer.innerHTML = teamGames
    .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate))
    .map(g => renderScheduleRow(g, teams))
    .join("");
}

// ===============================
// GAME CARD
// ===============================

function renderGameCard(g, teams) {
  const team = teams.find(t => t.id == g.teamId);
  const opp = teams.find(t => t.id == g.opponentId);

  const dateLabel = new Date(g.gameDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  const rivalry =
    team?.ownerId &&
    opp?.ownerId &&
    team.ownerId !== opp.ownerId;

  return `
    <div class="card-sm next-game-card">

      ${rivalry ? `<div class="next-game-rivalry">RIVALRY</div>` : ""}

      <div class="next-game-top">
        <div class="next-game-team">
          <a href="./team.html?team=${team.id}">
            <img src="${team.logoUrl}" class="logo-sm">
          </a>
          <a href="./team.html?team=${team.id}" class="next-game-name">${team.teamSchool}</a>
        </div>

        <div class="next-game-vs">vs</div>

        <div class="next-game-team">
          <a href="./team.html?team=${opp?.id || ""}">
            <img src="${opp?.logoUrl || ""}" class="logo-sm">
          </a>
          <a href="./team.html?team=${opp?.id || ""}" class="next-game-name">
            ${opp?.teamSchool || g.opponent}
          </a>
        </div>
      </div>

      <div class="next-game-bottom">
        <div class="next-game-date">${dateLabel}</div>
        <div class="next-game-location">${g.gameVenue} — ${g.gameLocation}</div>
      </div>

    </div>
  `;
}

// ===============================
// FULL SCHEDULE ROW
// ===============================

function renderScheduleRow(g, teams) {
  const team = teams.find(t => t.id == g.teamId);
  const opp = teams.find(t => t.id == g.opponentId);

  const dateLabel = new Date(g.gameDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  const rivalry =
    team?.ownerId &&
    opp?.ownerId &&
    team.ownerId !== opp.ownerId;

  return `
    <div class="schedule-row">

      <div class="schedule-date">${dateLabel}</div>

      <div class="schedule-team">
        <a href="./team.html?team=${team.id}">
          <img src="${team.logoUrl}" class="logo-sm">
        </a>
        <a href="./team.html?team=${team.id}" class="schedule-team-name">${team.teamSchool}</a>
      </div>

      <div class="schedule-vs">vs</div>

      <div class="schedule-team">
        <a href="./team.html?team=${opp?.id || ""}">
          <img src="${opp?.logoUrl || ""}" class="logo-sm">
        </a>
        <a href="./team.html?team=${opp?.id || ""}" class="schedule-team-name">
          ${opp?.teamSchool || g.opponent}
        </a>
      </div>

      ${rivalry ? `<div class="schedule-rivalry">RIVALRY</div>` : ""}

    </div>
  `;
}

loadTeamPage();
