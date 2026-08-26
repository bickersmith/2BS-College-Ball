export function goToTeam(teamId) {
  window.location.href = `./team.html?team=${teamId}`;
}

export function goToGame(gameId) {
  window.location.href = `./game.html?game=${gameId}`;
}

export function goToOwner(ownerId) {
  window.location.href = `./owner.html?owner=${ownerId}`;
}
