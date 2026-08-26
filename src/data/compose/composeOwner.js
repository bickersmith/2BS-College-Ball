import { validateId } from "../utils/validate.js";
import { log } from "../utils/logger.js";

export function composeOwner(owner) {
  validateId(owner.ownerId, "Owner ID");
  return owner;
}
