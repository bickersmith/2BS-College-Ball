// ===============================
// v2 Compose Game — aligned with normalizeGame()
// ===============================

import { getTeamById, getOwnerById } from "../utils/lookups.js";
import { formatGameDate } from "../../utils/cardUtils.js";

export function composeGame(raw, teams, owners) {
  console.log("🛠 composeGame RAW:", raw);

  // Teams
  const homeTeam = getTeamById(teams, raw.teamId);
  const awayTeam = getTeamById(teams, raw.opponentId);

  if (!homeTeam || !awayTeam) {
    console.warn("⚠️ Missing team data in game:", raw);
  }

  // Owner (if applicable)
  const owner = getOwnerById(owners, raw.ownerId);

  // Date formatting
  const dateFormatted = formatGameDate(raw.gameDate);

  // Build composed object for schedule rendering
  return {
    gameId: raw.gameId,

    // Dates
    date: raw.gameDate,
    dateFormatted,

    // Location / Venue
    location: raw.gameLocation,
    venue: raw.gameVenue,

    // Teams
    homeTeam,
    awayTeam,

    // Score
    score: {
      home: raw.schoolScore,
      away: raw.opponentScore
    },

    // Season
    season: raw.season,

    // Raw reference (optional but useful)
    raw
  };
}
