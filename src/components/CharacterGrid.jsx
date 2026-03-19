import CharacterCard from './CharacterCard';

const PAGE_SIZE = 20;

const btnClass =
  'px-4 py-1.5 border border-rim text-sm tracking-widest uppercase text-muted ' +
  'hover:border-portal/60 hover:text-portal transition-colors rounded ' +
  'disabled:opacity-30 disabled:cursor-not-allowed';

export default function CharacterGrid({ characters, total, page, totalPages, onPageChange }) {
  if (characters.length === 0) {
    return (
      <div className="text-center py-20 border border-rim rounded bg-surface">
        <p className="text-4xl text-muted mb-3">◌</p>
        <p className="text-xs tracking-[0.3em] text-muted uppercase">No records match your parameters</p>
      </div>
    );
  }

  const start = (page - 1) * PAGE_SIZE + 1;
  const end   = Math.min(page * PAGE_SIZE, total);

  return (
    <div>
      {/* Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] tracking-[0.25em] text-muted uppercase">
          Records {start}–{end} of {total} {total !== 1 ? 'entries' : 'entry'}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            className={btnClass}
            onClick={() => onPageChange((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Prev
          </button>

          <span className="text-[11px] tracking-[0.3em] text-muted uppercase">
            {page} / {totalPages}
          </span>

          <button
            className={btnClass}
            onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
