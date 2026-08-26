// src/data/fetch/fetchOwner.js

import { fetchSheet } from "./fetchSheet.js";

export async function fetchOwnerData(leagueId, seasonId) {
  const rows = await fetchSheet("Owners", leagueId, seasonId);
  return rows;
}
