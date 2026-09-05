
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

  // ⭐ Winner / loser logic
  const awayWinner = game.score.away > game.score.home;
  const homeWinner = game.score.home > game.score.away;

  // ⭐ Only show logo if it exists
  const awayLogo = away.teamLogo
    ? `<img src="${away.teamLogo}" class="game-logo">`
    : "";

  const homeLogo = home.teamLogo
    ? `<img src="${home.teamLogo}" class="game-logo">`
    : "";

  return `
    <a href="game.html?game=${game.gameId}" class="game-card">

      <div class="game-card-top">
        <div class="game-team ${awayWinner ? "winner" : "loser"}">
          ${awayLogo}
          <span class="game-team-name">${away.teamName}</span>
        </div>

        <div class="game-at">@</div>

        <div class="game-team ${homeWinner ? "winner" : "loser"}">
          ${homeLogo}
          <span class="game-team-name">${home.teamName}</span>
        </div>
      </div>

      <div class="game-card-bottom">
        <div class="game-date">${game.dateFormatted}</div>
        <div class="game-score">${game.score.away} – ${game.score.home}</div>
      </div>

    </a>
  `;
}
