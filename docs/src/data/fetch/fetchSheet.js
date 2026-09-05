// fetchSheet.js — RAW VALUES MODE (safe)

import { getApiKey, getSpreadsheetId } from "../../scripts/config/envHelpers.js";
import { cachedFetch } from "../utils/dataCache.js";
import { log } from "../../scripts/diagnostics/logger.js";

export async function fetchSheet(sheetName) {
  return cachedFetch(sheetName, async () => {
    const apiKey = getApiKey();
    const spreadsheetId = getSpreadsheetId();

    if (!apiKey || !spreadsheetId) {
      log("FETCH", "❌ Missing API key or spreadsheet ID — cannot fetch sheet");
      return [];
    }

    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

    let res;
    try {
      res = await fetch(url);
    } catch (err) {
      log("FETCH", `❌ Network error fetching sheet ${sheetName}: ${err}`);
      return [];
    }

    if (!res.ok) {
      log("FETCH", `❌ fetchSheet error: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();

    if (!json.values || json.values.length === 0) {
      log("FETCH", `⚠️ Sheet ${sheetName} returned no values`);
      return [];
    }

    // Return raw rows (header + data), like before
    return json.values.map(row => [...row]);
  });
}
