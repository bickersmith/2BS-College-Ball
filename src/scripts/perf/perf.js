// src/scripts/perf/perf.js

const marks = {};

export function perfStart(label) {
  marks[label] = performance.now();
}

export function perfEnd(label) {
  const start = marks[label];
  if (start == null) return;
  const duration = performance.now() - start;
  console.log(`[PERF] ${label}: ${duration.toFixed(2)}ms`);
}
