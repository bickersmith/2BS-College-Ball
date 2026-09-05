// src/data/fetch/fetchGame.js

import { fetchSheet } from "../fetch/fetchSheet.js";
import { normalizeGame } from "../normalize/normalizeGame.js";
import { log } from "../../scripts/diagnostics/logger.js";

const SHEET_GAME = "Game";

export async function fetchGameData() {
  const rows = await fetchSheet(SHEET_GAME);
//console.log(await fetchGameDataRaw());
  if (!rows || rows.length === 0) {
    log("FETCH", "No game rows returned from sheet");
    return [];
  }

  // Header row
  const rawHeader = rows[0];
  const header = rawHeader.map(h => String(h).trim());

  // Build objects from remaining rows
  const objects = rows.slice(1).map(row => {
    const obj = {};
    header.forEach((key, i) => {
      obj[key] = row[i];
    });
    return obj;
  });

  // Filter out rows without GameID
  const filtered = objects.filter(obj => {
    const id = String(obj["GameID"] || "").trim();
    return id !== "";
  });

  // Group rows by GameID
  const grouped = {};
  for (const obj of filtered) {
    const id = String(obj["GameID"]);
    if (!grouped[id]) grouped[id] = [];
    grouped[id].push(obj);
  }

  // Normalize each row in each group
  const normalizedGroups = Object.values(grouped).map(groupRows => {
    return groupRows.map(r => normalizeGame(header, r));
  });

  log("FETCH", `Fetched and grouped ${normalizedGroups.length} games`);

  return normalizedGroups;
}

export async function fetchGameDataRaw() {
  const raw = await fetchSheet("Game");

  if (!Array.isArray(raw) || raw.length === 0) {
    return [];
  }

  return raw;   // array-of-arrays
}
