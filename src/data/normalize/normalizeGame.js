
// src/data/normalize/normalizeGame.js

import { GAME_BADGES } from "../../scripts/data/utils/gameBadges.js";

export function normalizeGame(header, row) {
  header = header.map(h => h.trim());

  const get = key => String(row[key] || "").trim();

const rivalryRaw = get("Rivalry"); // or whatever the real header is

const rivalry = (
  rivalryRaw === "1" ||
  rivalryRaw === 1 ||
  rivalryRaw === "TRUE" ||
  rivalryRaw === "Yes" ||
  rivalryRaw === "Rivalry"
) ? 1 : 0;
  
  const game = {
    leagueId: get("LeagueID"),
    season: get("Season"),

    gameId: get("GameID"),
    gameUuid: get("GameUUID"),
    espnGameId: get("ESPNGameID"),
    cfbdGameId: get("CFBDGameID"),

    gameDate: get("GameDate"),
    bowlName: get("BowlName"),
    week: get("Week"),
    neutral: get("Neutral"),
    gameType: get("GameType"),
    postseasonType: get("PostseasonType"),
    postseasonFlags: get("PostseasonFlags"),
    gamePoints: get("GamePoints"),

    teamId: get("TeamID"),
    ownerId: get("OwnerID"),
    teamName: get("TeamName"),
    teamHomeAway: get("TeamHomeAway"),
    teamRank: get("TeamRank"),

    opponentTeamId: get("OpponentTeamID"),
    opponentOwnerId: get("OpponentOwnerID"),
    opponentTeamName: get("OpponentTeamName"),
    opponentRank: get("OpponentRank"),

    rivalry: rivalry,

    teamScore: get("TeamScore"),
    opponentScore: get("OpponentScore"),
    result: get("Result"),
    ot: get("OT"),
    win: get("Win"),
    loss: get("Loss"),

    blowoutWin: get("BlowoutWin"),
    closeWin: get("CloseWin"),
    shutoutWin: get("ShutoutWin"),
    otWin: get("OTWin"),
    otLoss: get("OTLoss"),

    upsetWin: get("UpsetWin"),
    badLoss: get("BadLoss"),

    beatTop5: get("BeatTop5"),
    beatTop10: get("BeatTop10"),
    beatTop25: get("BeatTop25"),

    lostTop5: get("LostTop5"),
    lostTop10: get("LostTop10"),
    lostTop25: get("LostTop25"),

    rivalWin: get("RivalWin"),
    rivalLoss: get("RivalLoss"),

    highScoringGame: get("HighScoringGame"),
    lowScoringGame: get("LowScoringGame"),
    shootOut: get("ShootOut"),
    defensiveBattle: get("DefensiveBattle"),

    oneScoreLoss: get("OneScoreLoss"),
    gotShutOut: get("GotShutOut"),

    espnKickoffTime: get("ESPNKickoffTime"),
    espnVenue: get("ESPNVenue"),
    espnBroadcastNetwork: get("ESPNBroadcastNetwork"),

    cfbdVenue: get("CFBDVenue"),
    cfbdWeather: get("CFBDWeather"),
    cfbdTemperature: get("CFBDTemperature"),
    cfbdConditions: get("CFBDConditions"),
    cfbdAttendance: get("CFBDAttendance"),
    cfbdRank: get("CFBDRank"),

    gameVenue: get("GameVenue"),
    gameLocation: get("GameLocation"),
    gameAttendance: get("GameAttendance"),
    gameBroadcastNetwork: get("GameBroadcastNetwork"),
    gameWeather: get("GameWeather"),
    gameTemperature: get("GameTemperature"),
    gameConditions: get("GameConditions"),
    gameDuration: get("GameDuration"),
    gameKeyPlays: get("GameKeyPlays"),
    gameSummary: get("GameSummary"),
    gameDescription: get("GameDescription"),
    gameNotes: get("GameNotes"),

    createdTimestamp: get("CreatedTimestamp"),
    updatedTimestamp: get("UpdatedTimestamp"),
    updatedBy: get("UpdatedBy"),
    updateFlag: get("UpdateFlag"),
    version: get("Version"),
    lastAction: get("LastAction"),
    actionNotes: get("ActionNotes"),
    updatedByScript: get("UpdatedByScript"),
    updatedByHuman: get("UpdatedByHuman"),
    status: get("Status"),
    valid: get("Valid"),

    raw: row
  };

  // Badge normalization
  GAME_BADGES.forEach(badge => {
    const value = get(badge.key);
    game[badge.key] =
      value === "1" ||
      value === "Y" ||
      value === "true" ||
      value === "TRUE";
  });


  //console.log("DEBUG NORMALIZED ROW:", row);
  
  return game;
}
