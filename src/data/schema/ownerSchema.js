export const ownerSchema = {
  required: [
    "ownerId",
    "ownerName",
    "leagueId",
    "seasonId"
  ],

  fields: {
    ownerId: "string",
    ownerName: "string",
    ownerSlug: "string",

    email: "string",
    phone: "string",

    primaryColor: "string",
    secondaryColor: "string",
    alternateColor: "string",

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
