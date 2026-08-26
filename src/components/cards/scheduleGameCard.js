import { cardBase } from "./cardBase.js";
import {
  getClickableTeamLogo,
  getOwnerPill,
  formatGameLocation,
  formatGameScore
} from "../../utils/cardUtils.js"; 

import { goToGame } from "../../utils/navigation.js";

export function scheduleGameCard(game, size = "md") {

    console.log("🎴 scheduleGameCard()", game.gameId, game);

  if (!game.homeTeam || !game.awayTeam) {
    console.error("❌ Missing team data in game:", game);
  }

  const header = `
    <div class="schedule-card-header">
      <div class="team-side">
        ${getClickableTeamLogo(game.awayTeam)}
        <div class="team-name">${game.awayTeam?.teamName || "Unknown"}</div>
      </div>

      <div class="vs">@</div>

      <div class="team-side">
        ${getClickableTeamLogo(game.homeTeam)}
        <div class="team-name">${game.homeTeam?.teamName || "Unknown"}</div>
      </div>
    </div>
  `;

  const body = `
    <div class="schedule-card-body">
      <div class="schedule-date">${game.dateFormatted}</div>
      <div class="schedule-location">${formatGameLocation(game)}</div>
      <div class="schedule-score">${formatGameScore(game)}</div>
    </div>
  `;

  const footer = `
    <div class="schedule-card-footer">
      ${getOwnerPill(game.owner)}
      <button class="game-button" onclick="goToGame('${game.gameId}')">
        View Game
      </button>
    </div>
  `;

  return cardBase({
    team: game.homeTeam,
    size,
    header,
    body,
    footer
  });
}


