export function normalizeAwardRow(row) {
  return {
    awardName: row[0],
    awardPlayerName: row[1],
    totalAwardPoints: row[2],
    leagueId: row[3],
    seasonId: row[4]
  };
}
