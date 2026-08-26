import { validateId } from "../utils/validate.js";
import { getTeamById, getOwnerById } from "../utils/lookups.js";
import { log } from "../utils/logger.js";

export function composeAward(award, teams, owners) {
  validateId(award.teamId, "Team ID");
  validateId(award.ownerId, "Owner ID");

  const team = getTeamById(teams, award.teamId);
  const owner = getOwnerById(owners, award.ownerId);

  if (!team) {
    log(`Award ${award.awardId} missing team ${award.teamId}`);
  }

  if (!owner) {
    log(`Award ${award.awardId} missing owner ${award.ownerId}`);
  }

  return {
    ...award,
    team,
    owner
  };
}
