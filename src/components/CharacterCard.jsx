import { useState } from 'react';

const STATUS_BADGE = {
  Alive:   'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Dead:    'bg-red-50 text-red-600 ring-1 ring-red-200',
  unknown: 'bg-slate-100 text-slate-500 ring-1 ring-slate-200',
};

export default function CharacterCard({ character }) {
  const [imgError, setImgError] = useState(false);
  const badge = STATUS_BADGE[character.status] ?? STATUS_BADGE.unknown;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
      {/* Avatar */}
      {imgError ? (
        <div className="w-full aspect-square bg-slate-100 flex items-center justify-center text-4xl text-slate-300 select-none">
          👾
        </div>
      ) : (
        <img
          src={character.image}
          alt={character.name}
          className="w-full aspect-square object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}

      {/* Info */}
      <div className="p-3">
        {/* Name + status badge */}
        <div className="flex items-start justify-between gap-1.5 mb-2">
          <h3
            className="font-semibold text-slate-800 text-sm leading-snug truncate"
            title={character.name}
          >
            {character.name}
          </h3>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md flex-shrink-0 ${badge}`}>
            {character.status}
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-2">{character.species}</p>

        {/* Origin / Location */}
        <div className="border-t border-slate-100 pt-2 space-y-1.5">
          <div className="flex justify-between gap-2">
            <span className="text-[10px] text-slate-400 flex-shrink-0">Origin</span>
            <span
              className="text-[10px] text-slate-600 text-right truncate"
              title={character.origin.name}
            >
              {character.origin.name}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-[10px] text-slate-400 flex-shrink-0">Last seen</span>
            <span
              className="text-[10px] text-slate-600 text-right truncate"
              title={character.location.name}
            >
              {character.location.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
