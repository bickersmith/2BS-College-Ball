import { loadAllData } from "../data/index.js";
import { getCachedData } from "../data/utils/dataCache.js";

export async function loadWebsiteData() {
  const cached = getCachedData();
  if (cached) return cached;

  return await loadAllData();
}
