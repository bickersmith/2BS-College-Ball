// src/scripts/state/store.js

let state = {
  league: null,
  season: null,

  teams: null,
  owners: null,
  games: null,
  awards: null,
  draft: null
};

const listeners = [];

export function getState() {
  return state;
}

export function setSlice(key, value) {
  state[key] = value;
  notify();
}

export function subscribe(fn) {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i >= 0) listeners.splice(i, 1);
  };
}

function notify() {
  listeners.forEach(fn => fn(state));
}
