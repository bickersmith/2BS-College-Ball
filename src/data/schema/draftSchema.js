export const draftSchema = {
  required: [
    "draftOwnerId",
    "draftPickNumber",
    "leagueId",
    "seasonId"
  ],

  fields: {
    draftOwnerId: "string",
    draftPickNumber: "number",
    draftRound: "number",

    draftSourceSheet: "string",
    draftPickType: "string",
    draftNotes: "string",

    leagueId: "string",
    seasonId: "string",

    createdTimestamp: "date",
    updatedTimestamp: "date",
    updatedBy: "string",
    updateFlag: "boolean",
    version: "number",
    lastAction: "string",
    actionNotes: "string",
    updatedByScript: "boolean",
    updatedByHuman: "boolean",
    status: "string",
    valid: "boolean"
  }
};
