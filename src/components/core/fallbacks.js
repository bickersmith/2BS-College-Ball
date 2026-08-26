// src/components/core/fallbacks.js

export const FALLBACKS = {
  logoUrl: "/assets/logos/default.png",
  helmetUrl: "/assets/logos/default-helmet.png",
  mascotImageUrl: "/assets/logos/default-mascot.png",
  ownerName: "Unknown Owner",
  teamName: "Unknown Team"
};

export function withFallback(value, key) {
  if (value == null || value === "") {
    return FALLBACKS[key] ?? "";
  }
  return value;
}
