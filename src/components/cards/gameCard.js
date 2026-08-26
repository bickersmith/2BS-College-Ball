import { cardBase } from "./cardBase.js";
import { 
  getClickableTeamLogo,
  getOwnerPill,
  formatGameDate,
  formatGameLocation,
  formatGameScore
} from "../../utils/cardUtils.js";
import { goToGame } from "../../utils/navigation.js";

export function gameCard(game, size = "md") {
  const header = `
    <div class="game-header">
      ${getClickableTeamLogo(game.team)}
      <div class="vs">vs</div>
      ${getClickableTeamLogo(game.opponentTeam)}
    </div>
  `;

  const body = `
    <div class="game-info">
      <div class="game-date">${formatGameDate(game)}</div>
      <div class="game-location">${formatGameLocation(game)}</div>
      <div class="game-score">${formatGameScore(game)}</div>
    </div>
  `;

  const footer = `
    <div class="game-footer">
      ${getOwnerPill(game.owner)}
      <button class="game-button" onclick="goToGame('${game.gameId}')">
        View Game
      </button>
    </div>
  `;

  return cardBase({
    team: game.team,
    size,
    header,
    body,
    footer
  });
}
