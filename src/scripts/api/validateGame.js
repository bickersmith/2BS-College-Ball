import { gameSchema } from "../../data/schema/gameSchema.js";

export function validateGame(game) {
  if (!game) return false;

  for (const field of gameSchema.required) {
    if (!game[field]) return false;
  }

  // Score fallback
  game.schoolScore = Number(game.schoolScore || 0);
  game.opponentScore = Number(game.opponentScore || 0);

  return true;
}
