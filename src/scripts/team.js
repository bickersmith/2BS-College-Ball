import { fetchSheet } from "./fetchSheet.js";
import { renderScheduleCard } from "../components/cards/scheduleCard.js";

async function initTeamPage() {
  const params = new URLSearchParams(window.location.search);
  const teamId = params.get("team");
  if (!teamId) return;

  const teams = await fetchSheet("Teams");
  const scores = await fetchSheet("Scores");

  const team = teams.find(t => String(t.id) === String(teamId));
  if (!team) return;

  renderTeamHeader(team);

  const teamGames = getTeamGames(teamId, scores);

  renderNextFive(teamGames, teams);
  renderFullSchedule(teamGames, teams);
  renderGameTable(teamGames, teams);
}

/* -----------------------------------------
   HEADER ONLY
----------------------------------------- */
function renderTeamHeader(team) {
  document.getElementById("teamName").textContent = team.teamSchool;
  document.getElementById("teamNickname").textContent = team.teamNickname || "";
  document.getElementById("teamLogo").src = team.logoUrl;
}

/* -----------------------------------------
   GET TEAM GAMES
----------------------------------------- */
function getTeamGames(teamId, scores) {
  return scores
    .filter(g => String(g.teamId) === String(teamId))
    .sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));
}

/* -----------------------------------------
   NEXT FIVE GAMES
----------------------------------------- */
function renderNextFive(games, teams) {
  const container = document.getElementById("teamNextFive");
  if (!container) return;

  const nextFive = games.slice(0, 5);

  container.innerHTML = nextFive
    .map(g => renderScheduleCard(g, teams))
    .join("");
}

/* -----------------------------------------
   FULL SCHEDULE (mini cards)
----------------------------------------- */
function renderFullSchedule(games, teams) {
  const container = document.getElementById("teamScheduleGrid");
  if (!container) return;

  container.innerHTML = games
    .map(g => renderScheduleCard(g, teams))
    .join("");
}

/* -----------------------------------------
   FULL TABLE
----------------------------------------- */
function renderGameTable(games, teams) {
  const tbody = document.querySelector("#teamGameTable tbody");
  if (!tbody) return;

  tbody.innerHTML = games.map(g => {
    const opp = teams.find(t => t.id == g.opponentId);

    return `
      <tr>
        <td>${formatDate(g.gameDate)}</td>
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

initTeamPage();
