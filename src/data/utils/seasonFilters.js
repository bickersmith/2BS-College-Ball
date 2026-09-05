export function filterBySeason(items, season) {
  return items.filter(i => i.season === season);
}

export function getGamesBySeason(games, season) {
  return filterBySeason(games, season);
}

export function getTeamsBySeason(teams, season) {
  return filterBySeason(teams, season);
}

export function getAwardsBySeason(awards, season) {
  return filterBySeason(awards, season);
}

export function getDraftBySeason(draft, season) {
  return filterBySeason(draft, season);
}
