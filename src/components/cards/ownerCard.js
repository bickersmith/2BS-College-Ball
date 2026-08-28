// =======================================
// ownerCard.js — v7 CLEAN TWO-COLUMN (NO HEADER)
// =======================================

import { cardBase } from "./cardBase.js";
import { log } from "../../scripts/diagnostics/logger.js";

export function ownerCard(owner, teams = [], size = "lg") {

  //log("CARD", `Rendering owner card for owner ${owner.id}`);

  const header = ``; // removed

  const ownerTeams = teams.filter(t => t.ownerId === owner.id);

  const teamLogos = ownerTeams.map(team => `
    <a href="team.html?team=${team.teamId}" 
       class="owner-team-logo"
       onclick="stopCardClick(event)">
      <img src="${team.teamLogo}" 
           alt="${team.teamName} logo"
           class="team-logo-sm">
    </a>
  `).join("");

  const body = `
    <div class="owner-card-body two-col">

      <div class="owner-col-left">
        <a href="owner.html?owner=${owner.id}" 
           class="owner-name-large"
           onclick="stopCardClick(event)">
          ${owner.name}
        </a>
      </div>

      <div class="owner-col-right">
        <div class="owner-team-logos single-row">
          ${teamLogos}
        </div>
      </div>

    </div>
  `;

  return cardBase({
    owner,
    size,
    header,
    body,
    footer: ""
  });
}
