// =======================================
// scheduleGameCard.js — v2 HOME/AWAY SAFE
// =======================================

import { cardBase } from "./cardBase.js";
import {
  getClickableTeamLogo,
  getOwnerPill,
  formatGameLocation,
  formatGameScore
} from "../../utils/cardUtils.js";

import { goToGame } from "../../utils/navigation.js";
import { log } from "../../scripts/diagnostics/logger.js";

export function scheduleGameCard(game, size = "md") {

 // log("CARD", `Rendering schedule card for game ${game.gameId}`);

  const { homeTeam, awayTeam } = game;

  if (!homeTeam || !awayTeam) {
    log("CARD", `❌ Missing team data in composed game ${game.gameId}`);
  }

  // ---------------------------------------
  // Header (team logos + names)
  // ---------------------------------------

  const header = `
    <div class="schedule-card-header">

      <div class="team-side">
        ${getClickableTeamLogo(awayTeam)}
        <div class="team-name">${awayTeam?.teamName || "Unknown"}</div>
      </div>

      <div class="vs">${game.neutral ? "vs" : "@"}</div>

      <div class="team-side">
        ${getClickableTeamLogo(homeTeam)}
        <div class="team-name">${homeTeam?.teamName || "Unknown"}</div>
      </div>

    </div>
  `;

  // ---------------------------------------
  // Body (date, location, score)
  // ---------------------------------------

  const body = `
    <div class="schedule-card-body">
      <div class="schedule-date">${game.dateFormatted}</div>
      <div class="schedule-location">${formatGameLocation(game)}</div>
      <div class="schedule-score">${formatGameScore(game)}</div>
    </div>
  `;

  // ---------------------------------------
  // Footer (owner + button)
  // ---------------------------------------

  const footer = `
    <div class="schedule-card-footer">
      ${getOwnerPill(homeTeam?.owner)}
      <button class="game-button" onclick="goToGame('${game.gameId}')">
        View Game
      </button>
    </div>
  `;

  // ---------------------------------------
  // Final card
  // ---------------------------------------

  return cardBase({
    team: homeTeam,
    size,
    header,
    body,
    footer
  });
}
