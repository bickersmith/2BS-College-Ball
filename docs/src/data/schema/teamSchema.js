export const teamSchema = {
  required: [
    "teamId",
    "teamName",
    "leagueId",
    "seasonId"
  ],

  fields: {

  teamId: "string",
  teamName: "string",
  teamSchool: "string",
  teamNickname: "string",
  mascotName: "string",

  teamAbbreviation: "string",
  teamSlug: "string",

  conference: "string",
  division: "string",

  location: "string",
  founded: "number",
  active: "boolean",

  logoUrl: "string",
  helmetUrl: "string",

  primaryColor: "string",
  secondaryColor: "string",
  alternateColor: "string",

  mascotImageUrl: "string",
  teamMotto: "string",

  homeStadium: "string",
  homeStadiumLocation: "string",

  espnTeamId: "string",
  espnTeamSlug: "string",
  espnLogoUrl: "string",
  espnHelmetUrl: "string",
  espnRank: "number",

  cfbdTeamId: "string",
  cfbdTeamSlug: "string",

  preseasonRank: "number",
  preseasonConferenceRank: "number",

  ownerId: "string",

  season: "number",
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