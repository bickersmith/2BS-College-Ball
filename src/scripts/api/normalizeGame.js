export function normalizeGameRow(row) {
  return {
    gameId: row[0],
    teamId: row[1],
    opponentId: row[2],
    week: row[3],
    gameDate: row[4],
    schoolScore: row[5],
    opponentScore: row[6],
    result: row[7],
    leagueId: row[8],
    seasonId: row[9]
  };
}
