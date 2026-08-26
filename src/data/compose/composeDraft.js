import { validateId } from "../utils/validate.js";
import { getTeamById, getOwnerById } from "../utils/lookups.js";
import { log } from "../utils/logger.js";

export function composeDraft(draft, teams, owners) {
  validateId(draft.teamId, "Team ID");
  validateId(draft.draftOwnerId, "Draft Owner ID");

  const team = getTeamById(teams, draft.teamId);
  const owner = getOwnerById(owners, draft.draftOwnerId);

  if (!team) {
    log(`Draft ${draft.draftId} missing team ${draft.teamId}`);
  }

  if (!owner) {
    log(`Draft ${draft.draftId} missing owner ${draft.draftOwnerId}`);
  }

  return {
    ...draft,
    team,
    owner
  };
}
