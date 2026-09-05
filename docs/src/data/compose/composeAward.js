// =======================================
// composeAward.js — v2
// =======================================

import {
  getTeamById,
  getOwnerById,
  getGameById
} from "../utils/lookups.js";

export function composeAward(raw, teams, owners, games) {
  const team = raw.teamId ? getTeamById(teams, raw.teamId) : null;
  const owner = raw.ownerId ? getOwnerById(owners, raw.ownerId) : null;
  const game = raw.gameId ? getGameById(games, raw.gameId) : null;

  return {
    awardId: raw.awardId,
    awardName: raw.awardName,
    awardCategory: raw.awardCategory,
    leagueId: raw.leagueId,

    team,
    owner,
    game,

    awardPoints: raw.awardPoints,
    awardPlayerName: raw.awardPlayerName,
    awardPlayerPosition: raw.awardPlayerPosition,
    awardPlayerClass: raw.awardPlayerClass,
    awardNotes: raw.awardNotes,

    heisman: raw.heisman,
    maxwell: raw.maxwell,
    walterCamp: raw.walterCamp,
    daveyOBrien: raw.daveyOBrien,
    doakWalker: raw.doakWalker,
    biletnikoff: raw.biletnikoff,
    johnMackey: raw.johnMackey,
    outland: raw.outland,
    rimington: raw.rimington,
    nagurski: raw.nagurski,
    bednarik: raw.bednarik,
    thorpe: raw.thorpe,
    butkus: raw.butkus,
    rayGuy: raw.rayGuy,
    louGroza: raw.louGroza,
    paulHornung: raw.paulHornung,
    campbellTrophy: raw.campbellTrophy,

    consensusAllAmericans: raw.consensusAllAmericans,
    firstTeamAllAmericans: raw.firstTeamAllAmericans,

    playerOfTheYear: raw.playerOfTheYear,
    coachOfTheYear: raw.coachOfTheYear,
    freshmanOfTheYear: raw.freshmanOfTheYear,

    finishTop25: raw.finishTop25,
    finishTop10: raw.finishTop10,
    finish1: raw.finish1,

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
