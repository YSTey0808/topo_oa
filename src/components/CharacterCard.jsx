import { useState } from 'react';

const STATUS_CONFIG = {
  Alive: { dot: 'bg-green-400', label: 'text-green-400' },
  Dead: { dot: 'bg-red-400', label: 'text-red-400' },
  unknown: { dot: 'bg-gray-400', label: 'text-gray-400' },
};

export default function CharacterCard({ character }) {
  const status = STATUS_CONFIG[character.status] ?? STATUS_CONFIG.unknown;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-green-500/50 hover:shadow-lg hover:shadow-green-900/20 transition-all">
      {imgError ? (
        <div className="w-full aspect-square bg-gray-700 flex items-center justify-center text-5xl select-none">
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
      <div className="p-3">
        <h3 className="font-semibold text-gray-100 text-sm truncate" title={character.name}>
          {character.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-1">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${status.dot}`} />
          <span className={`text-xs ${status.label}`}>{character.status}</span>
          <span className="text-gray-600 text-xs">·</span>
          <span className="text-xs text-gray-400 truncate">{character.species}</span>
        </div>

        <div className="mt-2 space-y-1.5">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Origin</p>
            <p className="text-xs text-gray-300 truncate" title={character.origin.name}>
              {character.origin.name}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Last seen</p>
            <p className="text-xs text-gray-300 truncate" title={character.location.name}>
              {character.location.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
