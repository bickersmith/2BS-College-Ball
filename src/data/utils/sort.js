export function sortByDate(items, field) {
  return [...items].sort((a, b) => new Date(a[field]) - new Date(b[field]));
}

export function sortByNumber(items, field) {
  return [...items].sort((a, b) => Number(a[field]) - Number(b[field]));
}

export function sortByString(items, field) {
  return [...items].sort((a, b) => a[field].localeCompare(b[field]));
}
