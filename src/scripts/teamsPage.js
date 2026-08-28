import { loadConfig } from "./config/env.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners } from "./api/api.owners.js";
import { teamCard } from "../components/cards/teamCard.js";

console.log("TEAMS PAGE: loaded");

window.goToTeam = function(teamId) {
  window.location.href = `team.html?team=${teamId}`;
};

await loadConfig();

export async function renderTeamsPage() {
  console.log("TEAMS PAGE: rendering…");

  const owners = await getOwners();   // composed owners
  const teams = await getTeams();     // composed teams

    // Filter out inactive teams
    const activeTeams = teams.filter(t => t.teamActive !== false);

  const container = document.getElementById("content");

// Sort alphabetically
const sortedTeams = activeTeams.sort((a, b) =>
  a.teamName.localeCompare(b.teamName)
);

  // Build HTML for each team card
  const teamCardsHtml = sortedTeams.map(team => `
    <div class="team-list-item">
      ${teamCard(team, [], "lg")}
    </div>
  `).join("");

  // Final page HTML
  container.innerHTML = `
    <h1 class="page-title">All Teams</h1>
    <div class="teams-list">
      ${teamCardsHtml}
    </div>
  `;
}

renderTeamsPage();
