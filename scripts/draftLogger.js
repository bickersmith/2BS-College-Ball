// draftLogger.js
// FINAL WORKING VERSION — logs all required fields + team metadata

import { appendRow } from "./sheetApi.js";

// Global pick counter
let pickCounter = 1;

// Team lookup table
let teamLookup = {};

// ===============================
// LOAD TEAM METADATA
// ===============================
export function setTeamLookup(teams) {
  teamLookup = {};

  teams.forEach(t => {
    teamLookup[t.teamSchool] = {
      id: t.teamId || "",
      name: t.teamSchool || ""
    };
  });

  // Expose logos globally for draft.js rendering
  window.teamLogos = {};
  teams.forEach(t => {
    window.teamLogos[t.teamSchool] = t.logoUrl || "";
  });
}

// ===============================
// LOG DRAFT ACTION
// ===============================
export function logDraftAction({
  ownerId,
  round,
  source,
  type,
  notes,
  teamName
}) {
  const teamInfo = teamLookup[teamName] || {
    id: "",
    name: teamName || ""
  };

  const row = [
    ownerId || "",          // draftOwnerId
    pickCounter++,          // draftPickNumber
    round || "",            // draftRound
    source || "Draft Engine", // draftSourceSheet
    type || "Pick",         // draftPickType
    notes || "",            // draftNotes

    // Extra fields
    ownerId || "",          // ownerId
    teamInfo.id || "",      // id (Team ID)
    teamInfo.name || ""     // name (Team Name)
  ];

  appendRow("Draft", row);

  console.log("Draft Log Entry:", row);
}
