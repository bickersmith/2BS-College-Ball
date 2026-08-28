/*import { getOwnerById } from "../utils/lookups.js";

export function composeTeam(teamRaw, owners) {
  const owner = getOwnerById(owners, teamRaw.ownerId);

  return {
    // ---------------------------------------
    // Core identity
    // ---------------------------------------
    teamId: teamRaw.teamId,
    teamName: teamRaw.teamName,
    teamSlug: teamRaw.teamSlug,
    teamLogo: teamRaw.teamLogo,

    // ---------------------------------------
    // Metadata
    // ---------------------------------------
    teamConference: teamRaw.teamConference,
    teamLocation: teamRaw.teamLocation,
    teamActive: teamRaw.teamActive === "TRUE" || teamRaw.teamActive === true,

    // ---------------------------------------
    // Colors
    // ---------------------------------------
    colors: {
      primary: teamRaw.teamColorPrimary,
      secondary: teamRaw.teamColorSecondary,
      alternate: teamRaw.teamColorAlternate
    },

    // ---------------------------------------
    // Owner (composed)
    // ---------------------------------------
    owner,

    // ---------------------------------------
    // Raw passthrough (optional)
    // ---------------------------------------
    meta: {
      created: teamRaw.createdTimestamp,
      updated: teamRaw.updatedTimestamp,
      updatedBy: teamRaw.updatedBy,
      status: teamRaw.status,
      valid: teamRaw.valid
    }
  };
}
*/

import { getOwnerById } from "../utils/lookups.js";

export function composeTeam(teamRaw, owners) {
  const owner = getOwnerById(owners, teamRaw.ownerId);

  return {
    // Identity
    teamId: teamRaw.teamId,
    teamName: teamRaw.teamName,
    teamSlug: teamRaw.teamSlug,
    teamAbbreviation: teamRaw.teamAbbreviation,

    // Branding
    teamLogo: teamRaw.teamLogo,
    teamHelmet: teamRaw.teamHelmet,

    // Conference / location
    teamConference: teamRaw.teamConference,
    teamLocation: teamRaw.teamLocation,

    // Active flag (boolean)
    teamActive: teamRaw.teamActive === "TRUE" || teamRaw.teamActive === true,

    // Colors
    colors: {
      primary: teamRaw.primaryColor,
      secondary: teamRaw.secondaryColor,
      alternate: teamRaw.alternateColor
    },

    // Owner (composed)
    owner,

    // Raw passthrough
    raw: teamRaw
  };
}
