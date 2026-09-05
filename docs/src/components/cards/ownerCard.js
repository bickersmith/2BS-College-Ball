
//import { cardBase } from "./cardBase.js";
import { log } from "../../scripts/diagnostics/logger.js";

// /src/components/cards/ownerCard.js

// =======================================
// ownerCard.js — v8 FIXED FOR OWNERS PAGE
// =======================================

// =======================================
// ownerCard.js — FINAL FIXED VERSION
// =======================================

export function ownerCard(owner, teams, size = "md") {
  const logos = teams.map(t => `
    <div class="owner-team-logo">
      <a href="/src/pages/team.html?team=${t.teamId}">
        <img src="${t.teamLogo}" alt="${t.teamName}">
      </a>
    </div>
  `).join("");

  return `

      <div class="owner-card">
        <div class="owner-card-left">
          <div class="owner-name">    <a href="/src/pages/owner.html?owner=${owner.id}" class="owner-card-link">${owner.name}  </a></div>
          <div class="owner-team-logos">
            ${logos}  
          </div>
        </div>

      </div>
  
  `;
}
