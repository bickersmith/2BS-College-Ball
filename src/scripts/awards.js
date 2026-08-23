// ===============================
// 2BS College Ball — awards.js
// Awards Page Logic (placeholder until implemented)
// ===============================

import { fetchSheet } from "../scripts/fetchSheet.js";

async function loadAwards() {
  const teams = await fetchSheet("Teams");

  const container = document.getElementById("awards-list");

  container.innerHTML = `
    <div class="awards-placeholder">
      Awards are not implemented yet — coming soon.
    </div>
  `;
}

loadAwards();
