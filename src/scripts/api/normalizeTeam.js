export function normalizeTeamRow(row) {
  return {
    teamId: row[0],
    teamName: row[1],
    conference: row[2],
    ownerId: row[3],
    logoUrl: row[4],
    leagueId: row[5],
    seasonId: row[6]
  };
}
