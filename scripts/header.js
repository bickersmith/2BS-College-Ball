import { fetchSheet } from "./fetchSheet.js";

export async function loadHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const res = await fetch("./components/header.html");
  if (!res.ok) {
    console.error("Header file not found:", res.status);
    return;
  }

  header.innerHTML = await res.text();

  const teams = await fetchSheet("Teams");
  const owners = await fetchSheet("Owners");

  populateTeamsMenu(teams);
  populateOwnersMenu(owners);
}

function populateTeamsMenu(teams) {
  const menu = document.getElementById("header-teams-menu");
  if (!menu) return;

  const ownedTeams = teams.filter(t => t.ownerId);

  ownedTeams.forEach(team => {
    menu.innerHTML += `
      <a href="./team.html?team=${team.id}">
        ${team.teamSchool}
      </a>
    `;
  });
}

function populateOwnersMenu(owners) {
  const menu = document.getElementById("header-owners-menu");
  if (!menu) return;

  owners.forEach(owner => {
    menu.innerHTML += `
      <a href="./owner.html?owner=${owner.ownerId}">
        ${owner.ownerName}
      </a>
    `;
  });
}
