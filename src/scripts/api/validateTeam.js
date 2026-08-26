import { teamSchema } from "../../data/schema/teamSchema.js";

export function validateTeam(team) {
  if (!team) return false;

  for (const field of teamSchema.required) {
    if (!team[field]) return false;
  }

  // Type safety
  team.schoolScore = Number(team.schoolScore || 0);
  team.opponentScore = Number(team.opponentScore || 0);

  // Fallbacks
  team.logoUrl = team.logoUrl || "/assets/logos/default.png";

  return true;
}
