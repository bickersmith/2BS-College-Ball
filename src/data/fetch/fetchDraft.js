import { fetchSheet } from "./fetchSheet.js";
import { SHEET_DRAFT } from "../constants.js";
import { normalizeDraft } from "../normalize/normalizeDraft.js";
import { log } from "../../scripts/diagnostics/logger.js";

export async function fetchDraftData() {
  const rows = await fetchSheet(SHEET_DRAFT);

  if (!rows || rows.length === 0) {
    log("FETCH", "❌ No draft rows returned");
    return [];
  }

  const header = rows[0];
  const idCol = header.indexOf("Draft ID");

  const filtered = rows.slice(1).filter(row => {
    const id = (row[idCol] || "").trim();
    return id !== "";
  });

  log("FETCH", `Draft rows: ${filtered.length}`);

  return filtered.map(row => normalizeDraft(row, header));
}
