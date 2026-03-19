const inputClass =
  'w-full bg-void border border-rim rounded px-3 py-2 text-slate-300 text-sm tracking-wide ' +
  'focus:outline-none focus:border-portal/60 focus:ring-1 focus:ring-portal/15 ' +
  'disabled:opacity-40 disabled:cursor-not-allowed transition-colors';

export default function FilterBar({ filters, speciesOptions, originOptions, onChange, onReset, loading }) {
  return (
    <div className="bg-surface border border-rim rounded p-4">
      <p className="text-[10px] tracking-[0.3em] text-portal/50 uppercase mb-4 font-display">
        ◈ Search Parameters
      </p>

      <div className="flex flex-wrap gap-3 items-end">
        {/* Name search */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-[10px] tracking-[0.2em] text-muted uppercase mb-1.5">
            Character Name
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
            disabled={loading}
            className={inputClass}
          />
        </div>

        {/* Species */}
        <div className="min-w-[140px]">
          <label className="block text-[10px] tracking-[0.2em] text-muted uppercase mb-1.5">
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
          <label className="block text-[10px] tracking-[0.2em] text-muted uppercase mb-1.5">
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
          <label className="block text-[10px] tracking-[0.2em] text-muted uppercase mb-1.5">
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

        {/* Reset */}
        <button
          onClick={onReset}
          disabled={loading}
          className="px-5 py-2 border border-rim text-muted text-sm tracking-widest uppercase
                     hover:border-portal/50 hover:text-portal transition-colors rounded
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
