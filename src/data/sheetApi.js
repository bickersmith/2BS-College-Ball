const SPREADSHEET_ID = "1FkyD_4ymAcNG8L7srOn46S4FkTb4FyDnV-AymJMml-Q";
const API_KEY = "AIzaSyCMjMKQpocsyoQjoXX9MpyOCmIcTLHXqVA";

export async function fetchSheet(sheetName) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet: ${sheetName}`);
  }

  const data = await response.json();
  const rows = data.values || [];

  if (rows.length === 0) return [];

  const header = rows[0];
  const body = rows.slice(1);

  return body.map(row => {
    const obj = {};
    header.forEach((key, i) => {
      obj[key] = row[i] ?? "";
    });
    return obj;
  });
}
