
import { log } from "../scripts/diagnostics/logger.js";
import { loadConfig } from "./config/env.js";
import { getOwners } from "./api/api.owners.js";
import { getTeams } from "./api/api.teams.js";
import { ownerCard } from "../components/cards/ownerCard.js"; 
import { loadNavigation } from "../utils/navigation.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigation();
  renderOwnersPage();
});

export async function renderOwnersPage() {
  const owners = await getOwners();
  const teams = await getTeams();
  const safeOwners = Array.isArray(owners) ? owners : [];

  const container = document.getElementById("content");

  // ---------------------------------------
  // Build OWNER CARDS
  // ---------------------------------------

  const ownerCardsHtml = safeOwners.map(owner => {
    const ownerTeams = teams.filter(t => String(t.ownerId) === String(owner.id));

    return ownerCard(owner, ownerTeams, "md");   // clickable card
  }).join("");

  // ---------------------------------------
  // Build TABLE ROWS
  // ---------------------------------------

  const rows = safeOwners.map(owner => {
    const ownerTeams = teams.filter(t => String(t.ownerId) === String(owner.id));

    if (ownerTeams.length === 0) {
      return `
        <tr>
          <td class="owner-col">
            <a href="owner.html?owner=${owner.id}" class="owner-link" onclick="stopCardClick(event)">
              ${owner.name}
            </a>
          </td>
          <td colspan="4" class="no-team">—</td>
        </tr>
      `;
    }

    const first = ownerTeams[0];

    let html = `
      <tr>
        <td class="owner-col">
          <a href="owner.html?owner=${owner.id}" class="owner-link" onclick="stopCardClick(event)">
            ${owner.name}
          </a>
        </td>

        <td class="team-col">
          <a href="team.html?team=${first.teamId}" onclick="stopCardClick(event)">
            <img src="${first.teamLogo}" class="team-logo-xs">
          </a>
          <a href="team.html?team=${first.teamId}" class="team-link" onclick="stopCardClick(event)">
            ${first.teamName}
          </a>
        </td>

        <td>${first.teamConference || "—"}</td>
        <td>${first.teamLocation || "—"}</td>
      </tr>
    `;

    for (let i = 1; i < ownerTeams.length; i++) {
      const t = ownerTeams[i];

      html += `
        <tr>
          <td class="owner-col"></td>

          <td class="team-col">
            <a href="team.html?team=${t.teamId}" onclick="stopCardClick(event)">
              <img src="${t.teamLogo}" class="team-logo-xs">
            </a>
            <a href="team.html?team=${t.teamId}" class="team-link" onclick="stopCardClick(event)">
              ${t.teamName}
            </a>
          </td>

          <td>${t.teamConference || "—"}</td>
          <td>${t.teamLocation || "—"}</td>
        </tr>
      `;
    }

    return html;
  }).join("");

  // ---------------------------------------
  // Final Page HTML
  // ---------------------------------------

  container.innerHTML = `
    <!-- OWNER CARDS -->
    <div class="owners-card-grid">
      ${ownerCardsHtml}
    </div>

  `;
}
