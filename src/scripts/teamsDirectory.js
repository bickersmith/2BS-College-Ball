/*

// scripts/teamsDirectory.js
import { getTeams } from "./api/api.teams.js";
import { getGamesByTeam } from "./api/api.games.js";
import { log } from "../scripts/diagnostics/logger.js";

document.addEventListener("DOMContentLoaded", async () => {
  log("TEAMS", "Rendering Teams Directory");

  const container = document.getElementById("teams-container");
  container.innerHTML = "";

  const teams = await getTeams();

      log("TEAMS", `Loaded ${teams.length} teams`);
   
  if (!Array.isArray(teams)) {
    log("TEAMS", "❌ getTeams did not return an array");
    container.innerHTML = "<p>Error loading teams.</p>";
    return;
  }


  teams.forEach(team => {


    const card = document.createElement("div");
    card.classList.add("team-card");

    card.innerHTML = `
      <div class="team-header" style="background:${team["Primary Color"]}; border-bottom:4px solid ${team["Secondary Color"]};">
        <img class="team-logo" src="${team["Team Logo URL"]}" alt="${team["Team Name"]} logo">
        <h2>${team["Team Name"]}</h2>
        <p class="team-nickname">${team["Team Nickname"]}</p>
      </div>

      <div class="team-meta">
        <p><strong>School:</strong> ${team["Team School"]}</p>
        <p><strong>Conference:</strong> ${team["Team Conference"]}</p>
        <p><strong>Location:</strong> ${team["Team Location"]}</p>
      </div>

      <a class="team-link" href="team.html?team=${team["Team Slug"]}">
        View Team Page
      </a>
    `;

    container.appendChild(card);
  });
});

*/