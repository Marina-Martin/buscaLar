'use client';
import { useEffect, useState } from 'react';

export function imageUrl(foto) {
  if (!foto) return '';
  // Como suas imagens agora estão no /public (raiz),
  // basta devolver o nome do arquivo (sem barra inicial).
  const base = (process.env.NEXT_PUBLIC_IMAGES_BASE_URL || '').replace(/\/$/, '');
  return base ? `${base}/${foto}` : `${foto}`;
}

export function usePetsData() {
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/pets';

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Erro HTTP! Status: ${res.status}`);
        const data = await res.json();
        setAllPets(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [API_URL]);

  return { allPets, loading, error };
}
