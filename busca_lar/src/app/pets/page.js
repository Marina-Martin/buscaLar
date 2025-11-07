'use client'; 

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import PetCard from '@/app/components/PetCard'; 
import styles from './page.module.css';

export default function PetSearch() {
  const [pets, setPets] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const IMAGES_BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL || '';

  useEffect(() => {
    async function fetchPets() {
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
        setPets(data);
      } catch (err) {
        setError(err.message);
        console.error('Falha ao buscar animais:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPets();
  }, [API_URL, IMAGES_BASE_URL]);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2>Animais Disponíveis para Adoção</h2>
          <p>Carregando animais...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2>Animais Disponíveis para Adoção</h2>
          <p className={styles.errorMessage}>Ocorreu um erro ao carregar os animais: {error}</p>
          <p>Verifique as variáveis de ambiente e a disponibilidade da API.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h2>Nossos Amiguinhos à Espera de um Lar!</h2>
        <section className="galeria">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} imagesBaseUrl={IMAGES_BASE_URL} />
          ))}
        </section>
        {pets.length === 0 && (
          <p className={styles.noPetsMessage}>Nenhum animal disponível no momento. Volte mais tarde!</p>
        )}
      </main>
      <Footer />
    </>
  );
}