import {
  autoDraft,
  pickOne,
  clearDraft,
  lockDraft,
  unlockDraft,
  getDraftState,
  getOwners,
  setOwnerOrder
} from "./draftEngine.js";

import { fetchSheet } from "./fetchSheet.js";
import { setTeamLookup } from "./draftLogger.js";

const container = document.getElementById("draft-body");
const logBox = document.getElementById("draft-log");
const statusBox = document.getElementById("draft-status");

let randomizedOwners = [...getOwners()];

function shuffleOwners(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

document.getElementById("btn-randomize").onclick = () => {
  randomizedOwners = shuffleOwners(getOwners());
  setOwnerOrder(randomizedOwners);
  renderAll();
};

async function loadTeams() {
  const teams = await fetchSheet("Teams");
  setTeamLookup(teams);
}

await loadTeams();

import { setDraftUpdateCallback } from "./draftEngine.js";
setDraftUpdateCallback(() => {
  renderAll();
});

function renderPicks() {
  const { grid } = getDraftState();

  container.innerHTML = randomizedOwners.map(o => {
    const picks = grid[o.ownerId];

    const pickCards = Object.entries(picks)
      .map(([pool, team]) => {
        if (!team) return "";
        const logo = window.teamLogos?.[team];

        return `
          <div class="pick-card">
            <div class="pool-label">${pool.toUpperCase()}</div>
            ${logo ? `<img class="draft-logo" src="${logo}" alt="${team}">` : ""}
            <div class="team-name">${team}</div>
          </div>
        `;
      })
      .join("");

    return `
      <div class="owner-card">
        <h3>${o.ownerName}</h3>
        ${pickCards || "<div class='pick-card'>No picks yet</div>"}
      </div>
    `;
  }).join("");
}

function renderLog() {
  const { log } = getDraftState();

  logBox.innerHTML = log.map(entry => `
    <div class="log-entry">
      <strong>${entry.ownerName}</strong> → ${entry.poolName.toUpperCase()}
      <span style="color:#444">(${entry.team})</span>
    </div>
  `).join("");
}

function renderStatus() {
  const { locked } = getDraftState();

  if (locked) {
    statusBox.textContent = "🔒 Draft Locked";
    statusBox.style.background = "#D32F2F";
    statusBox.style.color = "#fff";
  } else {
    statusBox.textContent = "🔓 Draft Unlocked";
    statusBox.style.background = "#81C784";
    statusBox.style.color = "#000";
  }
}

document.getElementById("btn-auto").onclick = () => autoDraft();
document.getElementById("btn-pick").onclick = () => pickOne();
document.getElementById("btn-clear").onclick = () => clearDraft();
document.getElementById("btn-lock").onclick = () => lockDraft();
document.getElementById("btn-unlock").onclick = () => unlockDraft();

function renderAll() {
  renderPicks();
  renderLog();
  renderStatus();
}

renderAll();

// ============================================================
// EXPORT RESULTS
// ============================================================

document.getElementById("btn-export").onclick = () => {
  const state = getDraftState();

  const exportData = {
    ownerOrder: getOwners().map(o => o.ownerName),
    picks: getOwners().map(o => ({
      ownerId: o.ownerId,
      ownerName: o.ownerName,
      selections: state.grid[o.ownerId]
    })),
    log: state.log
  };

  const output = document.getElementById("export-output");
  output.textContent = JSON.stringify(exportData, null, 2);
};
