import { getGameRows } from "../../scripts/api/api.games.js";
import { getTeams } from "../../scripts/api/api.teams.js";

export async function computeTeamStandings() {
  const rows = await getGameRows();   // ⭐ raw normalized rows
  const teams = await getTeams();

  const activeTeams = teams.filter(t =>
    t.teamActive === true ||
    t.teamActive === "TRUE" ||
    t.teamActive === "true"
  );

  const standings = {};

  // Initialize each team
  for (const team of activeTeams) {
    standings[team.teamId] = {
      teamId: team.teamId,
      teamName: team.teamName,
      ownerId: team.ownerId,
      teamSlug: team.teamSlug,
      teamLogo: team.teamLogo,
      conference: team.teamConference,

      wins: 0,
      losses: 0,
      pf: 0,
      pa: 0,
      diff: 0,
      streak: "",
      lastResults: [],

      totalGamePoints: 0,
      gamesPlayed: 0,

      // ⭐ NEW: store raw game rows for owner standings
      rawGames: []
    };
  }

  // Process each row independently
  for (const row of rows) {
    const teamId = row.teamId;
    const team = standings[teamId];
    if (!team) continue;

    // ⭐ NEW: store raw row for owner standings
    team.rawGames.push(row.raw);

    // ⭐ NEW: skip NEW games entirely
    if (row.raw?.UpdateFlag === "NEW") {
      continue;
    }

    const teamScore = Number(row.teamScore || 0);
    const oppScore = Number(row.opponentScore || 0);
    const gamePoints = Number(row.gamePoints || 0);

    team.pf += teamScore;
    team.pa += oppScore;
    team.diff = team.pf - team.pa;

    if (row.win === "1") {
      team.wins += 1;
      team.lastResults.push("W");
    } else if (row.loss === "1") {
      team.losses += 1;
      team.lastResults.push("L");
    }

    team.totalGamePoints += gamePoints;
    team.gamesPlayed += 1;
  }

  // Compute streaks
  for (const teamId in standings) {
    const row = standings[teamId];
    const results = row.lastResults;

    if (results.length === 0) {
      row.streak = "—";
      continue;
    }

    let streakCount = 1;
    let type = results[results.length - 1];

    for (let i = results.length - 2; i >= 0; i--) {
      if (results[i] === type) streakCount++;
      else break;
    }

    row.streak = `${type}${streakCount}`;
  }

  // Convert to array
  const list = Object.values(standings);

  // Sort by totalGamePoints
  list.sort((a, b) => b.totalGamePoints - a.totalGamePoints);

  // Assign rank
  list.forEach((t, i) => {
    t.rank = i + 1;
  });

  return list;
}
