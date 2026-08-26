import { ownerSchema } from "../../data/schema/ownerSchema.js";

export function validateOwner(owner) {
  if (!owner) return false;

  for (const field of ownerSchema.required) {
    if (!owner[field]) return false;
  }

  return true;
}
