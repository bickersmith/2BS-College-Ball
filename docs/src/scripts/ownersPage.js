
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
  // Build OWNER CARDS using ownerCard.js
  // ---------------------------------------

  const ownerCardsHtml = safeOwners.map(owner => {
    const ownerTeams = teams.filter(t => String(t.ownerId) === String(owner.id));
    return ownerCard(owner, ownerTeams, "md");
  }).join("");

  // ---------------------------------------
  // Final Page HTML<div class="owners-card-grid">  </div>
  // ---------------------------------------

  container.innerHTML = `
    
      ${ownerCardsHtml}
   
  `;
}
