// src/data/normalize/normalizeTeam.js

import { log } from "../../scripts/diagnostics/logger.js";

export function normalizeTeam(header, row) {
  // ⭐ Clean header names
  header = header.map(h => h.trim());

  // ⭐ Column lookup helper
  const col = name => header.indexOf(name);

  // ⭐ Universal field sanitizer
  const get = key => String(row[col(key)] || "").trim();

  const team = {
    leagueId: get("LeagueID"),
    season: get("Season"),
    teamId: get("TeamID"),
    ownerId: String(get("OwnerID") || "").trim(),
    //ownerId: String(get("OwnerID") || "").trim(),
    teamName: get("TeamName"),
    teamSchool: get("TeamSchool"),
    teamNickname: get("TeamNickname"),
    mascotName: get("MascotName"),
    teamAbbreviation: get("TeamAbbreviation"),
    teamSlug: get("TeamSlug"),
    teamConference: get("TeamConference"),
    teamDivision: get("TeamDivision"),
    teamLocation: get("TeamLocation"),
    teamFounded: get("TeamFounded"),
    teamActive: get("TeamActive"),

    teamLogo: get("TeamLogoURL"),
    teamHelmet: get("TeamHelmetURL"),
    primaryColor: get("PrimaryColor"),
    secondaryColor: get("SecondaryColor"),
    alternateColor: get("AlternateColor"),

    mascotImageUrl: get("MascotImageURL"),
    teamMotto: get("TeamMotto"),
    homeStadium: get("HomeStadium"),
    homeStadiumLocation: get("HomeStadiumLocation"),

    espnTeamId: get("ESPNTeamID"),
    espnTeamSlug: get("ESPNTeamSlug"),
    espnLogoUrl: get("ESPNLogoURL"),
    espnHelmetUrl: get("ESPNHelmetURL"),
    espnRank: get("ESPNRank"),

    cfbdTeamId: get("CFBDTeamID"),
    cfbdTeamSlug: get("CFBDTeamSlug"),

    preseasonRank: get("PreseasonRank"),
    preseasonConferenceRank: get("PreseasonConferenceRank"),

    createdTimestamp: get("CreatedTimestamp"),
    updatedTimestamp: get("UpdatedTimestamp"),
    updatedBy: get("UpdatedBy"),
    updateFlag: get("UpdateFlag"),
    version: get("Version"),
    lastAction: get("LastAction"),
    actionNotes: get("ActionNotes"),
    updatedByScript: get("UpdatedByScript"),
    updatedByHuman: get("UpdatedByHuman"),
    status: get("Status"),
    valid: get("Valid")
  };

  //log("NORMALIZE", `Normalized team ${team.teamId} (${team.ownerId})`);

  return team;
}
