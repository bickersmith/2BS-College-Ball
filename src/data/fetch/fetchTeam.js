import { fetchSheet } from "./fetchSheet.js";   // ⭐ REQUIRED
import { SHEET_TEAM } from "../constants.js";
import { normalizeTeam } from "../normalize/normalizeTeam.js";
import { log } from "../../scripts/diagnostics/logger.js";

export async function fetchTeamData() {
  const rows = await fetchSheet(SHEET_TEAM);

  if (!rows || rows.length === 0) {
    log("FETCH", "❌ No team rows returned");
    return [];
  }

  const header = rows[0];
  const idCol = header.indexOf("TeamID");

  const filtered = rows.slice(1).filter(row => {
    const id = String(row[idCol] || "").trim();
    return id !== "";
  });

  //log("FETCH", `Team rows: ${filtered.length}`);

  //return filtered.map(row => normalizeTeam(row, header));
  return rows.map(r => normalizeTeam(header, r));
}
