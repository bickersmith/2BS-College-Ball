import { isDebug } from "../config/envHelpers.js";

export function debugCache(cache) {
  if (isDebug()) {
    console.log("CACHE CONTENTS:", JSON.parse(JSON.stringify(cache)));
  }
}
