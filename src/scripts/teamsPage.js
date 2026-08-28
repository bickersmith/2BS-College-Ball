import { loadConfig } from "./config/env.js";
import { getTeams } from "./api/api.teams.js";
import { getOwners } from "./api/api.owners.js";
import { teamCard } from "../components/cards/teamCard.js";
import { loadNavigation } from "../utils/navigation.js";

window.goToTeam = function(teamId) {
  window.location.href = `team.html?team=${teamId}`;
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigation();
  renderTeamsPage();
});

export async function renderTeamsPage() {
  const owners = await getOwners();
  const teams = await getTeams();

  // Filter out inactive teams
  const activeTeams = teams.filter(t => t.teamActive !== false);

  // Sort alphabetically
  const sortedTeams = activeTeams.sort((a, b) =>
    a.teamName.localeCompare(b.teamName)
  );

  // Build conference list + counts
  const conferenceCounts = {};
  sortedTeams.forEach(t => {
    const conf = t.teamConference || "Independent";
    conferenceCounts[conf] = (conferenceCounts[conf] || 0) + 1;
  });

  const conferences = Object.keys(conferenceCounts).sort();

  // Build owner list
  const ownerList = owners.map(o => ({
    id: o.id,
    name: o.name
  }));

  const container = document.getElementById("content");

  // Sticky alphabetical index bar
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const indexHtml = `
    <div class="alpha-index sticky-alpha">
      ${alphabet.map(letter => `
        <span class="alpha-letter" data-letter="${letter}">${letter}</span>
      `).join("")}
    </div>
  `;

  // Conference filter dropdown with counts
  const conferenceFilterHtml = `
    <div class="conference-filter">
      <select id="conferenceSelect">
        <option value="">All Conferences (${sortedTeams.length})</option>
        ${conferences.map(conf => `
          <option value="${conf}">
            ${conf} (${conferenceCounts[conf]})
          </option>
        `).join("")}
      </select>
    </div>
  `;

  // Owner filter dropdown
  const ownerFilterHtml = `
    <div class="owner-filter">
      <select id="ownerSelect">
        <option value="">All Owners</option>
        ${ownerList.map(o => `
          <option value="${o.id}">${o.name}</option>
        `).join("")}
      </select>
    </div>
  `;

  // Fuzzy search bar
  const searchHtml = `
    <div class="team-search-wrapper">
      <input id="teamSearch" type="text" placeholder="Search teams…" />
    </div>
  `;

  /*
  // Build HTML for each team card
  const teamCardsHtml = sortedTeams.map(team => `
    <div class="team-list-item fade-in"
         data-team-id="${team.teamId}"
         data-team-name="${team.teamName}"
         data-team-conference="${team.teamConference}"
         data-owner-id="${team.ownerId || ""}">
      ${teamCard(team, [], "lg")}
    </div>
  `).join("");
*/
// Build HTML table rows instead of cards
const teamRowsHtml = sortedTeams.map(team => `
  <tr class="team-row fade-in"
      data-team-id="${team.teamId}"
      data-team-name="${team.teamName}"
      data-team-conference="${team.teamConference}"
      data-owner-id="${team.ownerId || ""}">
      
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

/*
  // Final page HTML
  container.innerHTML = `
    <h1 class="page-title">All Teams</h1>
    ${searchHtml}
    ${conferenceFilterHtml}
    ${ownerFilterHtml}
    ${indexHtml}
    <div class="teams-list">
      ${teamCardsHtml}
    </div>
  `;


  removed this from the first line of this next container
  <h1 class="page-title">All Teams</h1>
  */
 container.innerHTML = `
  ${searchHtml}
  ${conferenceFilterHtml}
  ${ownerFilterHtml}
  ${indexHtml}

  <table class="teams-table">
    <thead>
      <tr>
        <th>Logo</th>
        <th>Team</th>
        <th>Conference</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody>
      ${teamRowsHtml}
    </tbody>
  </table>
`;


  // Add anchors for alphabetical jump
sortedTeams.forEach(team => {
  const firstLetter = team.teamName[0].toUpperCase();
  const rowEl = document.querySelector(`[data-team-id="${team.teamId}"]`);
  if (rowEl) rowEl.id = `team-${firstLetter}-${team.teamId}`;
});


  // Alphabetical jump behavior
  document.querySelectorAll('.alpha-letter').forEach(el => {
    el.addEventListener('click', () => {
      const letter = el.dataset.letter;
      const target = document.querySelector(`[id^="team-${letter}"]`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Conference filter behavior
  const conferenceSelect = document.getElementById("conferenceSelect");
  conferenceSelect.addEventListener("change", () => {
    const selected = conferenceSelect.value;

document.querySelectorAll(".team-row").forEach(row => {
  const cardConf = row.dataset.teamConference;
  const show = !selected || cardConf === selected;
  row.style.display = show ? "" : "none";
});

  });

  // Owner filter behavior
  const ownerSelect = document.getElementById("ownerSelect");
  ownerSelect.addEventListener("change", () => {
    const selected = ownerSelect.value;

document.querySelectorAll(".team-row").forEach(row => {
  const cardOwner = row.dataset.ownerId;
  const show = !selected || cardOwner === selected;
  row.style.display = show ? "" : "none";
});

  });

  // Fuzzy search behavior
  const searchInput = document.getElementById("teamSearch");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

document.querySelectorAll(".team-row").forEach(row => {
  const name = row.dataset.teamName.toLowerCase();
  const conf = row.dataset.teamConference.toLowerCase();
  const owner = row.dataset.ownerId.toLowerCase();

  const match =
    name.includes(query) ||
    conf.includes(query) ||
    owner.includes(query);

  row.style.display = match ? "" : "none";
});

  });

  // Add hover highlight via JS (class toggle)
  document.querySelectorAll(".team-list-item").forEach(card => {
    card.addEventListener("mouseenter", () => card.classList.add("hover"));
    card.addEventListener("mouseleave", () => card.classList.remove("hover"));
  });
}
