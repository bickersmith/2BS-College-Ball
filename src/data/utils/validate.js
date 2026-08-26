export function validateId(id, label = "ID") {
  if (!id || id === "") {
    throw new Error(`Missing ${label}: ${id}`);
  }
  return id;
}
