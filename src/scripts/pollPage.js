import { loadConfig } from "/src/scripts/config/env.js";
import { loadNavigation } from "/src/utils/navigation.js";
import { getPolls } from "/src/scripts/api/api.polls.js";
import { getTeams } from "/src/scripts/api/api.teams.js";
import { getOwners } from "/src/scripts/api/api.owners.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  await loadNavigation();
  renderPolls();
});

async function renderPolls() {
  const container = document.getElementById("content");

  const polls = await getPolls();
  const teams = await getTeams();
  const owners = await getOwners();

  // ⭐ Compose poll rows with team + owner data
const composed = polls.map(p => {
  const team = teams.find(t => String(t.espnTeamId) === String(p.TeamID));
  const owner = owners.find(o => String(o.id) === String(team?.ownerId));

  return {
    pollName: p.Week === "0" ? "Preseason Poll" : `Week ${p.Week} Poll`,
    rank: p.Rank,
    rankPrevious: p.RankPrevious,
    pollMove: p.PollMove,
    points: p.Points,

    teamId: team?.teamId,               // ⭐ correct internal ID for links
    teamName: team?.teamName || p.TeamName,
    teamLogo: team?.teamLogo || "",

    ownerName: owner?.name || "",
    ownerId: owner?.id || ""
  };
});


  // ⭐ Group by pollName (Preseason, Week 1, Week 2…)
  const grouped = {};
  composed.forEach(p => {
    if (!grouped[p.pollName]) grouped[p.pollName] = [];
    grouped[p.pollName].push(p);
  });

  let html = `<h1>AP TOP 25 Poll</h1>`;

Object.keys(grouped).forEach(pollName => {
  html += `
    <section class="poll-section">
      <h2>${pollName}</h2>
      <div class="poll-grid">
        ${grouped[pollName].map(team => `
          <div class="poll-card">

            <div class="poll-rank">#${team.rank}</div>

            <a href="/src/pages/team.html?team=${team.teamId}" class="poll-team-link">

              <img src="${team.teamLogo}" class="poll-logo">
            </a>

            <a href="/src/pages/team.html?team=${team.teamId}" class="poll-team poll-team-link">

              ${team.teamName}
            </a>

            ${team.ownerName
              ? `<a href="/src/pages/owner.html?owner=${team.ownerId}" class="poll-owner poll-owner-link">${team.ownerName}</a>`
              : `<div class="poll-owner">—</div>`
            }

          </div>
        `).join("")}
      </div>
    </section>
  `;
});


  container.innerHTML = html;
}
