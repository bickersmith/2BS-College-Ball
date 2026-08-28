export function composeOwner(owner) {
  return {
    id: owner.ownerId,
    name: owner.ownerName,
    abbreviation: owner.ownerAbbreviation,
    slug: owner.ownerSlug,
    email: owner.ownerEmail,

    colors: {
      primary: owner.ownerTeamColorPrimary,
      secondary: owner.ownerTeamColorSecondary,
      alternate: owner.ownerTeamColorAlternate
    },

    notes: owner.ownerNotes,

    meta: {
      created: owner.createdTimestamp,
      updated: owner.updatedTimestamp,
      updatedBy: owner.updatedBy,
      updateFlag: owner.updateFlag,
      version: owner.version,
      lastAction: owner.lastAction,
      actionNotes: owner.actionNotes,
      script: owner.updatedByScript,
      human: owner.updatedByHuman,
      status: owner.status,
      valid: owner.valid
    }
  };
}
