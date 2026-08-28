import { fetchSheet } from "./fetchSheet.js";
import { SHEET_GAME } from "../constants.js";
import { normalizeGame } from "../normalize/normalizeGame.js";
import { log } from "../../scripts/diagnostics/logger.js";

export async function fetchGameData() {
  // Fetch raw rows from Google Sheets
  const rows = await fetchSheet(SHEET_GAME);

  if (!rows || rows.length === 0) {
    log("FETCH", "❌ No game rows returned");
    return [];
  }

  const header = rows[0]; // first row = column names

  // Convert each row array → object keyed by header names
  const objects = rows.slice(1).map(row => {
    const obj = {};
    header.forEach((key, i) => {
      obj[key] = row[i];
    });
    return obj;
  });

  // Filter out rows missing Game ID
  const filtered = objects.filter(obj => {
    const id = String(obj["Game ID"] || "").trim();
    return id !== "";
  });

  log("FETCH", `Game rows: ${filtered.length}`);

  // Normalize each game object
  return filtered.map(obj => normalizeGame(header, obj));
}
