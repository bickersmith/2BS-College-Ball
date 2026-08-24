import { fetchSheet } from "./fetchSheet.js";

async function initOwnersPage() {
  const owners = await fetchSheet("Owners");
  const teams = await fetchSheet("Teams");

  renderOwners(owners, teams);
}

function renderOwners(owners, teams) {
  const container = document.getElementById("owners-section");
  if (!container) return;

  container.innerHTML = owners.map(owner => {
    const ownerTeams = teams.filter(t => String(t.ownerId) === String(owner.ownerId));

    const logos = ownerTeams.map(t => `
      <a href="./team.html?team=${t.id}">
        <img src="${t.logoUrl}" alt="${t.teamSchool}">
      </a>
    `).join("");

    return `
      <div class="owner-block">
        <a href="./owner.html?owner=${owner.ownerId}" class="owner-name">
          ${owner.ownerName}
        </a>
        <div class="owner-team-logos">${logos}</div>
      </div>
    `;
  }).join("");
}

initOwnersPage();
