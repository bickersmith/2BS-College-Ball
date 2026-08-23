// ===============================
// 2BS College Ball — owner.js
// Owner Profile Page Logic
// ===============================

import { fetchSheet } from "../scripts/fetchSheet.js";

async function loadOwnerPage() {
  const params = new URLSearchParams(window.location.search);
  const ownerId = params.get("owner");

  const teams = await fetchSheet("Teams");
  const scores = await fetchSheet("Scores");

  const ownedTeams = teams.filter(t => t.ownerId == ownerId);
  if (ownedTeams.length === 0) return;

  const ownerName = ownedTeams[0].ownerName;

  // HERO SECTION
  const hero = document.getElementById("owner-hero");
  hero.innerHTML = `
    <div class="owner-hero-card">
      <a href="./owner.html?owner=${ownerId}" class="owner-name-highlight">
        ${ownerName}
      </a>
    </div>
  `;

// OWNED TEAMS (large logos)
const teamList = document.getElementById("owner-teams");
teamList.innerHTML = ownedTeams
  .map(
    t => `
    <a href="./team.html?team=${t.id}" class="owner-team-logo-link-lg">
      <img src="${t.logoUrl}" class="logo-lg" alt="${t.teamSchool}">
    </a>
  `
  )
  .join("");

  // FILTER ALL GAMES FOR THIS OWNER
  const ownerGames = scores.filter(g => {
    const team = teams.find(t => t.id == g.teamId);
    return team?.ownerId == ownerId;
  });

  // NEXT 5 GAMES
  const upcoming = ownerGames
    .filter(g => new Date(g.gameDate) >= new Date())
    .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate))
    .slice(0, 5);

  const nextGamesContainer = document.getElementById("owner-next-games");
  nextGamesContainer.innerHTML = upcoming
    .map(g => renderGameCard(g, teams))
    .join("");

  // FULL SCHEDULE
  const fullScheduleContainer = document.getElementById("owner-full-schedule");
  fullScheduleContainer.innerHTML = ownerGames
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

loadOwnerPage();
