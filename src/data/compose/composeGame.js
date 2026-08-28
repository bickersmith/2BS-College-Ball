// src/data/compose/composeGame.js

import { getTeamById, getOwnerById } from "../utils/lookups.js";
import { formatGameDate } from "../../utils/cardUtils.js";
import { log } from "../../scripts/diagnostics/logger.js";

export function composeGame(rows, teams, owners) {
  // rows is an array of normalized rows for the same GameID
  const homeRow =
    rows.find(r => r.teamHomeAway === "Home") ||
    rows[0];

  const awayRow =
    rows.find(r => r.teamHomeAway === "Away") ||
    rows.find(r => r.teamId !== homeRow.teamId) ||
    rows[1] ||
    rows[0];

  const safeTeam = (row, labelFallback) => ({
    teamId: row.teamId || "",
    teamName: row.teamName || labelFallback,
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

  const homeScore = Number(
    homeRow.teamScore || homeRow.opponentScore || 0
  );
  const awayScore = Number(
    awayRow.teamScore || awayRow.opponentScore || 0
  );

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
      home: homeScore,
      away: awayScore
    },

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

    rows
  };

  log("COMPOSE", `Composed game ${game.gameId} (${homeTeam.teamName} vs ${awayTeam.teamName})`);

  return game;
}
