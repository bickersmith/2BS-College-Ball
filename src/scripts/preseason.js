// ===============================
// 2BS College Ball — preseason.js
// Preseason Top 25 Page Logic
// ===============================

import { fetchSheet } from "./fetchSheet.js";

document.addEventListener("DOMContentLoaded", async () => {
  const teams = await fetchSheet("Teams");

  const top25 = teams
    .filter(t => parseInt(t.preseasonRank) > 0 && parseInt(t.preseasonRank) <= 25)
    .sort((a, b) => a.preseasonRank - b.preseasonRank);

  const container = document.getElementById("preseason-list");

  container.innerHTML = top25
    .map(t => `
      <a href="team.html?team=${t.id}" class="preseason-card">

        <div class="preseason-rank-bar">
          <span>#${t.preseasonRank}</span>
        </div>

        <img src="${t.logoUrl}" class="preseason-logo">

        <div class="preseason-team-name">${t.teamSchool}</div>
        <div class="preseason-team-nickname">${t.teamNickname}</div>

        <div class="preseason-tags">
          <span class="preseason-tag">${t.conference}</span>
          <span class="preseason-tag">${t.location}</span>
        </div>

      </a>
    `)
    .join("");
});
