export const awardSchema = {
  required: [
    "awardName",
    "leagueId",
    "seasonId"
  ],

  fields: {
    awardName: "string",
    awardPlayerName: "string",
    awardPlayerPosition: "string",
    awardPlayerClass: "string",

    totalAwardPoints: "number",
    awardNotes: "string",

    finishTop25: "boolean",
    finishTop10: "boolean",
    finish1: "boolean",

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
