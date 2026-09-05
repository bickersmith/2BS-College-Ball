// src/components/core/componentRegistry.js

import { teamCard } from "../cards/teamCard.js";
import { ownerCard } from "../cards/ownerCard.js";
import { gameCard } from "../cards/gameCard.js";
import { awardCard } from "../cards/awardCard.js";
import { draftCard } from "../cards/draftCard.js";
import { scheduleGameCard } from "../cards/scheduleGameCard.js";

const registry = {
  team: teamCard,
  owner: ownerCard,
  game: gameCard,
  award: awardCard,
  draft: draftCard,
  scheduleGame: scheduleGameCard
};

export function getComponent(name) {
  return registry[name];
}

export function renderComponent(name, props) {
  const component = registry[name];
  if (!component) {
    console.warn("Unknown component:", name);
    return "";
  }
  return component(props);
}
