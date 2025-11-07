'use client'; 
import { useState, useEffect } from 'react';

export function usePetsData() {
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const IMAGES_BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL || '';

  useEffect(() => {
    async function fetchData() {
      if (!API_URL || !IMAGES_BASE_URL) {
        setError("As variáveis de ambiente NEXT_PUBLIC_API_URL ou NEXT_PUBLIC_IMAGES_BASE_URL não estão definidas.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllPets(data);
      } catch (err) {
        setError(err.message);
        console.error('Falha ao buscar animais:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [API_URL, IMAGES_BASE_URL]); 

  return { allPets, loading, error, API_URL, IMAGES_BASE_URL };
}