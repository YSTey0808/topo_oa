import { useState } from 'react';

const STATUS_CONFIG = {
  Alive:   { color: '#4ade80', label: 'text-alive' },
  Dead:    { color: '#f87171', label: 'text-dead'  },
  unknown: { color: '#3d5a78', label: 'text-muted' },
};

export default function CharacterCard({ character }) {
  const [imgError, setImgError] = useState(false);
  const status = STATUS_CONFIG[character.status] ?? STATUS_CONFIG.unknown;

  return (
    <div
      style={{ borderLeftColor: status.color }}
      className="card-hover bg-surface border border-rim border-l-[3px] rounded overflow-hidden transition-all cursor-default"
    >
      {/* Avatar */}
      {imgError ? (
        <div className="w-full aspect-square bg-panel flex items-center justify-center text-4xl text-muted select-none">
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
        {/* ID badge */}
        <p className="text-[9px] tracking-[0.25em] text-muted uppercase mb-1">
          ID #{String(character.id).padStart(3, '0')}
        </p>

        <h3
          className="font-semibold text-white text-sm truncate leading-tight"
          title={character.name}
        >
          {character.name}
        </h3>

        {/* Status + species */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span style={{ backgroundColor: status.color }} className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
          <span className={`text-xs ${status.label}`}>{character.status}</span>
          <span className="text-rim">·</span>
          <span className="text-xs text-slate-400 truncate">{character.species}</span>
        </div>

        {/* Origin / Location */}
        <div className="mt-2.5 space-y-1.5 border-t border-rim pt-2.5">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted uppercase">Origin</p>
            <p className="text-xs text-slate-300 truncate" title={character.origin.name}>
              {character.origin.name}
            </p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted uppercase">Last Seen</p>
            <p className="text-xs text-slate-300 truncate" title={character.location.name}>
              {character.location.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
