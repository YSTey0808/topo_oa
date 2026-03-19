import { useState, useEffect } from 'react';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const first = await fetch(BASE_URL).then((r) => {
          if (!r.ok) throw new Error(`API error: ${r.status}`);
          return r.json();
        });
        if (cancelled) return;

        const totalPages = first.info.pages;

        const restPages = await Promise.all(
          Array.from({ length: totalPages - 1 }, (_, i) =>
            fetch(`${BASE_URL}?page=${i + 2}`).then((r) => r.json()),
          ),
        );
        if (cancelled) return;

        setCharacters([...first.results, ...restPages.flatMap((p) => p.results)]);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return { characters, loading, error };
}
