import {
  autoDraft,
  pickOne,
  clearDraft,
  lockDraft,
  unlockDraft,
  getDraftState,
  getOwners,
  setOwnerOrder,
  setDraftUpdateCallback
} from "./draftEngine.js";

import { fetchSheet } from "./fetchSheet.js";
import { setTeamLookup } from "./draftLogger.js";

// DOM READY WRAPPER — prevents null errors
window.addEventListener("DOMContentLoaded", async () => {

  const container = document.getElementById("draft-body");
  const logBox = document.getElementById("draft-log");
  const statusBox = document.getElementById("draft-status");

  let randomizedOwners = [...getOwners()];

  function shuffleOwners(list) {
    return [...list].sort(() => Math.random() - 0.5);
  }

  // SAFE BUTTON WIRING
  const btnRandomize = document.getElementById("btn-randomize");
  const btnAuto = document.getElementById("btn-auto");
  const btnPick = document.getElementById("btn-pick");
  const btnClear = document.getElementById("btn-clear");
  const btnLock = document.getElementById("btn-lock");
  const btnUnlock = document.getElementById("btn-unlock");

  if (btnRandomize) {
    btnRandomize.onclick = () => {
      randomizedOwners = shuffleOwners(getOwners());
      setOwnerOrder(randomizedOwners);
      renderAll();
    };
  }

  if (btnAuto) btnAuto.onclick = () => autoDraft();
  if (btnPick) btnPick.onclick = () => pickOne();
  if (btnClear) btnClear.onclick = () => clearDraft();
  if (btnLock) btnLock.onclick = () => lockDraft();
  if (btnUnlock) btnUnlock.onclick = () => unlockDraft();

  // Load teams
  const teams = await fetchSheet("Teams");
  setTeamLookup(teams);

  // Live update callback
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

  function renderAll() {
    renderPicks();
    renderLog();
    renderStatus();
  }

  // Initial render
  renderAll();

  // EXPORT REMOVED — page is now test-only
});
