import { fetchSheet } from "../sheetApi.js";
import { SHEET_DRAFT } from "../constants.js";
import { normalizeDraft } from "../normalize/normalizeDraft.js";

export async function fetchDraft() {
  const rows = await fetchSheet(SHEET_DRAFT);
  return rows.map(normalizeDraft);
}



import { normalizeGame } from "../normalize/normalizeGame.js";
import { SHEET_API } from "../sheetApi.js";

export async function fetchGame() {
  const raw = await SHEET_API.getSheet("Games");
  return raw.map(normalizeGame);
}
