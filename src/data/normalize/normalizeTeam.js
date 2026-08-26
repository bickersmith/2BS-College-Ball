export function normalizeTeam(row) {
  return {
    teamId: String(row["Team ID"] || ""),
    teamName: String(row["Team Name"] || ""),
    teamSchool: String(row["Team School"] || ""),
    teamNickname: String(row["Team Nickname"] || ""),
    mascotName: String(row["Mascot Name"] || ""),

    teamAbbreviation: String(row["Team Abbreviation"] || ""),
    teamSlug: String(row["Team Slug"] || ""),

    conference: String(row["Team Conference"] || ""),
    division: String(row["Team Division"] || ""),

    location: String(row["Team Location"] || ""),
    founded: Number(row["Team Founded"] || 0),
    active: row["Team Active"] === "TRUE",

    logoUrl: String(row["Team Logo URL"] || ""),
    helmetUrl: String(row["Team Helmet URL"] || ""),

    primaryColor: String(row["Primary Color"] || ""),
    secondaryColor: String(row["Secondary Color"] || ""),
    alternateColor: String(row["Alternate Color"] || ""),

    mascotImageUrl: String(row["Mascot Image URL"] || ""),
    teamMotto: String(row["Team Motto"] || ""),

    homeStadium: String(row["Home Stadium"] || ""),
    homeStadiumLocation: String(row["Home Stadium Location"] || ""),

    espnTeamId: String(row["ESPN Team ID"] || ""),
    espnTeamSlug: String(row["ESPN Team Slug"] || ""),
    espnLogoUrl: String(row["ESPN Logo URL"] || ""),
    espnHelmetUrl: String(row["ESPN Helmet URL"] || ""),
    espnRank: Number(row["ESPN Rank"] || 0),

    cfbdTeamId: String(row["CFBD Team ID"] || ""),
    cfbdTeamSlug: String(row["CFBD Team Slug"] || ""),

    preseasonRank: Number(row["Preseason Rank"] || 0),
    preseasonConferenceRank: Number(row["Preseason Conference Rank"] || 0),

    ownerId: String(row["Owner ID"] || ""),

    // Audit Trail
    season: Number(row["Season"] || 2026),
    createdTimestamp: new Date(row["Created Timestamp"] || new Date()),
    updatedTimestamp: new Date(row["Updated Timestamp"] || new Date()),
    updatedBy: String(row["Updated By"] || "Migration Script"),
    updateFlag: row["Update Flag"] === "TRUE",
    version: Number(row["Version"] || 1),
    lastAction: String(row["Last Action"] || "Migrated from V1"),
    actionNotes: String(row["Action Notes"] || "Auto-migration"),
    updatedByScript: row["Updated By Script"] === "TRUE",
    updatedByHuman: row["Updated By Human"] === "TRUE",
    status: String(row["Status"] || "Active"),
    valid: row["Valid"] === "TRUE"
  };
}
