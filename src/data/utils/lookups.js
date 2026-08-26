export function getTeamById(teams, id) {
  return teams.find(t => t.teamId === id);
}

export function getOwnerById(owners, id) {
  return owners.find(o => o.ownerId === id);
}

export function getGamesByTeam(games, teamId) {
  return games.filter(g => g.teamId === teamId || g.opponentId === teamId);
}

export function getAwardsByTeam(awards, teamId) {
  return awards.filter(a => a.recipientTeamId === teamId);
}

export function getDraftByOwner(draft, ownerId) {
  return draft.filter(d => d.draftOwnerId === ownerId);
}
