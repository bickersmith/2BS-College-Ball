// src/data/fetch/fetchSheet.js

import { getApiKey, getSpreadsheetId } from "../../scripts/config/envHelpers.js";
import { cachedFetch } from "../utils/dataCache.js";

export async function fetchSheet(sheetName, leagueId, seasonId) {
  return cachedFetch(sheetName, leagueId, seasonId, async () => {
    const apiKey = getApiKey();
    const spreadsheetId = getSpreadsheetId();

    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) {
      console.error("fetchSheet error:", res.status, res.statusText);
      return [];
    }

    const json = await res.json();
    return json.values || [];
  });
}
