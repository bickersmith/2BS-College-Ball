import { log } from "/src/scripts/diagnostics/logger.js";
import { loadConfig } from "/src/scripts/config/env.js";
import { getApiKey, getSpreadsheetId } from "../../scripts/config/envHelpers.js";

export async function getPolls() {
  await loadConfig();

  const apiKey = getApiKey();
  const spreadsheetId = getSpreadsheetId();

  const sheetName = "Poll";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  log("FETCH", `Fetching Poll sheet: ${sheetName}`);
  log("FETCH URL", url);

  const response = await fetch(url);
  const data = await response.json();

  if (!data.values || data.values.length === 0) {
    log("ERROR", "Poll sheet empty or missing");
    return [];
  }

  const header = data.values[0];
  const rows = data.values.slice(1);

  return rows.map(row => {
    const obj = {};
    header.forEach((h, i) => {
      obj[h] = row[i] || "";
    });
    return obj;
  });
}
