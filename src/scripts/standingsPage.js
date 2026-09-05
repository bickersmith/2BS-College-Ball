import { loadConfig } from "./config/env.js";
import { computeTeamStandings } from "../data/compute/computeTeamStandings.js";
import { loadNavigation } from "../utils/navigation.js";
import { getOwners } from "../scripts/api/api.owners.js";

window.goToTeam = function(teamId) {
  window.location.href = `team.html?team=${teamId}`;
};

window.goToOwner = function(ownerId) {
  window.location.href = `owner.html?owner=${ownerId}`;
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigation();

  const standings = await computeTeamStandings();
  const owners = await getOwners();

  // Attach ownerName to each team
  standings.forEach(t => {
    const owner = owners.find(o => String(o.id) === String(t.ownerId));
    t.ownerName = owner ? owner.name : "";
  });

  // Build owner standings
  const ownerRows = buildOwnerStandings(standings, owners);
  const ownerTableHtml = renderOwnerStandingsTable(ownerRows);

  // Default: owned teams only
  const ownedTeams = standings.filter(t => t.ownerId && t.ownerId !== "0");

  // Render owner standings + team standings
  const container = document.getElementById("content");
  container.innerHTML = ownerTableHtml;

  renderStandings(ownedTeams, standings, "owned", owners);
  enableStandingsSorting(ownedTeams, owners);
  enableFilterNav(standings, owners);
});

function enableFilterNav(fullList, owners) {
  const ownedLink = document.getElementById("filter-owned");
  const allLink = document.getElementById("filter-all");

  if (!ownedLink || !allLink) return;

  ownedLink.onclick = () => {
    const ownedTeams = fullList.filter(t => t.ownerId && t.ownerId !== "0");
    renderStandings(ownedTeams, fullList, "owned", owners);
    enableStandingsSorting(ownedTeams, owners);
    enableFilterNav(fullList, owners);
  };

  allLink.onclick = () => {
    renderStandings(fullList, fullList, "all", owners);
    enableStandingsSorting(fullList, owners);
    enableFilterNav(fullList, owners);
  };
}

function enableStandingsSorting(list, owners) {
  const table = document.querySelector(".standings-table");
  if (!table) return;

  const headers = table.querySelectorAll("th[data-sort]");

  headers.forEach(th => {
    th.onclick = () => {
      const key = th.dataset.sort;
      const ascending = th.dataset.asc === "true";
      th.dataset.asc = (!ascending).toString();

      list.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (!isNaN(valA) && !isNaN(valB)) {
          return ascending ? valA - valB : valB - valA;
        }

        return ascending
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });

      const currentFilter =
        document.querySelector(".filter-nav .active")?.dataset.filter || "owned";

      renderStandings(list, list, currentFilter, owners);
      enableStandingsSorting(list, owners);
      enableFilterNav(list, owners);
    };
  });
}

function renderStandings(list, fullList, activeFilter, owners) {
  const container = document.getElementById("content");

  const navHtml = `
    <div class="filter-nav">
      <button id="filter-owned" data-filter="owned" class="${activeFilter === "owned" ? "active" : ""}">
        Owned Teams
      </button>
      <button id="filter-all" data-filter="all" class="${activeFilter === "all" ? "active" : ""}">
        All Teams
      </button>
    </div>
  `;

  let html = `
    <div class="team-standings-section">
      ${navHtml}
      <table class="standings-table">
        <thead>
          <tr>
            <th data-sort="rank">Rank</th>
            <th>Logo</th>
            <th data-sort="teamName">Team</th>
            <th data-sort="ownerName">Owner</th>
            <th data-sort="totalGamePoints">GPts</th>
            <th data-sort="wins">W</th>
            <th data-sort="losses">L</th>
            <th data-sort="pf">PF</th>
            <th data-sort="pa">PA</th>
            <th data-sort="diff">Diff</th>
            <th data-sort="streak">Streak</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (const t of list) {
    const logo = t.teamLogo
      ? `<img src="${t.teamLogo}" class="standings-logo" alt="${t.teamName} logo">`
      : `<div class="standings-logo placeholder"></div>`;

    html += `
      <tr>
        <td>${t.rank}</td>
        <td>${logo}</td>
        <td><a href="team.html?team=${t.teamId}">${t.teamName}</a></td>
        <td>${t.ownerName || ""}</td>
        <td>${t.totalGamePoints}</td>
        <td>${t.wins}</td>
        <td>${t.losses}</td>
        <td>${t.pf}</td>
        <td>${t.pa}</td>
        <td>${t.diff}</td>
        <td>${t.streak}</td>
      </tr>
    `;
  }

  html += `
        </tbody>
      </table>
    </div>
  `;

  const teamSection = container.querySelector(".team-standings-section");
  if (teamSection) {
    teamSection.outerHTML = html;
  } else {
    container.innerHTML += html;
  }
}

function renderOwnerStandingsTable(ownerRows) {
  return `
    <div class="owner-standings-section">

      ${ownerRows.map(r => `
        <div class="owner-standings-row" onclick="goToOwner(${r.ownerId})">

          <div class="owner-left">
            <div class="owner-rank-name">
              <span class="owner-rank">${r.rank}</span>
              <span class="owner-name">${r.ownerName}</span>
            </div>

            <a class="owner-best-logo" href="team.html?team=${r.bestTeamId}" onclick="event.stopPropagation()">
              <img src="${r.bestTeamLogo}" alt="${r.bestTeamName} logo">
            </a>
          </div>

          <div class="owner-right">
            <div class="owner-line"><span class="label">Total Points:</span><span class="value">${r.totalGPts}</span></div>
            <div class="owner-line"><span class="label">Game Points Avg:</span><span class="value">${r.avgGPts}</span></div>
            <div class="owner-line"><span class="label">Best Team:</span><span class="value">${r.bestTeamName} (${r.bestTeamGPts})</span></div>
            <div class="owner-line"><span class="label">Worst Team:</span><span class="value">${r.worstTeamName} (${r.worstTeamGPts})</span></div>
          </div>

        </div>
      `).join("")}
    </div>
  `;
}

/*
function buildOwnerStandings(standings, owners) {
  const rows = [];

  owners.forEach(owner => {
    const teams = standings.filter(t => String(t.ownerId) === String(owner.id));
    if (teams.length === 0) return;

    let totalGPts = 0;
    let totalGamesPlayed = 0;

    teams.forEach(team => {
      const completedGames = team.rawGames
        ? team.rawGames.filter(g => g.UpdateFlag !== "NEW")
        : [];

      // ⭐ Correct gamePoints source (home vs away)
      const completedGPts = completedGames.reduce((sum, g) => {
        const gp =
          g.teamHomeAway === "Home"
            ? Number(g.homeGamePoints || 0)
            : Number(g.awayGamePoints || 0);

        return sum + gp;
      }, 0);

      totalGPts += completedGPts;
      totalGamesPlayed += completedGames.length;
    });

    const avgGPts =
      totalGamesPlayed > 0 ? Math.round(totalGPts / totalGamesPlayed) : 0;

    // ⭐ Best/Worst teams based on totalGamePoints (already correct)
    const bestTeam = teams.slice().sort((a, b) => b.totalGamePoints - a.totalGamePoints)[0];
    const worstTeam = teams.slice().sort((a, b) => a.totalGamePoints - b.totalGamePoints)[0];

    rows.push({
      ownerId: owner.id,
      ownerName: owner.name,
      teamCount: teams.length,

      totalGPts,
      avgGPts,

      bestTeamId: bestTeam.teamId,
      bestTeamLogo: bestTeam.teamLogo,
      bestTeamName: bestTeam.teamName,
      bestTeamGPts: bestTeam.totalGamePoints,

      worstTeamName: worstTeam.teamName,
      worstTeamGPts: worstTeam.totalGamePoints
    });
  });

  rows.sort((a, b) => b.totalGPts - a.totalGPts);
  rows.forEach((r, i) => (r.rank = i + 1));

  return rows;
}
*/
function buildOwnerStandings(standings, owners) {
  const rows = [];

  owners.forEach(owner => {
    const teams = standings.filter(t => String(t.ownerId) === String(owner.id));
    if (teams.length === 0) return;

    // ⭐ Use precomputed values from computeTeamStandings()
    const totalGPts = teams.reduce(
      (sum, t) => sum + Number(t.totalGamePoints || 0),
      0
    );

    const totalGamesPlayed = teams.reduce(
      (sum, t) => sum + Number(t.gamesPlayed || 0),
      0
    );

    const avgGPts =
      totalGamesPlayed > 0
        ? Number(totalGPts / totalGamesPlayed).toFixed(2)
        : "0.00";

    // ⭐ Best/Worst teams based on totalGamePoints
    const bestTeam = teams.slice().sort((a, b) => b.totalGamePoints - a.totalGamePoints)[0];
    const worstTeam = teams.slice().sort((a, b) => a.totalGamePoints - b.totalGamePoints)[0];

    rows.push({
      ownerId: owner.id,
      ownerName: owner.name,
      teamCount: teams.length,

      totalGPts,
      avgGPts,

      bestTeamId: bestTeam.teamId,
      bestTeamLogo: bestTeam.teamLogo,
      bestTeamName: bestTeam.teamName,
      bestTeamGPts: bestTeam.totalGamePoints,

      worstTeamName: worstTeam.teamName,
      worstTeamGPts: worstTeam.totalGamePoints
    });
  });

  rows.sort((a, b) => b.totalGPts - a.totalGPts);
  rows.forEach((r, i) => (r.rank = i + 1));

  return rows;
}

