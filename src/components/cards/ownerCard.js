// =======================================
// ownerCard.js — v3 CLEAN + TEAM LIST + NAV
// =======================================

import { cardBase } from "./cardBase.js";
import {
  getOwnerPill,
  getClickableTeamLogo
} from "../../utils/cardUtils.js";

import { goToTeam, goToOwner } from "../../utils/navigation.js";
import { log } from "../../scripts/diagnostics/logger.js";

export function ownerCard(owner, teams = [], size = "lg") {

  log("CARD", `Rendering owner card for owner ${owner.id}`);

  // ---------------------------------------
  // Header (owner pill + name)
  // ---------------------------------------

  const header = `
    <div class="owner-card-header">
      ${getOwnerPill(owner)}
      <div class="owner-name">${owner.name}</div>
    </div>
  `;

  // ---------------------------------------
  // Body (owner metadata + team list)
  // ---------------------------------------

  const ownerTeams = teams.filter(t => t.ownerId === owner.id);

  const teamList = ownerTeams.length
    ? ownerTeams.map(team => `
        <div class="owner-team-row">
          ${getClickableTeamLogo(team)}
          <div class="owner-team-name">${team.teamName}</div>
          <button class="team-button" onclick="goToTeam('${team.teamId}')">
            View Team
          </button>
        </div>
      `).join("")
    : `<div class="owner-no-teams">No teams assigned</div>`;

  const body = `
    <div class="owner-card-body">

      <div class="owner-meta">
        <div class="owner-email">${owner.email || ""}</div>
        <div class="owner-notes">${owner.notes || ""}</div>
      </div>

      <div class="owner-teams-section">
        <div class="owner-teams-title">Teams</div>
        ${teamList}
      </div>

    </div>
  `;

  // ---------------------------------------
  // Footer (navigation)
  // ---------------------------------------

const footer = `
  <div class="owner-card-footer">
    <button class="owner-button" onclick="window.location.href='owners.html'">
      View All Owners
    </button>
  </div>
`;

  // ---------------------------------------
  // Final card
  // ---------------------------------------

  return cardBase({
    team: ownerTeams[0] || null,   // theming based on first team (if any)
    size,
    header,
    body,
    footer
  });
}
