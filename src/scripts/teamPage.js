// src/scripts/teamPage.js

import { loadConfig } from "./config/env.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners } from "./api/api.owners.js";
import { getGamesByTeam } from "./api/api.games.js";
import { loadNavigation } from "../utils/navigation.js";
import { renderGameBadges } from "../components/cards/gameCard.js";
import { GAME_BADGES } from "../scripts/data/utils/gameBadges.js";
import { gameCard } from "../components/cards/gameCard.js";
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

// Attach badges to each composed game
games.forEach(game => {
  game.badges = GAME_BADGES.filter(b => game.scoringFlags[b.key]);
});


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
   TEAM GAMES — NEXT, LAST, FULL SCHEDULE
   ============================================================ */

function sortGamesChronologically(games) {
  return [...games].sort((a, b) => new Date(a.date) - new Date(b.date));
}

function findNextGame(games) {
  const now = new Date();
  return games.find(g => new Date(g.date) > now);
}

function findLastGame(games) {
  const now = new Date();
  const pastGames = games.filter(g => new Date(g.date) <= now);
  return pastGames.length ? pastGames[pastGames.length - 1] : null;
}

const sortedGames = sortGamesChronologically(games);

const nextGame = findNextGame(sortedGames);
const lastGame = findLastGame(sortedGames);

/* ============================
   NEXT + LAST GAME CARDS
   ============================ */

container.innerHTML += `
  <section class="detail-card">
    <h2>Team Schedule</h2>

    <div class="team-schedule-two-col">

      <div class="team-schedule-col">
        <h3>Next Game</h3>
        ${
          nextGame
            ? `<a href="game.html?game=${nextGame.gameId}">
                 <div class="team-game-card">
                   ${gameCard(nextGame, teams, "sm")}
                 </div>
               </a>`
            : `<p>No upcoming games.</p>`
        }
      </div>

      <div class="team-schedule-col">
        <h3>Last Game</h3>
        ${
          lastGame
            ? `<a href="game.html?game=${lastGame.gameId}">
                 <div class="team-game-card">
                   ${gameCard(lastGame, teams, "sm")}
                 </div>
               </a>`
            : `<p>No completed games.</p>`
        }
      </div>

    </div>
  </section>
`;

/* ============================
   FULL SCHEDULE TABLE
   ============================ */

container.innerHTML += `
  <section class="detail-card">
    <h2>Full Schedule</h2>

    <table class="team-schedule-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Opponent</th>
          <th>Result</th>
          <th>Score</th>
          <th>Venue</th>
          <th>Game</th>
        </tr>
      </thead>
<tbody>
  ${sortedGames
    .map(g => {
      const isHome = g.homeTeam.teamId == team.teamId;
      const opponent = isHome ? g.awayTeam.teamName : g.homeTeam.teamName;

      // Correct NEW-game detection
      const isNew = g.updateFlag === "NEW";

      const result = isNew
        ? ""
        : g.score.home === g.score.away
            ? "TIE"
            : isHome
              ? g.score.home > g.score.away ? "WIN" : "LOSS"
              : g.score.away > g.score.home ? "WIN" : "LOSS";

      const score = isNew ? "" : `${g.score.away} - ${g.score.home}`;

      return `
        <tr>
          <td>${g.dateFormatted}</td>
          <td>${opponent}</td>
          <td>${result || "—"}</td>
          <td>${score || "—"}</td>
          <td>${g.venue}</td>
          <td><a href="game.html?game=${g.gameId}">View</a></td>
        </tr>
      `;
    })
    .join("")}
</tbody>



    </table>
  </section>
`;

}
