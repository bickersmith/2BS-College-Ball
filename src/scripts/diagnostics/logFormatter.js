// src/scripts/diagnostics/logFormatter.js

import { LOG_CATEGORIES } from "./logCategories.js";

export function formatLog(category, message, ...args) {
  const ts = new Date().toISOString();
  const cat = LOG_CATEGORIES[category] || category;
  return `[${ts}] [${cat}] ${message}` + (args.length ? " " + JSON.stringify(args) : "");
}
