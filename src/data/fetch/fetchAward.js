import { fetchSheet } from "./fetchSheet.js";
import { SHEET_AWARD } from "../constants.js";
import { normalizeAward } from "../normalize/normalizeAward.js";
import { log } from "../../scripts/diagnostics/logger.js";

export async function fetchAwardData() {
  const rows = await fetchSheet(SHEET_AWARD);

  if (!rows || rows.length === 0) {
    log("FETCH", "❌ No award rows returned");
    return [];
  }

  const header = rows[0];
  const idCol = header.indexOf("Award ID");

  const filtered = rows.slice(1).filter(row => {
    const id = (row[idCol] || "").trim();
    return id !== "";
  });

  log("FETCH", `Award rows: ${filtered.length}`);

  return filtered.map(row => normalizeAward(row, header));
}
