import { groupBy } from "../utils/group.js";
import { sortByNumber } from "../utils/sort.js";
import { log } from "../../scripts/diagnostics/logger.js";

/**
 * Build the full Owner Dashboard payload
 * @param {Object} data
 * @param {Object} data.owner
 * @param {Array} data.teams
 * @param {Array} data.games
 * @param {Array} data.awards
 * @param {Array} data.draft
 * @param {Array} data.storylines
 */
export function composeOwnerDashboard(data) {
  const { owner, teams, games, awards, draft, storylines } = data;

  log("COMPOSE OwnerDashboard starting");

  // ---------------------------------------------
  // TEAMS SECTION
  // ---------------------------------------------
  const composedTeams = teams.map(t => ({
    id: t.teamId,
    name: t.teamName,
    abbreviation: t.teamAbbreviation,
    slug: t.teamSlug,
    logo: t.teamLogo,
    colors: t.colors || {},
    record: t.record || { wins: 0, losses: 0, ties: 0 },
    division: t.division || "",
    rank: t.rank || null,
    status: "active",
    links: {
      teamPage: `/team.html?teamId=${t.teamId}`,
      schedule: `/games.html?teamId=${t.teamId}`,
      standings: `/standings.html?teamId=${t.teamId}`
    }
  }));

  // ---------------------------------------------
  // ACTIVITY FEED
  // ---------------------------------------------
  const ownerTeamIds = new Set(composedTeams.map(t => t.id));

  const activityGames = games
    .filter(g => ownerTeamIds.has(g.teamId) || ownerTeamIds.has(g.opponentId))
    .map(g => ({
      id: g.id,
      season: g.season,
      week: g.week,
      result: g.result,
      score: `${g.pointsFor}-${g.pointsAgainst}`,
      opponent: g.opponentName,
      opponentId: g.opponentId,
      date: g.date
    }));

  const activityAwards = awards
    .filter(a => ownerTeamIds.has(a.teamId))
    .map(a => ({
      id: a.id,
      season: a.season,
      week: a.week,
      name: a.name,
      recipient: a.recipient,
      teamId: a.teamId
    }));

  const activityDraft = draft
    .filter(d => d.ownerId === owner.id)
    .map(d => ({
      id: d.id,
      season: d.season,
      round: d.round,
      pick: d.pick,
      player: d.player
    }));

  const activity = {
    games: activityGames,
    awards: activityAwards,
    draft: activityDraft
  };

  // ---------------------------------------------
  // SUMMARY SECTION
  // ---------------------------------------------
  const lifetimeRecord = {
    wins: activityGames.filter(g => g.result === "W").length,
    losses: activityGames.filter(g => g.result === "L").length,
    ties: activityGames.filter(g => g.result === "T").length
  };

  const summary = {
    lifetimeRecord: {
      ...lifetimeRecord,
      winPct:
        lifetimeRecord.wins + lifetimeRecord.losses + lifetimeRecord.ties > 0
          ? lifetimeRecord.wins /
            (lifetimeRecord.wins + lifetimeRecord.losses + lifetimeRecord.ties)
          : 0
    },
    points: {
      for: activityGames.reduce((acc, g) => acc + parseInt(g.score.split("-")[0]), 0),
      against: activityGames.reduce((acc, g) => acc + parseInt(g.score.split("-")[1]), 0)
    },
    hardware: {
      championships: awards.filter(a => a.type === "Championship").length,
      divisionTitles: awards.filter(a => a.type === "Division Title").length,
      awards: activityAwards
    },
    currentSeason: {
      season: 2026,
      record: { wins: 0, losses: 0, ties: 0 },
      standing: { rank: null, division: "" },
      playoffStatus: "none"
    },
    badges: []
  };

  // ---------------------------------------------
  // ANALYTICS SECTION
  // ---------------------------------------------
  const gamesBySeason = groupBy(activityGames, "season");

  const analyticsSeasons = Object.entries(gamesBySeason).map(([season, seasonGames]) => {
    const wins = seasonGames.filter(g => g.result === "W").length;
    const losses = seasonGames.filter(g => g.result === "L").length;
    const ties = seasonGames.filter(g => g.result === "T").length;

    return {
      season: parseInt(season),
      record: { wins, losses, ties },
      points: {
        for: seasonGames.reduce((acc, g) => acc + parseInt(g.score.split("-")[0]), 0),
        against: seasonGames.reduce((acc, g) => acc + parseInt(g.score.split("-")[1]), 0)
      },
      rank: null
    };
  });

  const analytics = {
    seasons: sortByNumber(analyticsSeasons, "season"),
    streaks: {
      winStreak: 0,
      playoffStreak: 0
    },
    headToHead: []
  };

  // ---------------------------------------------
  // LORE SECTION
  // ---------------------------------------------
  const lore = {
    tagline: storylines?.tagline || "",
    arcs: storylines?.arcs || [],
    rivalries: storylines?.rivalries || []
  };

  // ---------------------------------------------
  // FINAL DASHBOARD OBJECT
  // ---------------------------------------------
  const dashboard = {
    owner,
    summary,
    teams: composedTeams,
    activity,
    analytics,
    lore
  };

  log("COMPOSE OwnerDashboard complete");
  return dashboard;
}
