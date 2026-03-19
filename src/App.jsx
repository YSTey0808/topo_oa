import { useState, useMemo } from 'react';
import { useCharacters } from './hooks/useCharacters';
import { filterCharacters, getUniqueValues } from './utils/filterCharacters';
import FilterBar from './components/FilterBar';
import CharacterGrid from './components/CharacterGrid';
import Charts from './components/Charts';

const PAGE_SIZE = 20;
const INITIAL_FILTERS = { search: '', species: '', status: '', origin: '' };

export default function App() {
  const { characters, loading, error } = useCharacters();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);

  const speciesOptions = useMemo(() => getUniqueValues(characters, 'species'), [characters]);
  const originOptions = useMemo(() => getUniqueValues(characters, 'origin'), [characters]);

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
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400">
        <div className="text-center">
          <p className="text-4xl mb-3">⚠️</p>
          <p className="text-lg font-medium">Failed to load data</p>
          <p className="text-sm text-gray-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-green-500/20 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-green-400">Rick &amp; Morty Universe Explorer</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Explore characters and their origin universes across the multiverse
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Characters', value: characters.length },
              { label: 'Filtered', value: filtered.length },
              { label: 'Unique Origins', value: originOptions.length },
              { label: 'Unique Species', value: speciesOptions.length },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700"
              >
                <p className="text-2xl font-bold text-green-400">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <FilterBar
          filters={filters}
          speciesOptions={speciesOptions}
          originOptions={originOptions}
          onChange={handleFilterChange}
          onReset={handleReset}
          loading={loading}
        />

        {/* Charts — update with filters */}
        {!loading && filtered.length > 0 && <Charts characters={filtered} />}

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center py-20 text-green-400">
            <div className="animate-spin text-5xl mb-4">🌀</div>
            <p className="text-lg">Loading characters from the multiverse...</p>
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
    </div>
  );
}
