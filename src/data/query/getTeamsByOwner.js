export function getTeamsByOwner(teams, ownerId) {
  const id = String(ownerId).trim();
  return teams.filter(t => String(t.ownerId).trim() === id);
}
