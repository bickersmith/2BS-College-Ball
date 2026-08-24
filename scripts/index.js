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
  loadStorylinesForIndex();
}

/* ============================================================
   OWNERS GRID — TIGHT
   ============================================================ */
function renderOwnersGrid(owners, teams) {
  const container = document.getElementById("owners-grid");
  if (!container) return;

  container.innerHTML = owners.map(owner => {
    const ownedTeams = teams.filter(t => t.ownerId === owner.ownerId);

    return `
      <div class="owner-card-tight">
        <a href="./owner.html?owner=${owner.ownerId}" class="owner-link-tight">
          ${owner.ownerName}
        </a>
        <div class="owner-team-logos-tight">
          ${ownedTeams.map(team => `
            <a href="./team.html?team=${team.id}">
              <img src="${team.logoUrl}" alt="${team.teamSchool}">
            </a>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
}

/* ============================================================
   NEXT 5 GAMES — TIGHT
   ============================================================ */
function renderNextFiveGames(scores, teams) {
  const container = document.getElementById("next-games");
  if (!container) return;

  const upcoming = scores.filter(g => g.gameDate && !g.result);
  const sorted = upcoming.sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));
  const nextFive = sorted.slice(0, 5);

  container.innerHTML = nextFive.map(game => {
    const team = teams.find(t => t.id === game.teamId);
    const opp = teams.find(t => t.id === game.opponentId);

    return `
      <a href="./game.html?id=${game.gameId}" class="next-game-card-tight">
        <div class="next-game-row-tight">
          <img src="${team.logoUrl}" class="next-game-logo-tight">
          <span>${team.teamSchool}</span>
          <span class="next-game-vs-tight">vs</span>
          <img src="${opp.logoUrl}" class="next-game-logo-tight">
          <span>${opp.teamSchool}</span>
        </div>
        <div class="next-game-info-tight">
          ${friendlyDateTime(game.gameDate)} — ${game.gameLocation}
        </div>
      </a>
    `;
  }).join("");
}

/* ============================================================
   STORYLINES — TIGHT
   ============================================================ */
   
async function loadStorylinesForIndex() {
  const res = await fetch("./assets/docs/storylines.txt");
  const text = await res.text();

  const blocks = text.split("# ID:").slice(1);
  const entries = [];

  for (const block of blocks) {
    const lines = block.trim().split("\n");

    const id = lines[0].trim();

    const getSection = (key) => {
      const start = lines.findIndex(l => l.startsWith(key + ":"));
      if (start === -1) return "";
      let content = lines[start].replace(key + ":", "").trim();
      let i = start + 1;
      while (i < lines.length && !lines[i].includes(":")) {
        content += " " + lines[i].trim();
        i++;
      }
      return content.trim();
    };

    entries.push({
      id,
      date: getSection("DATE"),
      headline: getSection("HEADLINE"),
      story: getSection("STORY")
    });
  }

  // --- NUMERIC ID SORTER (same as storylines.js) ---
  const parseId = (id) => {
    const parts = id.split("-");
    return {
      year: parseInt(parts[0]),
      week: parseInt(parts[1].replace("W", "")),
      group: parseInt(parts[2]),
      entry: parseInt(parts[3])
    };
  };

  entries.sort((a, b) => {
    const A = parseId(a.id);
    const B = parseId(b.id);

    if (A.year !== B.year) return B.year - A.year;
    if (A.week !== B.week) return B.week - A.week;
    if (A.group !== B.group) return B.group - A.group;
    return B.entry - A.entry;
  });

  // Show latest 3
  renderLatestStorylines(entries.slice(0, 3));
}

function renderLatestStorylines(list) {
  const container = document.getElementById("latest-storylines-container");

  container.innerHTML = list.map(s => {
    const teaser = s.story.split(" ").slice(0, 12).join(" ") + "...";

    return `
      <a href="./storylines.html?id=${s.id}" class="index-storyline-tight index-storyline-link">
        <div class="index-meta-tight">
          <span>${s.id}</span>
          <span>${s.date}</span>
        </div>
        <div class="index-headline-tight">${s.headline}</div>
        <div class="index-teaser-tight">${teaser}</div>
      </a>
    `;
  }).join("");
}


/* ============================================================
   DRAFT RECAP — TIGHT
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

  container.innerHTML = draft.map(d => `
    <div class="draft-card-tight">
      <div class="draft-owner-tight">${d.owner}</div>
      ${Object.entries(d.picks).map(([label, teamName]) => {
        const team = teams.find(t => t.teamSchool === teamName);
        return `
          <div class="draft-row-tight">
            <span class="draft-label-tight">${label}</span>
            <span class="draft-team-tight">
              <img src="${team.logoUrl}" class="draft-logo-tight">
              ${teamName}
            </span>
          </div>
        `;
      }).join("")}
    </div>
  `).join("");
}

/* ============================================================
   START
   ============================================================ */
loadDashboard();
