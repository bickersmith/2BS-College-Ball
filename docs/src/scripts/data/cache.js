// scripts/data/cache.js

const cache = {};
const TTL_MS = 5 * 60 * 1000; // 5 minutes

export function getCacheKey(sheetName, leagueId, seasonId) {
  return `${sheetName}:${leagueId}:${seasonId}`;
}

export async function cachedFetch(sheetName, leagueId, seasonId, fetchFn) {
  const key = getCacheKey(sheetName, leagueId, seasonId);
  const now = Date.now();
  const entry = cache[key];

  if (entry && now - entry.timestamp < TTL_MS) {
    return entry.data;
  }

  const data = await fetchFn();
  cache[key] = { data, timestamp: now };
  return data;
}
