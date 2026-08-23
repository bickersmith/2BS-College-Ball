import { logDraftAction } from "./draftLogger.js";

// ===============================
// OWNER ORDER (NOW DYNAMIC)
// ===============================
let owners = [
  { ownerId: 1, ownerName: "Brian" },
  { ownerId: 2, ownerName: "Jay" },
  { ownerId: 3, ownerName: "Brendan" }
];

export function setOwnerOrder(newOrder) {
  owners = newOrder;
}

export function getOwners() {
  return owners;
}

// ===============================
// LIVE UI UPDATE CALLBACK
// ===============================
let onUpdate = null;
export function setDraftUpdateCallback(fn) {
  onUpdate = fn;
}

// ===============================
// POOLS
// ===============================
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

// ===============================
// DRAFT STATE
// ===============================
let draftLocked = false;

const draftGrid = {
  1: { top5: null, top10: null, top25: null, sec: null, bigTen: null },
  2: { top5: null, top10: null, top25: null, sec: null, bigTen: null },
  3: { top5: null, top10: null, top25: null, sec: null, bigTen: null }
};

let draftLog = [];

// ===============================
// LOG PICK
// ===============================
function logPick(ownerId, poolName, team) {
  draftLog.push({
    timestamp: new Date().toISOString(),
    ownerId,
    ownerName: getOwners().find(o => o.ownerId === ownerId).ownerName,
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

  if (onUpdate) onUpdate();
}

// ===============================
// CLEAR DRAFT
// ===============================
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

  if (onUpdate) onUpdate();
}

// ===============================
// LOCK / UNLOCK
// ===============================
export function lockDraft() {
  draftLocked = true;

  logDraftAction({
    ownerId: "",
    round: "",
    source: "Draft Engine",
    type: "Lock",
    notes: "Draft locked",
    teamName: ""
  });

  if (onUpdate) onUpdate();
}

export function unlockDraft() {
  draftLocked = false;

  logDraftAction({
    ownerId: "",
    round: "",
    source: "Draft Engine",
    type: "Unlock",
    notes: "Draft unlocked",
    teamName: ""
  });

  if (onUpdate) onUpdate();
}

// ===============================
// AUTO DRAFT (USES RANDOMIZED OWNER ORDER)
// ===============================
export function autoDraft() {
  if (draftLocked) return;

  const used = new Set(
    Object.values(draftGrid)
      .flatMap(owner => Object.values(owner))
      .filter(Boolean)
  );

  const poolOrder = [
    ["top5", pools.top5],
    ["top10", pools.top10],
    ["top25", pools.top25],
    ["sec", pools.secTopHalf],
    ["bigTen", pools.bigTenTopHalf]
  ];

  for (const [poolName, poolList] of poolOrder) {
    for (const owner of getOwners()) {
      const ownerId = owner.ownerId;

      if (draftGrid[ownerId][poolName]) continue;

      let available = poolList.filter(t => !used.has(t));

      if (available.length === 0) {
        available = poolList;
      }

      const pick = available[Math.floor(Math.random() * available.length)];

      draftGrid[ownerId][poolName] = pick;
      used.add(pick);

      logPick(ownerId, poolName, pick);
    }
  }

  lockDraft();

  if (onUpdate) onUpdate();
}

// ===============================
// PICK ONE (USES RANDOMIZED OWNER ORDER)
// ===============================
export function pickOne() {
  if (draftLocked) return;

  const poolOrder = [
    ["top5", pools.top5],
    ["top10", pools.top10],
    ["top25", pools.top25],
    ["sec", pools.secTopHalf],
    ["bigTen", pools.bigTenTopHalf]
  ];

  const used = new Set(
    Object.values(draftGrid)
      .flatMap(owner => Object.values(owner))
      .filter(Boolean)
  );

  for (const [poolName, poolList] of poolOrder) {
    for (const owner of getOwners()) {
      const ownerId = owner.ownerId;

      if (!draftGrid[ownerId][poolName]) {
        let available = poolList.filter(t => !used.has(t));

        if (available.length === 0) {
          available = poolList;
        }

        const pick = available[Math.floor(Math.random() * available.length)];

        draftGrid[ownerId][poolName] = pick;
        used.add(pick);

        logPick(ownerId, poolName, pick);

        checkComplete();

        if (onUpdate) onUpdate();
        return;
      }
    }
  }
}

// ===============================
// CHECK COMPLETE
// ===============================
function checkComplete() {
  const allFilled = Object.values(draftGrid)
    .flatMap(owner => Object.values(owner))
    .every(v => v !== null);

  if (allFilled) lockDraft();
}

// ===============================
// GET STATE
// ===============================
export function getDraftState() {
  return {
    locked: draftLocked,
    grid: draftGrid,
    log: draftLog
  };
}
