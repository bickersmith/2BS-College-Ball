export function normalizeOwner(row) {
  return {
    ownerId: String(row["Owner ID"] || ""),
    ownerName: String(row["Owner Name"] || ""),
    ownerAbbreviation: String(row["Owner Abbreviation"] || ""),
    ownerSlug: String(row["Owner Slug"] || ""),
    ownerEmail: String(row["Owner Email"] || ""),

    colorPrimary: String(row["Owner Team Color Primary"] || ""),
    colorSecondary: String(row["Owner Team Color Secondary"] || ""),
    colorAlternate: String(row["Owner Team Color Alternate"] || ""),

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
