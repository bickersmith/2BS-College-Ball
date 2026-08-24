import { fetchSheet } from "./fetchSheet.js";
import { renderScheduleCard } from "../components/cards/scheduleCard.js";

async function initOwnerPage() {
  const params = new URLSearchParams(window.location.search);
  const ownerId = params.get("owner");
  if (!ownerId) return;

  const owners = await fetchSheet("Owners");
  const teams = await fetchSheet("Teams");
  const scores = await fetchSheet("Scores");

  const owner = owners.find(o => String(o.ownerId) === String(ownerId));
  if (!owner) return;

  renderOwnerHeader(owner);

  const ownerTeams = teams.filter(t => String(t.ownerId) === String(ownerId));
  renderOwnerTeams(ownerTeams);

  const ownerGames = getOwnerGames(ownerTeams, scores);

  renderNextFive(ownerGames, teams);
  renderAllGames(ownerGames, teams);
  renderGameTable(ownerGames, teams);
}

/* -----------------------------------------
   HEADER
----------------------------------------- */
function renderOwnerHeader(owner) {
  document.getElementById("ownerName").textContent = owner.ownerName;
}

/* -----------------------------------------
   TEAM LOGOS
----------------------------------------- */
function renderOwnerTeams(ownerTeams) {
  const container = document.getElementById("ownerTeamListLg");
  if (!container) return;

  container.innerHTML = ownerTeams.map(t => `
    <a href="./team.html?team=${t.id}" class="owner-team-logo-link-lg">
      <img src="${t.logoUrl}" class="logo-lg">
    </a>
  `).join("");
}

/* -----------------------------------------
   GET OWNER GAMES
----------------------------------------- */
function getOwnerGames(ownerTeams, scores) {
  const teamIds = ownerTeams.map(t => String(t.id));

  return scores
    .filter(g => teamIds.includes(String(g.teamId)))
    .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));
}

/* -----------------------------------------
   NEXT FIVE GAMES
----------------------------------------- */
function renderNextFive(games, teams) {
  const container = document.getElementById("ownerNextFive");
  if (!container) return;

  const nextFive = games.slice(0, 5);

  container.innerHTML = nextFive
    .map(g => renderScheduleCard(g, teams))
    .join("");
}

/* -----------------------------------------
   FULL SCHEDULE (mini cards)
----------------------------------------- */
function renderAllGames(games, teams) {
  const container = document.getElementById("ownerGamesList");
  if (!container) return;

  container.innerHTML = games
    .map(g => renderScheduleCard(g, teams))
    .join("");
}

/* -----------------------------------------
   FULL TABLE
----------------------------------------- */
function renderGameTable(games, teams) {
  const tbody = document.querySelector("#ownerGameTable tbody");
  if (!tbody) return;

  tbody.innerHTML = games.map(g => {
    const team = teams.find(t => t.id == g.teamId);
    const opp = teams.find(t => t.id == g.opponentId);

    return `
      <tr>
        <td>${formatDate(g.gameDate)}</td>
        <td>${team?.teamSchool || ""}</td>
        <td>${opp?.teamSchool || g.opponent}</td>
        <td>${g.gameVenue}</td>
        <td>${g.gameLocation}</td>
      </tr>
    `;
  }).join("");
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

initOwnerPage();
