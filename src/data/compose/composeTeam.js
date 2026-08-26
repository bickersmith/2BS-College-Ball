import { validateId } from "../utils/validate.js";
import { getOwnerById } from "../utils/lookups.js";
import { log } from "../utils/logger.js";

export function composeTeam(team, owners) {
  validateId(team.teamId, "Team ID");
  validateId(team.ownerId, "Owner ID");

  const owner = getOwnerById(owners, team.ownerId);

  if (!owner) {
    log(`Team ${team.teamId} missing owner ${team.ownerId}`);
  }

  return {
    ...team,
    owner
  };
}
