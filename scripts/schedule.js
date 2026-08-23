import { fetchSheet } from "./fetchSheet.js";

/* ============================================================
   FRIENDLY DATE FORMATTER
   ============================================================ */

function friendlyDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", async () => {
  const teams = await fetchSheet("Teams");
  const scores = await fetchSheet("Scores");

  // Deduplicate games
  const uniqueGames = Array.from(
    new Map(scores.map(g => [g.gameId, g])).values()
  );

  // Sort by date
  uniqueGames.sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));

  // Group by friendly date
  const grouped = {};
  uniqueGames.forEach(g => {
    const label = friendlyDate(g.gameDate);
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(g);
  });

  const container = document.getElementById("schedule-list");

  container.innerHTML = Object.entries(grouped)
    .map(([dateLabel, games]) => `
      <div class="schedule-date-block">
        <div class="schedule-date-title">${dateLabel}</div>
        <div class="schedule-grid">
          ${games.map(g => renderScheduleCard(g, teams)).join("")}
        </div>
      </div>
    `)
    .join("");
});

/* ============================================================
   CARD RENDERER
   ============================================================ */

function renderScheduleCard(g, teams) {
  const team = teams.find(t => t.id == g.teamId);
  const opp = teams.find(t => t.id == g.opponentId);

  const teamLogo = team?.logoUrl || team?.helmetUrl || "";
  const oppLogo = opp?.logoUrl || opp?.helmetUrl || "";

  const teamName = team?.teamSchool || team?.name || "";
  const oppName = opp?.teamSchool || g.opponent || "";

  const rivalry =
    team?.ownerId &&
    opp?.ownerId &&
    team.ownerId !== opp.ownerId;

  const teamScore = g.schoolScore || "—";
  const oppScore = g.opponentScore || "—";

  const teamWin = teamScore !== "—" && oppScore !== "—" && Number(teamScore) > Number(oppScore);
  const oppWin = teamScore !== "—" && oppScore !== "—" && Number(oppScore) > Number(teamScore);

  return `
    <a href="game.html?game=${g.gameId}" class="schedule-card-mini">

      ${rivalry ? `<div class="schedule-mini-rivalry">RIVALRY</div>` : ""}

      <div class="schedule-mini-row">
        <img src="${teamLogo}" class="logo-xs">
        <span class="schedule-mini-name">${teamName}</span>
        <span class="schedule-mini-at">@</span>
        <span class="schedule-mini-name">${oppName}</span>
        <img src="${oppLogo}" class="logo-xs">
      </div>

      <div class="schedule-mini-scoreline">
        <span class="${teamWin ? "score-win" : ""}">${teamScore}</span>
        –
        <span class="${oppWin ? "score-win" : ""}">${oppScore}</span>
      </div>

      <div class="schedule-mini-info">
        ${g.gameVenue}<br>
        ${g.gameLocation}
      </div>

    </a>
  `;
}
