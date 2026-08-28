import { getTeamById } from "../utils/lookups.js";
import { formatGameDate } from "../../utils/cardUtils.js";
import { log } from "../../scripts/diagnostics/logger.js";

export function composeGame(raw, teams, owners) {

  const team = getTeamById(teams, raw.teamId);
  const opponent = getTeamById(teams, raw.opponentTeamId);

  const safeTeam = (id, label) => ({
    teamId: id,
    teamName: label,
    logo: "",
    city: "",
    stadium: "",
    colors: { primary: "#666" },
    owner: null
  });

  const t = team || safeTeam(raw.teamId, "Unknown Team");
  const o = opponent || safeTeam(raw.opponentTeamId, "Unknown Opponent");

  const dateFormatted = formatGameDate(raw.gameDate);

  return {
    gameId: raw.gameId,
    date: raw.gameDate,
    dateFormatted,

    location: raw.gameLocation,
    venue: raw.gameVenue,
    neutral: raw.neutral === "Y",

    homeTeam: t,
    awayTeam: o,

    score: {
      home: Number(raw.teamScore || 0),
      away: Number(raw.opponentScore || 0)
    },

    season: raw.season,
    raw
  };
}
