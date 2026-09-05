export function normalizeX(row, header) {
  header = header.map(h => h.trim());
  const col = name => header.indexOf(name);

  return {
    fieldA: row[col("FieldA")],
    fieldB: row[col("FieldB")],
    fieldC: row[col("FieldC")],
    // ...
  };
}
