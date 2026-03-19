import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCharacters } from '../hooks/useCharacters';

const makeChar = (id) => ({
  id,
  name: `Character ${id}`,
  species: 'Human',
  status: 'Alive',
  image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
  origin: { name: 'Earth (C-137)' },
  location: { name: 'Citadel of Ricks' },
});

const mockPage1 = { info: { pages: 2 }, results: [makeChar(1), makeChar(2)] };
const mockPage2 = { info: { pages: 2 }, results: [makeChar(3), makeChar(4)] };

function makeFetchMock(page1 = mockPage1, page2 = mockPage2) {
  return vi.fn((url) => {
    const data = url.includes('page=') ? page2 : page1;
    return Promise.resolve({ ok: true, json: () => Promise.resolve(data) });
  });
}

beforeEach(() => {
  vi.stubGlobal('fetch', makeFetchMock());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useCharacters', () => {
  it('starts with loading=true, empty characters, and no error', () => {
    const { result } = renderHook(() => useCharacters());
    expect(result.current.loading).toBe(true);
    expect(result.current.characters).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('resolves to all characters across all pages', async () => {
    const { result } = renderHook(() => useCharacters());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.characters).toHaveLength(4);
    expect(result.current.error).toBeNull();
  });

  it('sets characters from both pages in order', async () => {
    const { result } = renderHook(() => useCharacters());
    await waitFor(() => expect(result.current.loading).toBe(false));
    const ids = result.current.characters.map((c) => c.id);
    expect(ids).toContain(1);
    expect(ids).toContain(3);
  });

  it('sets error and stops loading when the API returns a non-ok response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500, json: () => Promise.resolve({}) }),
    );
    const { result } = renderHook(() => useCharacters());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('API error: 500');
    expect(result.current.characters).toEqual([]);
  });

  it('sets error when fetch throws a network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));
    const { result } = renderHook(() => useCharacters());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Network failure');
  });

  it('fetches page 1 first then remaining pages in parallel', async () => {
    const fetchMock = makeFetchMock();
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useCharacters());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character');
    expect(fetchMock).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character?page=2');
  });
});
