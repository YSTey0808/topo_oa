import { useState, useMemo } from 'react';
import { useCharacters } from './hooks/useCharacters';
import { filterCharacters, getUniqueValues } from './utils/filterCharacters';
import FilterBar from './components/FilterBar';
import CharacterGrid from './components/CharacterGrid';
import Charts from './components/Charts';

const PAGE_SIZE = 20;
const INITIAL_FILTERS = { search: '', species: '', status: '', origin: '' };

const STATS = [
  { label: 'Total Characters', accent: '#4f46e5' },
  { label: 'Showing',          accent: '#0891b2' },
  { label: 'Origin Worlds',    accent: '#7c3aed' },
  { label: 'Species',          accent: '#059669' },
];

export default function App() {
  const { characters, loading, error } = useCharacters();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage]       = useState(1);

  const speciesOptions = useMemo(() => getUniqueValues(characters, 'species'), [characters]);
  const originOptions  = useMemo(() => getUniqueValues(characters, 'origin'),  [characters]);

  const filtered = useMemo(
    () => filterCharacters(characters, filters),
    [characters, filters],
  );

  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function handleReset() {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  }

  if (error) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center font-display">
        <div className="bg-white border border-red-100 rounded-2xl shadow-card p-10 text-center max-w-sm">
          <p className="text-3xl mb-3">⚠️</p>
          <p className="font-semibold text-slate-800">Failed to load data</p>
          <p className="text-sm text-slate-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  const statValues = [characters.length, filtered.length, originOptions.length, speciesOptions.length];

  return (
    <div className="min-h-screen bg-canvas font-display">

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              R
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-800 leading-none">
                Rick &amp; Morty Universe Explorer
              </h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Interdimensional Character Database</p>
            </div>
          </div>

          {!loading && (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-500">
                {characters.length.toLocaleString()} records indexed
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-6 space-y-5">

        {/* ── Stat strip ── */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={s.label} className="bg-white rounded-xl shadow-card border border-slate-100 p-5">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                  {s.label}
                </p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {statValues[i].toLocaleString()}
                </p>
                <div
                  className="mt-3 h-[3px] w-8 rounded-full"
                  style={{ backgroundColor: s.accent }}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Filters ── */}
        <FilterBar
          filters={filters}
          speciesOptions={speciesOptions}
          originOptions={originOptions}
          onChange={handleFilterChange}
          onReset={handleReset}
          loading={loading}
        />

        {/* ── Charts ── */}
        {!loading && filtered.length > 0 && <Charts characters={filtered} />}

        {/* ── Loading / Grid ── */}
        {loading ? (
          <div className="flex flex-col items-center py-24 text-slate-400">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin mb-4" />
            <p className="text-sm">Loading characters...</p>
          </div>
        ) : (
          <CharacterGrid
            characters={paginated}
            total={filtered.length}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 mt-10 py-5">
        <p className="text-center text-xs text-slate-400">
          Data from The Rick and Morty API · rickandmortyapi.com
        </p>
      </footer>
    </div>
  );
}
