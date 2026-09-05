import { draftSchema } from "../../data/schema/draftSchema.js";

export function validateDraft(draft) {
  if (!draft) return false;

  for (const field of draftSchema.required) {
    if (!draft[field]) return false;
  }

  draft.draftPickNumber = Number(draft.draftPickNumber);

  return true;
}
