// src/data/utils/dataCache.js

const cache = {};
const TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function cachedFetch(key, fetchFn) {
  const entry = cache[key];

  // If cached AND not expired → return it
  if (entry && (Date.now() - entry.timestamp < TTL_MS)) {
    return entry.data;
  }

  // Otherwise fetch fresh
  const result = await fetchFn();

  // Only cache valid arrays (prevents caching broken objects)
  if (Array.isArray(result)) {
    cache[key] = {
      timestamp: Date.now(),
      data: result
    };
  } else {
    // Do NOT cache invalid results
    console.warn("cachedFetch: Not caching non-array result for key:", key);
  }

  return result;
}
