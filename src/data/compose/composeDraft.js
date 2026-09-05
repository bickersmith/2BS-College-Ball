// =======================================
// composeDraft.js — v2
// =======================================

import {
  getTeamById,
  getOwnerById
} from "../utils/lookups.js";

export function composeDraftPick(raw, teams, owners) {
  const team = raw.teamId ? getTeamById(teams, raw.teamId) : null;
  const draftOwner = raw.draftOwnerId
    ? getOwnerById(owners, raw.draftOwnerId)
    : null;

  return {
    draftId: raw.draftId,
    leagueId: raw.leagueId,

    draftPickNumber: raw.draftPickNumber,
    draftRound: raw.draftRound,
    draftSourceSheet: raw.draftSourceSheet,
    draftPickType: raw.draftPickType,
    draftNotes: raw.draftNotes,

    team,
    teamName: raw.teamName,

    draftOwner,

    season: raw.season,

    createdTimestamp: raw.createdTimestamp,
    updatedTimestamp: raw.updatedTimestamp,
    updatedBy: raw.updatedBy,
    updateFlag: raw.updateFlag,
    version: raw.version,
    lastAction: raw.lastAction,
    actionNotes: raw.actionNotes,
    updatedByScript: raw.updatedByScript,
    updatedByHuman: raw.updatedByHuman,
    status: raw.status,
    valid: raw.valid,

    raw
  };
}
