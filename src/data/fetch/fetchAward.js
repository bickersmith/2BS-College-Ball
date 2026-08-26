import { fetchSheet } from "../sheetApi.js";
import { SHEET_AWARD } from "../constants.js";
import { normalizeAward } from "../normalize/normalizeAward.js";

export async function fetchAwards() {
  const rows = await fetchSheet(SHEET_AWARD);
  return rows.map(normalizeAward);
}
