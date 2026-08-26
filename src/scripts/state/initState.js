// src/scripts/state/initState.js

import { setSlice } from "./store.js";
import { getDefaultLeague, getDefaultSeason } from "../config/envHelpers.js";

export function initState() {
  setSlice("league", getDefaultLeague());
  setSlice("season", getDefaultSeason());
}
