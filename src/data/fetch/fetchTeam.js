import { fetchSheet } from "../sheetApi.js";
import { SHEET_TEAM } from "../constants.js";
import { normalizeTeam } from "../normalize/normalizeTeam.js";

export async function fetchTeams() {
  const rows = await fetchSheet(SHEET_TEAM);
  return rows.map(normalizeTeam);
}
