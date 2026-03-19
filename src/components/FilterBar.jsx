export default function FilterBar({ filters, speciesOptions, originOptions, onChange, onReset, loading }) {
  const selectClass =
    'w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-green-500 disabled:opacity-50';

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex flex-wrap gap-3 items-end">
        {/* Search */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs text-gray-400 mb-1">Search by name</label>
          <input
            type="text"
            placeholder="e.g. Rick, Morty..."
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
            disabled={loading}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:border-green-500 disabled:opacity-50"
          />
        </div>

        {/* Species */}
        <div className="min-w-[140px]">
          <label className="block text-xs text-gray-400 mb-1">Species</label>
          <select
            value={filters.species}
            onChange={(e) => onChange('species', e.target.value)}
            disabled={loading}
            className={selectClass}
          >
            <option value="">All Species</option>
            {speciesOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="min-w-[130px]">
          <label className="block text-xs text-gray-400 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onChange('status', e.target.value)}
            disabled={loading}
            className={selectClass}
          >
            <option value="">All Status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        {/* Origin */}
        <div className="min-w-[180px]">
          <label className="block text-xs text-gray-400 mb-1">Origin</label>
          <select
            value={filters.origin}
            onChange={(e) => onChange('origin', e.target.value)}
            disabled={loading}
            className={selectClass}
          >
            <option value="">All Origins</option>
            {originOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          disabled={loading}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md text-sm border border-gray-600 transition-colors disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
