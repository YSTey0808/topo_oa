const inputClass =
  'w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 ' +
  'placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ' +
  'focus:border-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';

export default function FilterBar({ filters, speciesOptions, originOptions, onChange, onReset, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-card border border-slate-100 p-4">
      <div className="flex flex-wrap gap-3 items-end">

        {/* Name search */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide mb-1.5">
            Search
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by name..."
              value={filters.search}
              onChange={(e) => onChange('search', e.target.value)}
              disabled={loading}
              className={`${inputClass} pl-8`}
            />
          </div>
        </div>

        {/* Species */}
        <div className="min-w-[140px]">
          <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide mb-1.5">
            Species
          </label>
          <select
            value={filters.species}
            onChange={(e) => onChange('species', e.target.value)}
            disabled={loading}
            className={inputClass}
          >
            <option value="">All Species</option>
            {speciesOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Status */}
        <div className="min-w-[130px]">
          <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide mb-1.5">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onChange('status', e.target.value)}
            disabled={loading}
            className={inputClass}
          >
            <option value="">All Status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        {/* Origin */}
        <div className="min-w-[180px]">
          <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wide mb-1.5">
            Origin
          </label>
          <select
            value={filters.origin}
            onChange={(e) => onChange('origin', e.target.value)}
            disabled={loading}
            className={inputClass}
          >
            <option value="">All Origins</option>
            {originOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Clear */}
        <button
          onClick={onReset}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700
                     hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
