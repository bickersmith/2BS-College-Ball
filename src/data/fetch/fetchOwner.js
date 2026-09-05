import { SHEET_OWNER } from "../constants.js";
import { fetchSheet } from "./fetchSheet.js";
import { normalizeOwner } from "../normalize/normalizeOwner.js";
import { log } from "../../scripts/diagnostics/logger.js";

export async function fetchOwnerData() {
  const rows = await fetchSheet(SHEET_OWNER);

  if (!rows || rows.length === 0) {
    log("FETCH", "❌ No owner rows returned");
    return [];
  }

  const header = rows[0];

  // Filter out empty rows
  const filtered = rows.slice(1).filter(row => {
    const id = String(row[header.indexOf("OwnerID")] || "").trim();
    return id !== "";
  });

  //log("FETCH", `Owner rows: ${filtered.length}`);

  return filtered.map(row => normalizeOwner(header, row));

  //log("FETCH", `Moving on`);

}
