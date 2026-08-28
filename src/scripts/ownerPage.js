// src/pages/ownerPage.js




import { loadConfig } from "./config/env.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners  } from "./api/api.owners.js";
import { getTeamsByOwner } from "../data/query/getTeamsByOwner.js";
import { ownerCard } from "../components/cards/ownerCard.js";

getTeamsByOwner.js


console.log("OWNER PAGE: loaded");

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

  console.log("OWNER PAGE: owner =", owner);

  // Load teams
  const teams = await getTeams();   // composed teams

  console.log("OWNER PAGE: teams loaded =", teams.length);

  // ⭐ THIS IS THE ONLY PART THAT CHANGED ⭐
  const ownerTeams = getTeamsByOwner(teams, ownerId);

  console.log("OWNER PAGE: ownerTeams =", ownerTeams);

  // Render owner card
  container.innerHTML = ownerCard(owner, ownerTeams, "xl");
}

renderOwnerPage();
