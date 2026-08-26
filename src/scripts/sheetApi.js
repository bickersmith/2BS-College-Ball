// src/scripts/sheetApi.js

import { fetchOwnerData } from "../data/fetch/fetchOwner.js";
import { normalizeOwnerRow } from "./api/normalizeOwner.js";
import { validateOwner } from "./api/validateOwner.js";

export async function loadOwners(leagueId, seasonId) {
  const rows = await fetchOwnerData(leagueId, seasonId);
  return rows.map(normalizeOwnerRow).filter(validateOwner);
}
