import { fetchSheet } from "../sheetApi.js";
import { SHEET_GAME } from "../constants.js";
import { normalizeGame } from "../normalize/normalizeGame.js";

export async function fetchGames() {
  const rows = await fetchSheet(SHEET_GAME);
  return rows.map(normalizeGame);
}
