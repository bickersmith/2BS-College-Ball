// src/tests/testRunner.js

import { validateTeam } from "../scripts/api/validateTeam.js";
import { mockTeam } from "./mockData.js";

function runTests() {
  console.log("Running tests...");

  console.log("validateTeam(mockTeam):", validateTeam(mockTeam));
}

runTests();
