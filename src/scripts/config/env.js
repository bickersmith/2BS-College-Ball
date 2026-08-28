// src/scripts/config/env.js

let config = null;

export async function loadConfig() {
  if (config) return config;

  //onsole.log("ENV: loadConfig() starting");

  // FIX: absolute path so Live Server resolves correctly
  const res = await fetch("/src/scripts/config/config.json");
  //console.log("ENV: fetch status", res.status);

  if (!res.ok) {
    console.error("ENV: failed to load config.json", res.status);
    return null;
  }

  config = await res.json();
  //console.log("ENV: config loaded", config);

  return config;
}

export function getEnv() {
  return config;
}
