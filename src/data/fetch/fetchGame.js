import { fetchSheet } from "./fetchSheet.js";
import { SHEET_GAME } from "../constants.js";
import { normalizeGame } from "../normalize/normalizeGame.js";
import { log } from "../../scripts/diagnostics/logger.js";

export async function fetchGameData() {
  const rows = await fetchSheet(SHEET_GAME);

  if (!rows || rows.length === 0) {
    log("FETCH", "❌ No game rows returned");
    return [];
  }

  const header = rows[0];

  // Convert row arrays → objects
  const objects = rows.slice(1).map(row => {
    const obj = {};
    header.forEach((key, i) => {
      obj[key] = row[i];
    });
    return obj;
  });

  // Filter out rows missing GameID
  const filtered = objects.filter(obj => {
    const id = String(obj["GameID"] || "").trim();
    return id !== "";
  });

 // log("FETCH", `Game rows: ${filtered.length}`);

  return filtered.map(obj => normalizeGame(obj));
}
