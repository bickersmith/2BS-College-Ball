export function normalizeOwnerRow(row) {
  return {
    ownerId: row[0],
    ownerName: row[1],
    ownerSlug: row[2],
    leagueId: row[3],
    seasonId: row[4]
  };
}
