// =======================================
// validateGame.js — v2 RAW MODE + DEBUG
// =======================================

import { log } from "../diagnostics/logger.js";

export function validateGame(game) {
  if (!game) {
    log("VALIDATE", "❌ Game is null/undefined");
    return false;
  }

  // Minimal required fields for schedule
  const required = [
    "gameId",
    "teamId",
    "opponentId",
    "gameDate",
    "schoolScore",
    "opponentScore"
  ];

  for (const field of required) {
    if (game[field] === undefined || game[field] === null || game[field] === "") {
      log("VALIDATE", `❌ Game ${game.gameId} missing required field: ${field}`);
      return false;
    }
  }

  log("VALIDATE", `✔ Game ${game.gameId} passed validation`);
  return true;
}
