import { ownerSchema } from "../../data/schema/ownerSchema.js";

export function validateOwner(owner) {
  if (!owner) return false;

  // Required fields based on your sheet
  if (!owner.ownerId) return false;
  if (!owner.ownerName) return false;

  // Optional but helpful
  owner.ownerSlug = owner.ownerSlug || owner.ownerId;

  return true;
}
