// ===============================
// 2BS College Ball — teams.js
// Teams Directory Logic
// ===============================

import { fetchSheet } from "../scripts/fetchSheet.js";

async function loadTeamsDirectory() {
  const teams = await fetchSheet("Teams");

  // Build conference list
  const conferences = [...new Set(teams.map(t => t.conference).filter(Boolean))].sort();

  const filterSelect = document.getElementById("conference-filter");
  conferences.forEach(conf => {
    const opt = document.createElement("option");
    opt.value = conf;
    opt.textContent = conf;
    filterSelect.appendChild(opt);
  });

  // Initial render
  renderTeams(teams);

  // Search + filter listeners
  document.getElementById("team-search").addEventListener("input", () => {
    renderTeams(teams);
  });

  document.getElementById("conference-filter").addEventListener("change", () => {
    renderTeams(teams);
  });
}

function renderTeams(teams) {
  const searchValue = document.getElementById("team-search").value.toLowerCase();
  const conferenceValue = document.getElementById("conference-filter").value;

  const filtered = teams.filter(t => {
    const matchesSearch =
      t.teamSchool.toLowerCase().includes(searchValue) ||
      t.teamNickname.toLowerCase().includes(searchValue);

    const matchesConference =
      conferenceValue === "all" || t.conference === conferenceValue;

    return matchesSearch && matchesConference;
  });

  const container = document.getElementById("teams-list");

  container.innerHTML = filtered
    .map(team => {
      return `
        <div class="team-card">

          <a href="./team.html?team=${team.id}" class="team-logo-link">
            <img src="${team.logoUrl}" class="logo-lg" alt="${team.teamSchool}">
          </a>

          <div class="team-card-name">
            <a href="./team.html?team=${team.id}" class="team-name-highlight">
              ${team.teamSchool}
            </a>
          </div>

          <div class="team-card-meta">
            <div class="team-meta-line">${team.conference}</div>
            <div class="team-meta-line">${team.location}</div>
          </div>

        </div>
      `;
    })
    .join("");
}

loadTeamsDirectory();
