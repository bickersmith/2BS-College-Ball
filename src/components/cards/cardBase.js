// =======================================
// cardBase.js — v3 SAFE + UTIL-DRIVEN + NAV-GUARD
// =======================================

import { getAccentColor, getCardSizeClass } from "../../utils/cardUtils.js";
import { log } from "../../scripts/diagnostics/logger.js";

export function cardBase({ team, size = "md", header, body, footer }) {

  //log("CARD", `Building cardBase for team ${team?.teamId || "none"} size=${size}`);

  const sizeClass = getCardSizeClass(size);
  const accentColor = getAccentColor(team);

  // ⭐ SAFETY GUARD — prevent undefined navigation
  const safeHeader = (header || "").replace("/src/pages/undefined", "#");
  const safeBody   = (body   || "").replace("/src/pages/undefined", "#");
  const safeFooter = (footer || "").replace("/src/pages/undefined", "#");

  return `
    <div class="card ${sizeClass}" style="--accent-color: ${accentColor};">

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
