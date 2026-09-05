// src/data/utils/validate.js
import { teamSchema } from "../schema/teamSchema.js";
import { ownerSchema } from "../schema/ownerSchema.js";
import { gameSchema } from "../schema/gameSchema.js";
import { awardSchema } from "../schema/awardSchema.js";
import { draftSchema } from "../schema/draftSchema.js";

export function validateTeam(team) {
  return validateAgainstSchema(team, teamSchema);
}

export function validateOwner(owner) {
  return validateAgainstSchema(owner, ownerSchema);
}

export function validateGame(game) {
  return validateAgainstSchema(game, gameSchema);
}

export function validateAward(award) {
  return validateAgainstSchema(award, awardSchema);
}

export function validateDraft(draft) {
  return validateAgainstSchema(draft, draftSchema);
}

function validateAgainstSchema(obj, schema) {
  if (!obj) return false;

  for (const field of schema.required) {
    if (!obj[field]) return false;
  }

  // optional: type checks, ranges, etc.
  return true;
}
