// sheetApi.js
// Zero-backend simulation layer so the draft engine can run immediately.

// In-memory fake sheets
const fakeSheets = {
  Draft: [],
  Teams: []
};

// ===============================
// LOAD TEAMS (from fetchSheet.js)
// ===============================
export async function fetchSheet(sheetName) {
  // If Teams sheet is empty, load from fetchSheet.js
  if (sheetName === "Teams" && fakeSheets.Teams.length === 0) {
    const res = await fetch("./teams.json").catch(() => null);

    if (res && res.ok) {
      fakeSheets.Teams = await res.json();
    }
  }

  return fakeSheets[sheetName] || [];
}

// ===============================
// APPEND A ROW (for logging)
// ===============================
export async function appendRow(sheetName, rowArray) {
  if (!fakeSheets[sheetName]) fakeSheets[sheetName] = [];
  fakeSheets[sheetName].push(rowArray);

  console.log("Logged to sheet:", sheetName, rowArray);
  return { success: true };
}

// ===============================
// WRITE VALUES (not needed yet)
// ===============================
export async function writeSheet(sheetName, range, values) {
  console.log("writeSheet called:", sheetName, range, values);
  return { success: true };
}
