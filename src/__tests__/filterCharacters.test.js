import { describe, it, expect } from 'vitest';
import { filterCharacters, getUniqueValues } from '../utils/filterCharacters';

const mockChars = [
  { id: 1, name: 'Rick Sanchez', species: 'Human', status: 'Alive', origin: { name: 'Earth (C-137)' } },
  { id: 2, name: 'Morty Smith', species: 'Human', status: 'Alive', origin: { name: 'Earth (C-137)' } },
  { id: 3, name: 'Summer Smith', species: 'Human', status: 'Alive', origin: { name: 'Earth (Replacement Dimension)' } },
  { id: 4, name: 'Squanchy', species: 'Humanoid', status: 'unknown', origin: { name: 'Squanch Planet' } },
  { id: 5, name: 'Mr. Meeseeks', species: 'Alien', status: 'Dead', origin: { name: 'unknown' } },
];

describe('filterCharacters', () => {
  it('returns all characters when no filters are set', () => {
    const result = filterCharacters(mockChars, { search: '', species: '', status: '', origin: '' });
    expect(result).toHaveLength(5);
  });

  it('filters by name search (case-insensitive)', () => {
    const result = filterCharacters(mockChars, { search: 'rick', species: '', status: '', origin: '' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Rick Sanchez');
  });

  it('filters by species', () => {
    const result = filterCharacters(mockChars, { search: '', species: 'Human', status: '', origin: '' });
    expect(result).toHaveLength(3);
    expect(result.every((c) => c.species === 'Human')).toBe(true);
  });

  it('filters by status', () => {
    const result = filterCharacters(mockChars, { search: '', species: '', status: 'Dead', origin: '' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Mr. Meeseeks');
  });

  it('filters by origin', () => {
    const result = filterCharacters(mockChars, { search: '', species: '', status: '', origin: 'Earth (C-137)' });
    expect(result).toHaveLength(2);
    expect(result.every((c) => c.origin.name === 'Earth (C-137)')).toBe(true);
  });

  it('combines multiple filters', () => {
    const result = filterCharacters(mockChars, {
      search: 'smith',
      species: 'Human',
      status: 'Alive',
      origin: '',
    });
    expect(result).toHaveLength(2);
  });

  it('returns empty array when no characters match', () => {
    const result = filterCharacters(mockChars, { search: 'zzznotfound', species: '', status: '', origin: '' });
    expect(result).toHaveLength(0);
  });
});

describe('getUniqueValues', () => {
  it('returns unique sorted species', () => {
    const result = getUniqueValues(mockChars, 'species');
    expect(result).toEqual(['Alien', 'Human', 'Humanoid']);
  });

  it('returns unique sorted statuses', () => {
    const result = getUniqueValues(mockChars, 'status');
    expect(result).toEqual(['Alive', 'Dead', 'unknown']);
  });

  it('returns unique origins using nested origin.name', () => {
    const result = getUniqueValues(mockChars, 'origin');
    expect(result).toHaveLength(4);
    expect(result).toContain('Earth (C-137)');
    expect(result).toContain('Squanch Planet');
  });
});
