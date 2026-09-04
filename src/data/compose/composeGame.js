import { getTeamById, getOwnerById } from "../utils/lookups.js";
import { formatGameDate } from "../../utils/cardUtils.js";
import { GAME_BADGES } from "../../scripts/data/utils/gameBadges.js";

export function composeGame(rows, teams, owners) {
  const homeRow = rows.find(r => r.teamHomeAway === "Home") || rows[0];
  const awayRow =
    rows.find(r => r.teamHomeAway === "Away") ||
    rows.find(r => r.teamId !== homeRow.teamId) ||
    rows[1] ||
    rows[0];

  const safeTeam = (row, fallback) => ({
    teamId: row.teamId || "",
    teamName: row.teamName || fallback,
    teamLogo: "",
    teamCity: "",
    stadium: row.gameVenue || "",
    colors: { primary: "#666" },
    owner: null
  });

  const homeTeamLookup = getTeamById(teams, homeRow.teamId);
  const awayTeamLookup = getTeamById(teams, awayRow.teamId);

  const homeTeam = homeTeamLookup || safeTeam(homeRow, "Home Team");
  const awayTeam = awayTeamLookup || safeTeam(awayRow, "Away Team");

  homeTeam.owner = getOwnerById(owners, homeRow.ownerId) || null;
  awayTeam.owner = getOwnerById(owners, awayRow.ownerId) || null;

  const dateFormatted = formatGameDate(homeRow.gameDate);

  const game = {
    gameId: homeRow.gameId,
    gameUuid: homeRow.gameUuid,
    espnGameId: homeRow.espnGameId,
    cfbdGameId: homeRow.cfbdGameId,

    date: homeRow.gameDate,
    dateFormatted,

    location: homeRow.gameLocation || awayRow.gameLocation,
    venue: homeRow.gameVenue || awayRow.gameVenue,
    neutral: homeRow.neutral === "Y" || awayRow.neutral === "Y",

    homeTeam,
    awayTeam,

    score: {
      home: Number(homeRow.teamScore || 0),
      away: Number(awayRow.teamScore || 0)
    },

    // ⭐ Standings-critical fields (lowercase normalized fields)
    teamScore: Number(homeRow.teamScore || 0),
    opponentScore: Number(awayRow.teamScore || 0),

    win: homeRow.win === "1",
    loss: homeRow.loss === "1",

    gamePoints: Number(homeRow.gamePoints || 0),

    ownerId: homeRow.ownerId,
    opponentOwnerId: awayRow.ownerId,

    result: homeRow.result || "",

    season: homeRow.season,
    week: homeRow.week,
    gameType: homeRow.gameType,
    postseasonType: homeRow.postseasonType,
    postseasonFlags: homeRow.postseasonFlags,

    broadcast: homeRow.gameBroadcastNetwork || homeRow.espnBroadcastNetwork,
    weather: homeRow.gameWeather || homeRow.cfbdWeather,
    temperature: homeRow.gameTemperature || homeRow.cfbdTemperature,
    conditions: homeRow.gameConditions || homeRow.cfbdConditions,

    summary: homeRow.gameSummary,
    description: homeRow.gameDescription,
    notes: homeRow.gameNotes,

  updateFlag: homeRow.updateFlag,
    
    rows
  };



  // Scoring Flags
  const scoringFlags = {};
  GAME_BADGES.forEach(badge => {
    scoringFlags[badge.key] = homeRow[badge.key] === "1";
  });

  game.scoringFlags = scoringFlags;

  return game;
}
