// src/scripts/config/envHelpers.js

import { getEnv } from "./env.js";

export function getDefaultLeague() {
  const env = getEnv();
  return env.defaultLeague;
}

export function getDefaultSeason() {
  const env = getEnv();
  return env.defaultSeason;
}

export function getApiKey() {
  const env = getEnv();
  return env.sheets.apiKey;
}

export function getSpreadsheetId() {
  const env = getEnv();
  return env.sheets.spreadsheetId;
}

// ⭐ Add this — logger.js expects it
export function isDebug() {
  const env = getEnv();
  return Boolean(env?.debugMode);
}
