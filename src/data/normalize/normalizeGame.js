// src/data/normalize/normalizeGame.js

import { log } from "../../scripts/diagnostics/logger.js";

export function normalizeGame(header, row) {
  // ⭐ Clean header names
  header = header.map(h => h.trim());

  // ⭐ Column lookup helper
  const col = name => header.indexOf(name);

  // ⭐ Universal field sanitizer (same as owners + teams)
  const get = key => String(row[col(key)] || "").trim();

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

    // TEAM SIDE
    teamId: get("TeamID"),
    ownerId: String(get("OwnerID") || "").trim(),
    teamName: get("TeamName"),
    teamHomeAway: get("TeamHomeAway"),
    teamRank: get("TeamRank"),

    // OPPONENT SIDE
    opponentTeamId: get("OpponentTeamID"),
    opponentOwnerId: String(get("OpponentOwnerID") || "").trim(),
    opponentTeamName: get("OpponentTeamName"),
    opponentRank: get("OpponentRank"),
    rivalry: get("Rivalry"),

    // SCORE
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
    beatTop10: get("BeatTop10"),
    beatTop25: get("BeatTop25"),
    rivalWin: get("RivalWin"),
    rivalLoss: get("RivalLoss"),

    // ESPN
    espnKickoffTime: get("ESPNKickoffTime"),
    espnVenue: get("ESPNVenue"),
    espnBroadcastNetwork: get("ESPNBroadcastNetwork"),

    // CFBD
    cfbdVenue: get("CFBDVenue"),
    cfbdWeather: get("CFBDWeather"),
    cfbdTemperature: get("CFBDTemperature"),
    cfbdConditions: get("CFBDConditions"),
    cfbdAttendance: get("CFBDAttendance"),
    cfbdRank: get("CFBDRank"),

    // GAME DETAILS
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

    // META
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

  log("NORMALIZE", `Normalized game ${game.gameId}`);

  return game;
}
