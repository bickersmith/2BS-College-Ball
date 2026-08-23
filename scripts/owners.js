// ===============================
// 2BS College Ball — owners.js
// Owners Directory Logic
// ===============================

import { fetchSheet } from "../scripts/fetchSheet.js";

async function loadOwners() {
  const teams = await fetchSheet("Teams");

  // Build owner → teams mapping
  const ownersMap = new Map();
  teams.forEach(t => {
    if (!t.ownerId) return;
    if (!ownersMap.has(t.ownerId)) ownersMap.set(t.ownerId, []);
    ownersMap.get(t.ownerId).push(t);
  });

  const container = document.getElementById("owners-list");

  container.innerHTML = [...ownersMap.entries()]
    .map(([ownerId, ownerTeams]) => {
      const ownerName = ownerTeams[0].ownerName;

      return `
        <div class="owner-card-sm">

          <!-- OWNER NAME (clickable + dark highlight) -->
          <a href="./owner.html?owner=${ownerId}" class="owner-name-highlight">
            ${ownerName}
          </a>

          <!-- COLUMN OF TEAM LOGOS -->
          <div class="owner-team-logos">
            ${ownerTeams
              .map(
                t => `
              <a href="./team.html?team=${t.id}">
                <img src="${t.logoUrl}" class="logo-lg" alt="${t.teamSchool}">
              </a>
            `
              )
              .join("")}
          </div>

        </div>
      `;
    })
    .join("");
}

loadOwners();
