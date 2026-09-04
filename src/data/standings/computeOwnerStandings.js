import { getGameRows } from "../../scripts/api/api.games.js";
import { getOwners } from "../../scripts/api/api.owners.js";

export async function computeOwnerStandings() {
  const rows = await getGameRows();     // normalized game rows
  const owners = await getOwners();

  const standings = {};

  // Initialize each owner
  for (const owner of owners) {
    standings[owner.id] = {
      ownerId: owner.id,
      ownerName: owner.name,
      ownerSlug: owner.slug,
      ownerLogo: owner.logo || "",
      abbreviation: owner.abbreviation,

      wins: 0,
      losses: 0,
      pf: 0,
      pa: 0,
      diff: 0,

      totalGamePoints: 0,
      gamesPlayed: 0,

      lastResults: [],
      streak: "",

      rawGames: []
    };
  }

  // Process each game row
  for (const row of rows) {
    const ownerId = row.ownerId;
    const owner = standings[ownerId];
    if (!owner) continue;

    owner.rawGames.push(row);

    // Skip NEW games
    if (row.UpdateFlag === "NEW") continue;

    const teamScore = Number(row.teamScore || 0);
    const oppScore = Number(row.opponentScore || 0);

    // ⭐ Correct gamePoints source (home vs away)
    let gamePoints = 0;

    if (row.teamHomeAway === "Home") {
      gamePoints = Number(row.homeGamePoints || 0);
    } else if (row.teamHomeAway === "Away") {
      gamePoints = Number(row.awayGamePoints || 0);
    }

    owner.pf += teamScore;
    owner.pa += oppScore;
    owner.diff = owner.pf - owner.pa;

    // Wins / Losses
    if (row.win === true || row.win === "1") {
      owner.wins += 1;
      owner.lastResults.push("W");
    } else if (row.loss === true || row.loss === "1") {
      owner.losses += 1;
      owner.lastResults.push("L");
    }

    owner.totalGamePoints += gamePoints;
    owner.gamesPlayed += 1;
  }

  // Compute streaks
  for (const ownerId in standings) {
    const owner = standings[ownerId];
    const results = owner.lastResults;

    if (results.length === 0) {
      owner.streak = "—";
      continue;
    }

    let streakCount = 1;
    let type = results[results.length - 1];

    for (let i = results.length - 2; i >= 0; i--) {
      if (results[i] === type) streakCount++;
      else break;
    }

    owner.streak = `${type}${streakCount}`;
  }

  // Convert to array
  const list = Object.values(standings);

  // Sort by totalGamePoints
  list.sort((a, b) => b.totalGamePoints - a.totalGamePoints);

  // Assign rank
  list.forEach((o, i) => {
    o.rank = i + 1;
  });

  return list;
}
