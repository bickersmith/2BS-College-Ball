import { logDraftAction } from "./draftLogger.js";

/* ============================================================
   OWNERS (Dynamic Order)
   ============================================================ */
let owners = [
  { ownerId: 1, ownerName: "Brian" },
  { ownerId: 2, ownerName: "Jay" },
  { ownerId: 3, ownerName: "Brendan" }
];

export const setOwnerOrder = newOrder => owners = newOrder;
export const getOwners = () => owners;

/* ============================================================
   UI Update Callback
   ============================================================ */
let onUpdate = null;
export const setDraftUpdateCallback = fn => onUpdate = fn;

/* ============================================================
   POOLS
   ============================================================ */
export const pools = {
  top5: ["Ohio State", "Oregon", "Georgia", "Notre Dame", "Texas"],
  top10: ["Indiana", "Miami", "Texas A&M", "Ole Miss", "Oklahoma"],
  top25: [
    "LSU", "Texas Tech", "Alabama", "BYU", "USC", "Michigan",
    "Washington", "Penn State", "SMU", "Tennessee", "Utah",
    "Iowa", "Houston", "Louisville", "Missouri"
  ],
  secTopHalf: [
    "Georgia", "Texas", "Ole Miss", "Texas A&M",
    "LSU", "Alabama", "Oklahoma", "Tennessee"
  ],
  bigTenTopHalf: [
    "Ohio State", "Oregon", "Indiana", "USC",
    "Michigan", "Penn State", "Washington", "Iowa", "Illinois"
  ]
};

const poolOrder = [
  ["top5", pools.top5],
  ["top10", pools.top10],
  ["top25", pools.top25],
  ["sec", pools.secTopHalf],
  ["bigTen", pools.bigTenTopHalf]
];

/* ============================================================
   DRAFT STATE
   ============================================================ */
let draftLocked = false;

const draftGrid = {
  1: { top5: null, top10: null, top25: null, sec: null, bigTen: null },
  2: { top5: null, top10: null, top25: null, sec: null, bigTen: null },
  3: { top5: null, top10: null, top25: null, sec: null, bigTen: null }
};

let draftLog = [];

/* ============================================================
   Helpers
   ============================================================ */
const usedTeams = () =>
  new Set(
    Object.values(draftGrid)
      .flatMap(owner => Object.values(owner))
      .filter(Boolean)
  );

const randomPick = list =>
  list[Math.floor(Math.random() * list.length)];

const triggerUpdate = () => onUpdate && onUpdate();

/* ============================================================
   Logging
   ============================================================ */
function logPick(ownerId, poolName, team) {
  const ownerName = owners.find(o => o.ownerId === ownerId)?.ownerName;

  draftLog.push({
    timestamp: new Date().toISOString(),
    ownerId,
    ownerName,
    poolName,
    team
  });

  logDraftAction({
    ownerId,
    round: poolName,
    source: "Draft Engine",
    type: "Pick",
    notes: `Assigned ${team}`,
    teamName: team
  });

  triggerUpdate();
}

/* ============================================================
   Clear Draft
   ============================================================ */
export function clearDraft() {
  if (draftLocked) return;

  for (const ownerId in draftGrid) {
    for (const pool in draftGrid[ownerId]) {
      draftGrid[ownerId][pool] = null;
    }
  }

  draftLog = [];

  logDraftAction({
    ownerId: "",
    round: "",
    source: "Draft Engine",
    type: "Clear",
    notes: "Draft cleared",
    teamName: ""
  });

  triggerUpdate();
}

/* ============================================================
   Lock / Unlock
   ============================================================ */
export const lockDraft = () => {
  draftLocked = true;

  logDraftAction({
    ownerId: "",
    round: "",
    source: "Draft Engine",
    type: "Lock",
    notes: "Draft locked",
    teamName: ""
  });

  triggerUpdate();
};

export const unlockDraft = () => {
  draftLocked = false;

  logDraftAction({
    ownerId: "",
    round: "",
    source: "Draft Engine",
    type: "Unlock",
    notes: "Draft unlocked",
    teamName: ""
  });

  triggerUpdate();
};

/* ============================================================
   Auto Draft (Full)
   ============================================================ */
export function autoDraft() {
  if (draftLocked) return;

  const used = usedTeams();

  for (const [poolName, poolList] of poolOrder) {
    for (const owner of owners) {
      const ownerId = owner.ownerId;

      if (draftGrid[ownerId][poolName]) continue;

      let available = poolList.filter(t => !used.has(t));
      if (available.length === 0) available = poolList;

      const pick = randomPick(available);

      draftGrid[ownerId][poolName] = pick;
      used.add(pick);

      logPick(ownerId, poolName, pick);
    }
  }

  lockDraft();
}

/* ============================================================
   Pick One (Single Step)
   ============================================================ */
export function pickOne() {
  if (draftLocked) return;

  const used = usedTeams();

  for (const [poolName, poolList] of poolOrder) {
    for (const owner of owners) {
      const ownerId = owner.ownerId;

      if (!draftGrid[ownerId][poolName]) {
        let available = poolList.filter(t => !used.has(t));
        if (available.length === 0) available = poolList;

        const pick = randomPick(available);

        draftGrid[ownerId][poolName] = pick;
        used.add(pick);

        logPick(ownerId, poolName, pick);

        checkComplete();
        return;
      }
    }
  }
}

/* ============================================================
   Completion Check
   ============================================================ */
function checkComplete() {
  const allFilled = Object.values(draftGrid)
    .flatMap(owner => Object.values(owner))
    .every(v => v !== null);

  if (allFilled) lockDraft();
}

/* ============================================================
   Export State
   ============================================================ */
export const getDraftState = () => ({
  locked: draftLocked,
  grid: draftGrid,
  log: draftLog
});
