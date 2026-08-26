// scripts/state/debugState.js
import { getState } from "./store.js";
import { isDebug } from "../config/envHelpers.js";

export function debugState() {
  if (isDebug()) {
    console.log("STATE:", JSON.parse(JSON.stringify(getState())));
  }
}
