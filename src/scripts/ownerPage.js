// src/pages/ownerPage.js




import { loadConfig } from "./config/env.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners  } from "./api/api.owners.js";
import { getTeamsByOwner } from "../data/query/getTeamsByOwner.js";
import { ownerCard } from "../components/cards/ownerCard.js";


getTeamsByOwner.js

import { loadNavigation } from "../utils/navigation.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadNavigation();
  renderOwnerPage();
});

//console.log("OWNER PAGE: loaded");

window.goToTeam = function(teamId) {
  window.location.href = `team.html?team=${teamId}`;
};

window.goToOwner = function(ownerId) {
  window.location.href = `owner.html?owner=${ownerId}`;
};

await loadConfig();

function getOwnerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("owner");
}

/*
export async function renderOwnerPage() {
  const ownerId = getOwnerIdFromUrl();
  console.log("OWNER PAGE: ownerId =", ownerId);

  const container = document.getElementById("content");

  // Load owners
  const owners = await getOwners();
  const owner = owners.find(o => String(o.id) === String(ownerId));

  if (!owner) {
    container.innerHTML = `<h1>Owner Not Found</h1>`;
    return;
  }

  //console.log("OWNER PAGE: owner =", owner);

  // Load teams
  const teams = await getTeams();   // composed teams

  //console.log("OWNER PAGE: teams loaded =", teams.length);

  // ⭐ THIS IS THE ONLY PART THAT CHANGED ⭐
  const ownerTeams = getTeamsByOwner(teams, ownerId);

  //console.log("OWNER PAGE: ownerTeams =", ownerTeams);

  // Render owner card
  container.innerHTML = ownerCard(owner, ownerTeams, "xl");
}
  */

export async function renderOwnerPage() {
  const ownerId = getOwnerIdFromUrl();
  const container = document.getElementById("content");

  // Load owners
  const owners = await getOwners();
  const owner = owners.find(o => String(o.id) === String(ownerId));

  if (!owner) {
    container.innerHTML = `<h1>Owner Not Found</h1>`;
    return;
  }

  // Load teams
  const teams = await getTeams();
  const ownerTeams = getTeamsByOwner(teams, ownerId);

  // Build table rows
  const teamRowsHtml = ownerTeams.map(team => `
    <tr class="owner-team-row"
        data-team-id="${team.teamId}"
        data-team-name="${team.teamName}"
        data-team-conference="${team.teamConference}">
      
      <td class="team-logo-col">
        <a href="/src/pages/team.html?team=${team.teamId}">
          <img src="${team.teamLogo}" class="team-logo-xs">
        </a>
      </td>

      <td class="team-name-col">
        <a href="/src/pages/team.html?team=${team.teamId}" class="team-link">
          ${team.teamName}
        </a>
      </td>

      <td class="team-conf-col">${team.teamConference || "—"}</td>
      <td class="team-loc-col">${team.teamLocation || "—"}</td>
    </tr>
  `).join("");

  // Render page
  /* removed from inside this..
  <div class="owner-card-wrapper">
      ${ownerCard(owner, ownerTeams, "xl")}
    </div>
      <h2 class="section-title">Teams Owned</h2>
    */

  container.innerHTML = `
    <h1 class="page-title">${owner.name}</h1>

    <table class="owner-teams-table">
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
        ${teamRowsHtml}
      </tbody>
    </table>
  `;
}


renderOwnerPage();
