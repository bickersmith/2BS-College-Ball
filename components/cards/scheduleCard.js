export function renderScheduleGameCard(g, teams) {
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

export function renderScheduleCard(g, teams) {
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
