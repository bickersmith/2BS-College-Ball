export function dataHealthCheck({ owners, teams, games, awards, draft }) {
  const errors = [];

  // Owners
  const ownerIds = new Set(owners.map(o => o.ownerId));

  // Teams
  teams.forEach(team => {
    if (!ownerIds.has(team.ownerId)) {
      errors.push(`Team ${team.teamId} has missing ownerId ${team.ownerId}`);
    }
  });

  // Games
  const teamIds = new Set(teams.map(t => t.teamId));

  games.forEach(game => {
    if (!teamIds.has(game.teamId)) {
      errors.push(`Game ${game.gameId} has missing teamId ${game.teamId}`);
    }
    if (game.opponentId && !teamIds.has(game.opponentId)) {
      errors.push(`Game ${game.gameId} has missing opponentId ${game.opponentId}`);
    }
  });

  // Awards
  awards.forEach(award => {
    if (award.recipientOwnerId && !ownerIds.has(award.recipientOwnerId)) {
      errors.push(`Award ${award.awardId} missing recipientOwnerId ${award.recipientOwnerId}`);
    }
    if (award.recipientTeamId && !teamIds.has(award.recipientTeamId)) {
      errors.push(`Award ${award.awardId} missing recipientTeamId ${award.recipientTeamId}`);
    }
  });

  // Draft
  draft.forEach(d => {
    if (!ownerIds.has(d.draftOwnerId)) {
      errors.push(`Draft ${d.draftId} missing draftOwnerId ${d.draftOwnerId}`);
    }
  });

  return errors;
}
