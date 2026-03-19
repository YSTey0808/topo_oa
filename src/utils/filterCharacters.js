export function filterCharacters(characters, { search, species, status, origin }) {
  return characters.filter((char) => {
    if (search && !char.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (species && char.species !== species) return false;
    if (status && char.status !== status) return false;
    if (origin && char.origin.name !== origin) return false;
    return true;
  });
}

export function getUniqueValues(characters, key) {
  const values = characters.map((c) => (key === 'origin' ? c.origin.name : c[key]));
  return [...new Set(values)].filter(Boolean).sort();
}
