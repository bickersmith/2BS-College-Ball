export function normalizeDraft(row) {
  return {
    draftId: String(row["Draft ID"] || ""),
    draftOwnerId: String(row["Draft Owner ID"] || ""),
    draftPickNumber: Number(row["Draft Pick Number"] || 0),
    draftRound: Number(row["Draft Round"] || 0),
    draftSourceSheet: String(row["Draft Source Sheet"] || ""),
    draftPickType: String(row["Draft Pick Type"] || ""),
    draftNotes: String(row["Draft Notes"] || ""),

    teamId: String(row["Team ID"] || ""),
    teamName: String(row["Team Name"] || ""),

    // ⭐ Audit Trail
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
