import { fetchSheet } from "../scripts/fetchSheet.js";

/* ============================================================
   FRIENDLY DATE FORMATTER
   ============================================================ */
function friendlyDateTime(dateString) {
  const d = new Date(dateString);
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

/* ============================================================
   INIT
   ============================================================ */
async function loadDashboard() {
  const owners = await fetchSheet("Owners");
  const teams = await fetchSheet("Teams");
  const scores = await fetchSheet("Scores");

  renderOwnersGrid(owners, teams);
  renderNextFiveGames(scores, teams);
  renderDraftRecap(teams);
}

/* ============================================================
   OWNERS GRID
   ============================================================ */
function renderOwnersGrid(owners, teams) {
  const container = document.getElementById("owners-grid");
  if (!container) return;

  container.innerHTML = owners.map(owner => {
    const ownedTeams = teams.filter(t => t.ownerId === owner.ownerId);

    return `
      <div class="owner-card">

        <a href="./owner.html?owner=${owner.ownerId}" class="owner-link">
          ${owner.ownerName}
        </a>

        <div class="owner-team-logos">
          ${ownedTeams
            .map(
              team => `
            <a href="./team.html?team=${team.id}" class="owner-team-link">
              <img src="${team.logoUrl}" alt="${team.teamSchool}">
            </a>
          `
            )
            .join("")}
        </div>

      </div>
    `;
  }).join("");
}


/* ============================================================
   NEXT 5 GAMES
   ============================================================ */
function renderNextFiveGames(scores, teams) {
  const container = document.getElementById("next-games");
  if (!container) return;

  const upcoming = scores.filter(g => g.gameDate && !g.result);

  const sorted = upcoming.sort(
    (a, b) => new Date(a.gameDate) - new Date(b.gameDate)
  );

  const nextFive = sorted.slice(0, 5);

  container.innerHTML = nextFive
    .map(game => {
      const team = teams.find(t => t.id === game.teamId);
      const opp = teams.find(t => t.id === game.opponentId);

      const teamLogo = team?.logoUrl || team?.helmetUrl || "";
      const oppLogo = opp?.logoUrl || opp?.helmetUrl || "";

      const teamName = team?.teamSchool || "";
      const oppName = opp?.teamSchool || "";

      const friendly = friendlyDateTime(game.gameDate);

      const isRivalry =
        team?.ownerId &&
        opp?.ownerId &&
        team.ownerId !== opp.ownerId;

      return `
        <a href="./game.html?id=${game.gameId}" class="next-game-card">

          ${isRivalry ? `<div class="next-game-rivalry">RIVALRY</div>` : ""}

          <div class="next-game-top">

            <div class="next-game-team">
              <img src="${teamLogo}" class="next-game-logo">
              <div class="next-game-name">${teamName}</div>
            </div>

            <div class="next-game-vs">vs</div>

            <div class="next-game-team">
              <img src="${oppLogo}" class="next-game-logo">
              <div class="next-game-name">${oppName}</div>
            </div>

          </div>

          <div class="next-game-bottom">
            ${friendly}<br>
            ${game.gameVenue}<br>
            ${game.gameLocation}
          </div>

        </a>
      `;
    })
    .join("");
}

/* ============================================================
   DRAFT RECAP (USING EXPORT LOG — FINAL DATA)
   ============================================================ */
function renderDraftRecap(teams) {
  const container = document.getElementById("draft-recap-grid");

  const draft = [
    {
      owner: "Brian",
      picks: {
        TOP5: "Georgia",
        TOP10: "Miami",
        TOP25: "USC",
        SEC: "Alabama",
        BIGTEN: "Indiana"
      }
    },
    {
      owner: "Jay",
      picks: {
        TOP5: "Notre Dame",
        TOP10: "Ole Miss",
        TOP25: "Louisville",
        SEC: "Tennessee",
        BIGTEN: "Michigan"
      }
    },
    {
      owner: "Brendan",
      picks: {
        TOP5: "Texas",
        TOP10: "Oklahoma",
        TOP25: "Texas Tech",
        SEC: "Texas A&M",
        BIGTEN: "Washington"
      }
    }
  ];

  container.innerHTML = draft
    .map(d => {
      return `
        <div class="draft-recap-card">
          <div class="draft-recap-owner">${d.owner}</div>

          ${Object.entries(d.picks)
            .map(([label, teamName]) => {
              const team = teams.find(t => t.teamSchool === teamName);
              const logo = team?.logoUrl || team?.helmetUrl || "";

              return `
                <div class="draft-recap-row">
                  <div class="draft-recap-label">${label}</div>
                  <div class="draft-recap-team">
                    <img src="${logo}" class="draft-recap-logo">
                    ${teamName}
                  </div>
                </div>
              `;
            })
            .join("")}

        </div>
      `;
    })
    .join("");
}

/* ============================================================
   START
   ============================================================ */
loadDashboard();
