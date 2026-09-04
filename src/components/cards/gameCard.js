// src/components/cards/gameCard.js

/*
import { GAME_BADGES } from "../../scripts/data/utils/gameBadges.js";
import { filterBadges } from "../../scripts/data/utils/badgeFilter.js";

export function renderGameBadges(game, isTeamPage = false) {
  if (!filterBadges(game, isTeamPage)) return "";

  const flags = game.scoringFlags || {};
  const activeBadges = GAME_BADGES.filter(b => flags[b.key]);

  if (!activeBadges.length) return "";

  return `
    <div class="game-badges">
      ${activeBadges.map(b => `
        <span class="badge badge-${b.key}">
          ${b.icon} ${b.label}
        </span>
      `).join("")}
    </div>
  `;
}

export function gameCard(game, teams, size = "md") {

  const away = game.awayTeam;
  const home = game.homeTeam;

  const awayLogo = away.teamLogo || "";
  const homeLogo = home.teamLogo || "";

  const awayLogoHtml = awayLogo ? `<img src="${awayLogo}" class="team-logo-sm">` : "";
  const homeLogoHtml = homeLogo ? `<img src="${homeLogo}" class="team-logo-sm">` : "";

  return `
    <a href="game.html?game=${game.gameId}" class="card-link" onclick="stopCardClick(event)">
      <div class="game-card game-card-${size}">

        <!-- MATCHUP -->
        <div class="game-card-matchup">
          ${awayLogoHtml}
          <span class="team-name">${away.teamName}</span>

          <span class="at-symbol">@</span>

          <span class="team-name">${home.teamName}</span>
          ${homeLogoHtml}
        </div>

        <!-- SCORE -->
        <div class="game-card-score">
          ${game.score.away} – ${game.score.home}
        </div>

        <!-- BADGES -->
        ${renderGameBadges(game, false)}

        <!-- META -->
        <div class="game-card-meta">
          <div>${game.dateFormatted}</div>
          <div>${game.venue}</div>
          <div>${game.location}</div>
        </div>

      </div>
    </a>
  `;
}
*/

// src/components/cards/gameCard.js

import { GAME_BADGES } from "../../scripts/data/utils/gameBadges.js";
import { filterBadges } from "../../scripts/data/utils/badgeFilter.js";

export function renderGameBadges(game, isTeamPage = false) {
  if (!filterBadges(game, isTeamPage)) return "";

  const flags = game.scoringFlags || {};
  const activeBadges = GAME_BADGES.filter(b => flags[b.key]);

  if (!activeBadges.length) return "";

  return `
    <div class="game-badges">
      ${activeBadges
        .map(
          b => `
        <span class="badge badge-${b.key}">
          ${b.icon} ${b.label}
        </span>
      `
        )
        .join("")}
    </div>
  `;
}

export function gameCard(game, teams, size = "md") {

  const away = game.awayTeam;
  const home = game.homeTeam;

  const awayLogoHtml = away.teamLogo
    ? `<img src="${away.teamLogo}" class="team-logo-sm">`
    : "";
  const homeLogoHtml = home.teamLogo
    ? `<img src="${home.teamLogo}" class="team-logo-sm">`
    : "";

  return `
    <a href="game.html?game=${game.gameId}" class="card-link" onclick="stopCardClick(event)">
      <div class="game-card game-card-${size}">

        ${game.flags?.Rivalry ? `<div class="rivalry-banner">RIVALRY GAME</div>` : ""}

        <div class="game-card-matchup">
          ${awayLogoHtml}
          <span class="team-name">${away.teamName}</span>
          <span class="at-symbol">@</span>
          <span class="team-name">${home.teamName}</span>
          ${homeLogoHtml}
        </div>

        <div class="game-card-score">
          ${game.score.away} – ${game.score.home}
        </div>

        ${renderGameBadges(game, false)}

        <div class="game-card-meta">
          <div>${game.dateFormatted}</div>
          <div>${game.venue}</div>
          <div>${game.location}</div>
        </div>

      </div>
    </a>
  `;
}
