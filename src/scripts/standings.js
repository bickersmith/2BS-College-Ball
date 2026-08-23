// ===============================
// 2BS College Ball — standings.js
// Standings Page Logic (placeholder until implemented)
// ===============================

import { fetchSheet } from "../scripts/fetchSheet.js";

async function loadStandings() {
  const teams = await fetchSheet("Teams");
  const scores = await fetchSheet("Scores");

  // Placeholder standings logic
  const standings = teams.map(t => ({
    teamId: t.id,
    teamSchool: t.teamSchool,
    ownerName: t.ownerName,
    conference: t.conference,
    wins: 0,
    losses: 0
  }));

  const container = document.getElementById("standings-table");

  container.innerHTML = `
    <div class="standings-placeholder">
      Standings are not implemented yet — coming soon.
    </div>
  `;
}

loadStandings();
