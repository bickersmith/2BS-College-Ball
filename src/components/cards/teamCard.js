/*

// =======================================
// teamCard.js — v2 CLEAN + OWNER + NAV
// =======================================

import { cardBase } from "./cardBase.js";
import {
  getClickableTeamLogo,
  getOwnerPill
} from "../../utils/cardUtils.js";

import { goToTeam, goToOwner } from "../../utils/navigation.js";
import { log } from "../../scripts/diagnostics/logger.js";

export function teamCard(team, size = "lg") {

  //log("CARD", `Rendering team card for team ${team.teamId}`);

  // ---------------------------------------
  // Header (logo + name)
  // ---------------------------------------

  const header = `
    <div class="team-card-header">
      ${getClickableTeamLogo(team)}
      <div class="team-name">${team.teamName}</div>
    </div>
  `;

  // ---------------------------------------
  // Body (location + stadium)
  // ---------------------------------------

  const body = `
    <div class="team-card-body">

      <div class="team-location">
        ${team.city || ""}
      </div>

      <div class="team-stadium">
        ${team.stadium || ""}
      </div>

    </div>
  `;

  // ---------------------------------------
  // Footer (owner + navigation)
  // ---------------------------------------

  const footer = `
    <div class="team-card-footer">

      <div class="owner-row">
        ${getOwnerPill(team.owner)}
      </div>

      <div class="team-actions">
        <button class="team-button" onclick="goToOwner('${team.owner?.ownerId}')">
          View Owner
        </button>

        <button class="team-button" onclick="goToTeam('${team.teamId}')">
          View Team Page
        </button>
      </div>

    </div>
  `;

  // ---------------------------------------
  // Final card
  // ---------------------------------------

  return cardBase({
    team,
    size,
    header,
    body,
    footer
  });
}
*/
/*
// =======================================
// teamCard.js — v2 SAFE + COMPOSED
// =======================================

import { cardBase } from "./cardBase.js";
import { getClickableTeamLogo, getOwnerPill } from "../../utils/cardUtils.js";
import { log } from "../../scripts/diagnostics/logger.js";
import { goToTeam, goToOwner } from "../../utils/navigation.js";

export function teamCard(team, games = [], size = "md") {
  log("CARD", `Rendering team card for team ${team?.teamId}`);

  // ---------------------------------------
  // Header
  // ---------------------------------------
  const header = `
    <div class="team-card-header">
      ${getClickableTeamLogo(team)}
      <div class="team-name">${team.teamName}</div>
      <div class="team-abbrev">${team.teamAbbreviation || ""}</div>
    </div>
  `;

  // ---------------------------------------
  // Body
  // ---------------------------------------
  const body = `
    <div class="team-card-body">

      <div class="team-info-row">
        <span class="team-label">Conference:</span>
        <span class="team-value">${team.teamConference || "Independent"}</span>
      </div>

      <div class="team-info-row">
        <span class="team-label">Location:</span>
        <span class="team-value">${team.teamLocation || ""}</span>
      </div>

      <div class="team-info-row">
        <span class="team-label">Founded:</span>
        <span class="team-value">${team.teamFounded || ""}</span>
      </div>

      <div class="team-info-row">
        <span class="team-label">Owner:</span>
        <span class="team-value">${getOwnerPill(team.owner)}</span>
      </div>

    </div>
  `;

  // ---------------------------------------
  // Footer
  // ---------------------------------------
  const footer = `
    <div class="team-card-footer">
      <button class="team-button" onclick="goToTeam('${team.teamId}')">
        View Team Page
      </button>
    </div>
  `;

  // ---------------------------------------
  // Build card
  // ---------------------------------------
  return cardBase({
    team,
    size,
    header,
    body,
    footer
  });
}
*/
import { cardBase } from "./cardBase.js";
import {
  getClickableTeamLogo,
  getOwnerPill
} from "../../utils/cardUtils.js";

import { goToTeam, goToOwner } from "../../utils/navigation.js";
import { log } from "../../scripts/diagnostics/logger.js";

export function teamCard(team, owners = [], size = "lg") {
  return `
    <div class="team-card ${size}">
      
      <div class="team-card-header">
        <img src="${team.teamLogo}" class="team-card-logo" alt="${team.teamName} logo">
        <h3 class="team-card-name">${team.teamName}</h3>
      </div>

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

      <button class="team-card-button" onclick="goToTeam(${team.teamId})">
        View Team
      </button>

    </div>
  `;
}
