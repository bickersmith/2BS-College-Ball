import { cardBase } from "./cardBase.js";
import { getClickableTeamLogo, getOwnerPill } from "../../utils/cardUtils.js";
import { log } from "../../scripts/diagnostics/logger.js";

export function teamCard(team, owners = [], size = "lg") {

  // Header (logo + name)
  const header = `
    <div class="team-card-header">

      <a href="team.html?team=${team.teamId}" onclick="stopCardClick(event)">
        <img src="${team.teamLogo}" 
             class="team-card-logo" 
             alt="${team.teamName} logo">
      </a>

      <a href="team.html?team=${team.teamId}" 
         class="team-card-name" 
         onclick="stopCardClick(event)">
        ${team.teamName}
      </a>

    </div>
  `;

  // Body (conference + location)
  const body = `
    <div class="team-card-meta">

      <div class="team-card-meta-row">
        <span class="meta-label">Conference:</span>
        <span class="meta-value">${team.teamConference || "—"}</span>
      </div>

      <div class="team-card-meta-row">
        <span class="meta-label">Location:</span>
        <span class="meta-value">${team.teamLocation || "—"}</span>
      </div>

    </div>
  `;

  // Footer (owner pill)
  const footer = `
    <div class="team-card-footer">
      ${team.owner ? `
        <a href="owner.html?owner=${team.owner.ownerId}" 
           class="owner-pill" 
           onclick="stopCardClick(event)">
          ${team.owner.ownerName}
        </a>
      ` : ""}
    </div>
  `;

  // Use cardBase to wrap the entire card as clickable
  return cardBase({
    team,
    size,
    header,
    body,
    footer
  });
}
