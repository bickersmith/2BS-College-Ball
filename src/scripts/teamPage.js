// src/scripts/teamPage.js

import { loadConfig } from "./config/env.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners } from "./api/api.owners.js";
import { getGamesByTeam } from "./api/api.games.js";
import { loadNavigation } from "../utils/navigation.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigation();
  renderTeamPage();
});

function getTeamIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("team");
}

export async function renderTeamPage() {
  const teamId = getTeamIdFromUrl();

  const teams = await getTeams();
  const owners = await getOwners();
  const games = await getGamesByTeam(teamId);

  const team = teams.find(t => String(t.teamId) === String(teamId));
  const container = document.getElementById("content");

  if (!team) {
    container.innerHTML = `<h1>Team Not Found</h1>`;
    return;
  }

  const owner = team.owner;

  /* ============================================================
     HERO TEAM HEADER
     ============================================================ */

  container.innerHTML = `
    <div class="team-hero-card">

      <div class="team-hero-header">

        <a href="team.html?team=${team.teamId}" class="team-hero-logo-block">
          <img src="${team.teamLogo}" class="team-logo-xl">
        </a>

        <div class="team-hero-info">
          <h1 class="team-hero-name">${team.teamName}</h1>
          <div class="team-hero-subtitle">${team.teamSchool} • ${team.teamNickname}</div>
          <div class="team-hero-location">${team.teamLocation}</div>
        </div>

        <a href="team.html?team=${team.teamId}" class="team-hero-helmet-block">
          <img src="${team.teamHelmet}" class="team-helmet-xl">
        </a>

      </div>

      <div class="team-hero-meta">
        <span>${team.teamFounded}</span>
        <span>•</span>
        <span>${team.teamConference}${team.teamDivision ? " • " + team.teamDivision : ""}</span>
        </div>

    </div>
  `;

  /* ============================================================
     BRANDING + COLORS + OWNER
     ============================================================ */

  container.innerHTML += `
    <section class="detail-card">
      <h2>Branding</h2>
      <div class="detail-grid">
        <div><strong>Abbreviation</strong></div><div>${team.teamNickname}</div>
        <div><strong>Slug</strong></div><div>${team.teamSlug}</div>
        <div><strong>Mascot</strong></div><div>${team.mascotName || "N/A"}</div>
        <div><strong>School</strong></div><div>${team.teamSchool}</div>
      </div>
    </section>

    <section class="detail-card">
      <h2>Colors</h2>
      <div class="detail-grid">
        <div><strong>Primary</strong></div><div>${team.colors.primary}</div>
        <div><strong>Secondary</strong></div><div>${team.colors.secondary}</div>
        <div><strong>Alternate</strong></div><div>${team.colors.alternate}</div>
      </div>
    </section>

    <section class="detail-card">
      <h2>Owner</h2>
      <div class="detail-grid">
        <div><strong>Name</strong></div><div>${owner?.name || "None"}</div>
        <div><strong>Abbreviation</strong></div><div>${owner?.abbreviation || "N/A"}</div>
        <div><strong>Profile</strong></div>
        <div><a href="owner.html?owner=${owner?.id}">View Owner</a></div>
      </div>
    </section>
  `;

  /* ============================================================
     GAMES LIST
     ============================================================ */

  let gameHtml = "";

  if (!games || games.length === 0) {
    gameHtml = "<p>No games found.</p>";
  } else {
    gameHtml = games.map(g => `
      <div class="team-game-item">
        <div class="team-game-matchup">
          <strong>${g.awayTeam.teamName} @ ${g.homeTeam.teamName}</strong>
        </div>
        <div class="team-game-meta">
          ${g.dateFormatted} • ${g.venue}
        </div>
        <a href="game.html?game=${g.gameId}" class="team-game-link">View Game</a>
      </div>
      <hr>
    `).join("");
  }

  container.innerHTML += `
    <section class="detail-card">
      <h2>Games</h2>
      ${gameHtml}
    </section>
  `;
}
