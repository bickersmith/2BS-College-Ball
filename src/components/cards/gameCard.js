// =======================================
// gameCard.js — v2 HOME/AWAY SAFE
// =======================================

import { cardBase } from "./cardBase.js";
import {
  getClickableTeamLogo,
  getOwnerPill,
  formatGameLocation,
  formatGameScore
} from "../../utils/cardUtils.js";

import { goToTeam, goToOwner } from "../../utils/navigation.js";
import { log } from "../../scripts/diagnostics/logger.js";

export function gameCard(game, size = "lg") {

  //log("CARD", `Rendering full game card for game ${game.gameId}`);

  const { homeTeam, awayTeam } = game;

  if (!homeTeam || !awayTeam) {
    log("CARD", `❌ Missing team data in composed game ${game.gameId}`);
  }

  // ---------------------------------------
  // Header (logos + names + score)
  // ---------------------------------------

  const header = `
    <div class="game-card-header">

      <div class="team-side">
        ${getClickableTeamLogo(awayTeam)}
        <div class="team-name">${awayTeam?.teamName || "Unknown"}</div>
      </div>

      <div class="score-block">
        <div class="scoreline">${formatGameScore(game)}</div>
        <div class="vs">${game.neutral ? "vs" : "@"}</div>
      </div>

      <div class="team-side">
        ${getClickableTeamLogo(homeTeam)}
        <div class="team-name">${homeTeam?.teamName || "Unknown"}</div>
      </div>

    </div>
  `;

  // ---------------------------------------
  // Body (date, venue, location, metadata)
  // ---------------------------------------

  const body = `
    <div class="game-card-body">

      <div class="game-date">${game.dateFormatted}</div>

      <div class="game-location">
        ${formatGameLocation(game)}
      </div>

      <div class="game-venue">
        ${game.venue || ""}
      </div>

      <div class="game-meta">
        ${game.neutral ? "Neutral Site Game" : ""}
      </div>

    </div>
  `;

  // ---------------------------------------
  // Footer (owners + navigation)
  // ---------------------------------------

  const footer = `
    <div class="game-card-footer">

      <div class="owner-row">
        ${getOwnerPill(homeTeam?.owner)}
        ${getOwnerPill(awayTeam?.owner)}
      </div>

      <div class="game-actions">
        <button class="team-button" onclick="goToTeam('${homeTeam?.teamId}')">
          View ${homeTeam?.teamName}
        </button>

        <button class="team-button" onclick="goToTeam('${awayTeam?.teamId}')">
          View ${awayTeam?.teamName}
        </button>
      </div>

    </div>
  `;

  // ---------------------------------------
  // Final card
  // ---------------------------------------

  return cardBase({
    team: homeTeam,   // theming based on home team
    size,
    header,
    body,
    footer
  });
}
