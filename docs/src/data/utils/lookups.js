/*old

export function getTeamById(teams, id) {
  return teams.find(t => t.teamId === id);
}

export function getOwnerById(owners, id) {
  return owners.find(o => o.ownerId === id);
}

export function getGamesByTeam(games, teamId) {
  return games.filter(g => g.teamId === teamId || g.opponentId === teamId);
}

export function getAwardsByTeam(awards, teamId) {
  return awards.filter(a => a.recipientTeamId === teamId);
}

export function getDraftByOwner(draft, ownerId) {
  return draft.filter(d => d.draftOwnerId === ownerId);
}*/



// =======================================
// lookups.js — v2 RAW MODE + DEBUG
// =======================================

import { log } from "../../scripts/diagnostics/logger.js";

/*
export function getTeamById(teams, teamId) {
  if (!teamId) {
    log("LOOKUP", "❌ getTeamById called with empty teamId");
    return null;
  }

  const team = teams.find(t => t.teamId === teamId);

  if (!team) {
    log("LOOKUP", `⚠️ No team found for teamId=${teamId}`);
  }

  return team || null;
}

export function getOwnerById(owners, ownerId) {
  if (!ownerId) {
    log("LOOKUP", "LOOKUP", "⚠️ getOwnerById called with empty ownerId");
    return null;
  }

  const owner = owners.find(o => o.ownerId === ownerId);

  if (!owner) {
    log("LOOKUP", `⚠️ No owner found for ownerId=${ownerId}`);
  }

  //return owner || null;
  return owners.find(o => o.ownerId === ownerId) || null;
}
*/

export function getTeamById(teams, id) {
  return teams.find(t => t.teamId === id);
}

export function getOwnerById(owners, id) {
  return owners.find(o => o.id === id);
}


// =======================================
// lookups.js — v2 future‑proof utilities
// =======================================

// Teams
/* above until debug is done
export function getTeamById(teams, teamId) {
  return teams.find(t => t.teamId === teamId) || null;
}
  */

export function getTeamBySlug(teams, slug) {
  return teams.find(t => t.teamSlug === slug) || null;
}

// Owners
/*
export function getOwnerById(owners, ownerId) {
  return owners.find(o => o.ownerId === ownerId) || null;
}
*/
// Games
export function getGameById(games, gameId) {
  return games.find(g => g.gameId === gameId) || null;
}

// Awards
export function getAwardById(awards, awardId) {
  return awards.find(a => a.awardId === awardId) || null;
}

export function getAwardsByTeam(awards, teamId) {
  return awards.filter(a => a.recipientTeamId === teamId);
}

export function getAwardsByOwner(awards, ownerId) {
  return awards.filter(a => a.recipientOwnerId === ownerId);
}

// Draft
export function getDraftPickById(draft, pickId) {
  return draft.find(p => p.draftPickId === pickId) || null;
}

export function getDraftPicksByTeam(draft, teamId) {
  return draft.filter(p => p.teamId === teamId);
}

export function getDraftPicksByOwner(draft, ownerId) {
  return draft.filter(p => p.draftOwnerId === ownerId);
}
