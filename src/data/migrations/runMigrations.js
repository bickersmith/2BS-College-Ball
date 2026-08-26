// src/data/migrations/runMigrations.js
import {
  teamMigrations,
  ownerMigrations,
  gameMigrations,
  awardMigrations,
  draftMigrations
} from "./migrations.js";

export function migrateTeams(teams) {
  return teams.map(team => applyMigrations(team, teamMigrations));
}

export function migrateOwners(owners) {
  return owners.map(owner => applyMigrations(owner, ownerMigrations));
}

export function migrateGames(games) {
  return games.map(game => applyMigrations(game, gameMigrations));
}

export function migrateAwards(awards) {
  return awards.map(award => applyMigrations(award, awardMigrations));
}

export function migrateDraft(draftRows) {
  return draftRows.map(draft => applyMigrations(draft, draftMigrations));
}

function applyMigrations(record, migrations) {
  return migrations.reduce((acc, migration) => migration.apply(acc), record);
}
