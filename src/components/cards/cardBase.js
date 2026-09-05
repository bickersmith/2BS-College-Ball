// =======================================
// cardBase.js — v4 CLICKABLE + SAFE + CLEAN
// =======================================
//import { cardBase } from "./cardBase.js";
import { log } from "../../scripts/diagnostics/logger.js";

import { getAccentColor, getCardSizeClass } from "../../utils/cardUtils.js";

// Global helper for internal links inside cards
window.stopCardClick = function (event) {
  event.stopPropagation();
};

export function cardBase({ team, owner, game, size = "md", header, body, footer }) {

  const sizeClass = getCardSizeClass(size);
  const accentColor = getAccentColor(team || owner || game);

  // SAFETY GUARD — prevent undefined navigation
  const safeHeader = (header || "").replace("/src/pages/undefined", "#");
  const safeBody   = (body   || "").replace("/src/pages/undefined", "#");
  const safeFooter = (footer || "").replace("/src/pages/undefined", "#");

  // Determine card click target
  const targetUrl =
    team  ? `team.html?team=${team.teamId}` :
    owner ? `owner.html?owner=${owner.id}` :
    game  ? `game.html?game=${game.gameId}` :
    "#";

  return `
    <div class="card ${sizeClass}" 
         style="--accent-color: ${accentColor};"
         onclick="window.location.href='${targetUrl}'">

      <div class="card-accent"></div>

      <div class="card-header">
        ${safeHeader}
      </div>

      <div class="card-body">
        ${safeBody}
      </div>

      <div class="card-footer">
        ${safeFooter}
      </div>

    </div>
  `;
}
