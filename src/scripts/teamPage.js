import { loadConfig } from "./config/env.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners } from "./api/api.owners.js";
import { getGamesByTeam } from "./api/api.games.js";
import { teamCard } from "../components/cards/teamCard.js";
import { loadNavigation } from "../utils/navigation.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigation();
  renderTeamPage();
});

function getTeamIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("team");
}

export async function renderTeamPage() {
  const teamId = getTeamIdFromUrl();
  console.log("TEAM PAGE: teamId =", teamId);

  const teams = await getTeams();
  const owners = await getOwners();
  const games = await getGamesByTeam(teamId);

  const team = teams.find(t => String(t.teamId) === String(teamId));

  const container = document.getElementById("content");

  if (!team) {
    container.innerHTML = `<h1>Team Not Found</h1>`;
    return;
  }

  container.innerHTML = teamCard(team, games, "xl");

  const owner = team.owner;

  container.innerHTML += `
    <h2>Owner</h2>
    <p><strong>${owner.name}</strong> (${owner.abbreviation})</p>
    <p><a href="owner.html?owner=${owner.id}">View Owner</a></p>
  `;

  let gameHtml = "";

  if (!games || games.length === 0) {
    gameHtml = "<p>No games found.</p>";
  } else {
    gameHtml = games.map(g => `
      <div>
        <strong>${g.homeTeam.teamName} vs ${g.awayTeam.teamName}</strong><br>
        ${g.dateFormatted}<br>
        <a href="game.html?game=${g.gameId}">View Game</a>
      </div>
      <hr>
    `).join("");
  }

  container.innerHTML += `
    <h2>Games</h2>
    ${gameHtml}
  `;
}
