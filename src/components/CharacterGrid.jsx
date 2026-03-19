import CharacterCard from './CharacterCard';

const PAGE_SIZE = 20;

const btnClass =
  'px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg transition-colors ' +
  'text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed';

export default function CharacterGrid({ characters, total, page, totalPages, onPageChange }) {
  if (characters.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 shadow-card py-20 text-center">
        <p className="text-3xl mb-3">🔍</p>
        <p className="text-sm font-medium text-slate-600">No characters found</p>
        <p className="text-xs text-slate-400 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  const start = (page - 1) * PAGE_SIZE + 1;
  const end   = Math.min(page * PAGE_SIZE, total);

  return (
    <div>
      <p className="text-xs text-slate-500 mb-4">
        Showing {start}–{end} of {total} {total !== 1 ? 'characters' : 'character'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            className={btnClass}
            onClick={() => onPageChange((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Previous
          </button>
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages}
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
