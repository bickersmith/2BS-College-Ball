export function normalizeDraftRow(row) {
  return {
    draftOwnerId: row[0],
    draftPickNumber: row[1],
    draftRound: row[2],
    draftNotes: row[3],
    leagueId: row[4],
    seasonId: row[5]
  };
}
