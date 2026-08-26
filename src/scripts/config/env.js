// src/scripts/config/env.js

let config = null;

export async function loadConfig() {
  if (config) return config;

  const res = await fetch("/src/scripts/config/config.json");
  config = await res.json();

  return config;
}

export function getEnv() {
  return config;
}
