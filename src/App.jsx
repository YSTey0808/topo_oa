import { useState, useMemo } from "react";
import { useCharacters } from "./hooks/useCharacters";
import { filterCharacters, getUniqueValues } from "./utils/filterCharacters";
import FilterBar from "./components/FilterBar";
import CharacterGrid from "./components/CharacterGrid";
import Charts from "./components/Charts";

const PAGE_SIZE = 20;
const INITIAL_FILTERS = { search: "", species: "", status: "", origin: "" };

const STAT_CONFIG = [
  { label: "Total Entities", color: "text-portal", border: "border-portal/25" },
  { label: "Active Filter", color: "text-morty", border: "border-morty/25" },
  {
    label: "Origin Worlds",
    color: "text-purple-400",
    border: "border-purple-400/25",
  },
  { label: "Species Found", color: "text-alive", border: "border-alive/25" },
];

export default function App() {
  const { characters, loading, error } = useCharacters();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);

  const speciesOptions = useMemo(
    () => getUniqueValues(characters, "species"),
    [characters],
  );
  const originOptions = useMemo(
    () => getUniqueValues(characters, "origin"),
    [characters],
  );

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
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-center border border-dead/30 bg-surface rounded p-10">
          <p className="text-dead text-5xl mb-4">⚠</p>
          <p className="text-white font-display font-semibold text-lg tracking-widest uppercase">
            Connection Lost
          </p>
          <p className="text-muted text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  const statValues = [
    characters.length,
    filtered.length,
    originOptions.length,
    speciesOptions.length,
  ];

  return (
    <div className="min-h-screen bg-void text-slate-300 font-display">
      {/* ── Header ── */}
      <header className="relative bg-surface border-b border-rim overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-30" />
        {/* top cyan accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-portal to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-wide text-white uppercase">
              Rick &amp; Morty
              <span className="text-portal ml-3">Universe Explorer</span>
            </h1>
            <p className="text-muted text-xs tracking-widest uppercase mt-1">
              Multiverse Character Database · C-137 Branch
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-5">
        {/* ── Stat strip ── */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STAT_CONFIG.map((s, i) => (
              <div
                key={s.label}
                className={`bg-surface border ${s.border} rounded p-4`}
              >
                <p className={`text-3xl font-bold ${s.color}`}>
                  {statValues[i]}
                </p>
                <p className="text-[10px] tracking-[0.2em] text-muted uppercase mt-1">
                  {s.label}
                </p>
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
          <div className="flex flex-col items-center py-24">
            <div className="animate-spin text-portal text-5xl mb-5">◈</div>
            <p className="text-xs tracking-[0.3em] text-portal/60 uppercase">
              Initialising Multiverse Uplink...
            </p>
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

      <footer className="border-t border-rim mt-10 py-4 px-4">
        <p className="text-center text-[10px] tracking-[0.3em] text-muted uppercase">
          Data sourced from The Rick and Morty API · rickandmortyapi.com
        </p>
      </footer>
    </div>
  );
}
