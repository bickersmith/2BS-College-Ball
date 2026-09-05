import { awardSchema } from "../../data/schema/awardSchema.js";

export function validateAward(award) {
  if (!award) return false;

  for (const field of awardSchema.required) {
    if (!award[field]) return false;
  }

  award.totalAwardPoints = Number(award.totalAwardPoints || 0);

  return true;
}
