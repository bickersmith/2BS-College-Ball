import { loadConfig } from "/src/scripts/config/env.js";
import { loadNavigation } from "/src/utils/navigation.js";

import { getOwners } from "/src/scripts/api/api.owners.js";
import { getTeams } from "/src/scripts/api/api.teams.js";

async function loadNavigationForIndex() {
  await injectPartial("#header", "/src/components/header.html");
  await injectPartial("#navbar", "/src/components/navbar.html");
  await injectPartial("#footer", "/src/components/footer.html");
}

async function injectPartial(selector, path) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const response = await fetch(path);
    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Index navigation load failed for ${path}`, err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigationForIndex();
  renderIndexPage();
});

async function renderIndexPage() {
  const container = document.getElementById("content");

  const owners = await getOwners();
  const teams = await getTeams();

  // Build owners/teams table rows
  const rows = owners.map(owner => {
    const ownerTeams = teams.filter(t => String(t.ownerId) === String(owner.id));

    if (ownerTeams.length === 0) {
      return `
        <tr>
          <td class="owner-col">
            <a href="/src/pages/owner.html?owner=${owner.id}" class="owner-link">
              ${owner.name}
            </a>
          </td>
          <td colspan="4" class="no-team">—</td>
        </tr>
      `;
    }

    const first = ownerTeams[0];

    let html = `
      <tr>
        <td class="owner-col">
          <a href="/src/pages/owner.html?owner=${owner.id}" class="owner-link">
            ${owner.name}
          </a>
        </td>

        <td class="team-col">
          <a href="/src/pages/team.html?team=${first.teamId}">
            <img src="${first.teamLogo}" class="team-logo-xs">
          </a>
          <a href="/src/pages/team.html?team=${first.teamId}" class="team-link">
            ${first.teamName}
          </a>
        </td>

        <td>${first.teamConference || "—"}</td>
        <td>${first.teamLocation || "—"}</td>
      </tr>
    `;

    for (let i = 1; i < ownerTeams.length; i++) {
      const t = ownerTeams[i];

      html += `
        <tr>
          <td class="owner-col"></td>

          <td class="team-col">
            <a href="/src/pages/team.html?team=${t.teamId}">
              <img src="${t.teamLogo}" class="team-logo-xs">
            </a>
            <a href="/src/pages/team.html?team=${t.teamId}" class="team-link">
              ${t.teamName}
            </a>
          </td>

          <td>${t.teamConference || "—"}</td>
          <td>${t.teamLocation || "—"}</td>
        </tr>
      `;
    }

    return html;
  }).join("");

  // NEW: Two-column homepage layout
  container.innerHTML = `
    <div class="index-grid">

      <!-- LEFT COLUMN -->
      <div class="index-left">
        <table class="table owners-teams-table">
          <thead>
            <tr>
              <th>Owner</th>
              <th>Team</th>
              <th>Conference</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="index-right">

        <!-- Welcome Module -->
          <div class="home-module welcome-module">
            <h1>2BSCB</h1>

            <p></p>

            <h2></h2>
            <ul>
              <li><a href="/src/pages/teams.html">Teams</a></li>
              <li><a href="/src/pages/owners.html">Owners</a></li>
              <li><a href="/src/pages/games.html">Games</a></li>
              <li><a href="/src/pages/standings.html">Standings</a></li>
              <li><a href="/src/pages/awards.html">Awards</a></li>
              <li><a href="/src/pages/draft.html">Draft</a></li>
            </ul>
            <h2>...</h2>
            <p>More Soon...</p>
          </div>

          <!-- Future modules drop in here -->
          <div id="home-modules-slot"></div>

      </div>

    </div>
  `;
}


/*
async function renderIndexPage() {
  const container = document.getElementById("content");

  const owners = await getOwners();
  const teams = await getTeams();

  const rows = owners.map(owner => {
    const ownerTeams = teams.filter(t => String(t.ownerId) === String(owner.id));

    // Owner with no teams
    if (ownerTeams.length === 0) {
      return `
        <tr>
          <td class="owner-col">
            <a href="/src/pages/owner.html?owner=${owner.id}" class="owner-link">
              ${owner.name}
            </a>
          </td>
          <td colspan="4" class="no-team">—</td>
        </tr>
      `;
    }

    const first = ownerTeams[0];

    // First row (owner name + first team)
    let html = `
      <tr>
        <td class="owner-col">
          <a href="/src/pages/owner.html?owner=${owner.id}" class="owner-link">
            ${owner.name}
          </a>
        </td>

        <td class="team-col">
          <a href="/src/pages/team.html?team=${first.teamId}">
            <img src="${first.teamLogo}" class="team-logo-xs">
          </a>
          <a href="/src/pages/team.html?team=${first.teamId}" class="team-link">
            ${first.teamName}
          </a>
        </td>

        <td>${first.teamConference || "—"}</td>
        <td>${first.teamLocation || "—"}</td>
      </tr>
    `;

    // Additional team rows
    for (let i = 1; i < ownerTeams.length; i++) {
      const t = ownerTeams[i];

      html += `
        <tr>
          <td class="owner-col"></td>

          <td class="team-col">
            <a href="/src/pages/team.html?team=${t.teamId}">
              <img src="${t.teamLogo}" class="team-logo-xs">
            </a>
            <a href="/src/pages/team.html?team=${t.teamId}" class="team-link">
              ${t.teamName}
            </a>
          </td>

          <td>${t.teamConference || "—"}</td>
          <td>${t.teamLocation || "—"}</td>
        </tr>
      `;
    }

    return html;
  }).join("");

  container.insertAdjacentHTML(
    "beforeend",
    `
      <table class="table owners-teams-table">
        <thead>
          <tr>
            <th>Owner</th>
            <th>Team</th>
            <th>Conference</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `
  );
}
  */

