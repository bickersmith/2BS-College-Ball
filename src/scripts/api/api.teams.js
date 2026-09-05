// src/scripts/api/api.teams.js

import { fetchSheet } from "../../data/fetch/fetchSheet.js";
import { normalizeTeam } from "../../data/normalize/normalizeTeam.js";
import { composeTeam } from "../../data/compose/composeTeam.js";
import { getOwners } from "./api.owners.js";

export async function getTeams() {
  const values = await fetchSheet("Team");

  if (!Array.isArray(values) || values.length === 0) {
    console.error("API TEAMS: fetchSheet('Team') returned invalid values:", values);
    return [];
  }

  const header = values[0].map(h => String(h || "").trim());
  const rows = values.slice(1);

  const normalized = rows.map(r => normalizeTeam(header, r));

  const owners = await getOwners();
  const composed = normalized.map(t => composeTeam(t, owners));

  return composed;
}

export function updateTeams(teams) {
  window.__STATE__.teams = teams;
}
