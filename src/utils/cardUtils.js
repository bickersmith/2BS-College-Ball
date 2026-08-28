// =======================================
// cardUtils.js — v2 SAFE + CLEAN HTML
// =======================================

import { goToTeam, goToOwner } from "./navigation.js";
import { log } from "../scripts/diagnostics/logger.js";

// ---------------------------------------
// Team Logo (clickable)
// ---------------------------------------

export function getClickableTeamLogo(team) {
  const logo = team.teamLogo || "";   // ⭐ correct composed field
  const id   = team.teamId;

  return `
    <div class="team-logo-clickable" onclick="goToTeam('${id}')">
      <img src="${logo}" alt="${team.teamName}" class="team-logo-xs">
    </div>
  `;
}


// ---------------------------------------
// Owner Pill
// ---------------------------------------

export function getOwnerPill(owner) {
  if (!owner) return "";

  const abbrev = owner.abbreviation || "";
  const color = owner.colors?.primary || "#444";

  return `
    <div class="owner-pill" style="background-color: ${color}">
      ${abbrev}
    </div>
  `;
}


// ---------------------------------------
// Game Location Formatting
// ---------------------------------------

export function formatGameLocation(game) {
  if (!game) return "";

  const venue = game.venue || "";
  const location = game.location || "";

  if (venue && location) return `${venue} — ${location}`;
  if (venue) return venue;
  return location;
}

// ---------------------------------------
// Game Score Formatting
// ---------------------------------------

export function formatGameScore(game) {
  if (!game || !game.score) return "";

  const home = game.score.home ?? "";
  const away = game.score.away ?? "";

  return `${away} - ${home}`;
}


// =======================================
// Game Date Formatting
// =======================================

export function formatGameDate(dateString) {
  if (!dateString) return "Unknown Date";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}


// =======================================
// Accent Color
// =======================================

export function getAccentColor(team) {
  return team?.colors?.primary || team?.accentColor || "#333";
}

// =======================================
// Card Size Class
// =======================================

export function getCardSizeClass(size) {
  switch (size) {
    case "sm": return "card-sm";
    case "lg": return "card-lg";
    default:   return "card-md";
  }
}
