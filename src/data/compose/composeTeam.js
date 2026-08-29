

import { getOwnerById } from "../utils/lookups.js";

export function composeTeam(teamRaw, owners) {
  const owner = getOwnerById(owners, teamRaw.ownerId);

  return {
    // Identity
    teamId: teamRaw.teamId,
    teamName: teamRaw.teamName,
    teamSlug: teamRaw.teamSlug,
    teamNickname: teamRaw.teamNickname,
    teamAbbreviation: teamRaw.teamAbbreviation,
    teamSchool: teamRaw.teamSchool,
  
    espnTeamId: teamRaw.espnTeamId,

    // Branding
    teamLogo: teamRaw.teamLogo,
    teamHelmet: teamRaw.teamHelmet,

    // Conference / location
    teamConference: teamRaw.teamConference,
    teamLocation: teamRaw.teamLocation,
    teamFounded: teamRaw.teamFounded,
    preseasonRank: teamRaw.preseasonRank,
    preseasonConferenceRank: teamRaw.preseasonConferenceRank,

    // Active flag (boolean)
    teamActive: teamRaw.teamActive === "TRUE" || teamRaw.teamActive === true,

    // Colors
    colors: {
      primary: teamRaw.primaryColor,
      secondary: teamRaw.secondaryColor,
      alternate: teamRaw.alternateColor
    },

    // Owner (composed)
    ownerId: teamRaw.ownerId,
    owner,

    // Raw passthrough
    raw: teamRaw
  };
}
