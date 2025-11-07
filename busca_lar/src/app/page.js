// app/page.js
'use client';

import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PetCard from "./components/PetCard";
import styles from './page.module.css'; 

export default function Home() {
  const [cachorros, setCachorros] = useState([]);
  const [gatos, setGatos] = useState([]);
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
        const allPets = await response.json();

        const dogs = allPets.filter(pet => pet.especie === 'cachorro').slice(0, 5);
        const cats = allPets.filter(pet => pet.especie === 'gato').slice(0, 5);

        setCachorros(dogs);
        setGatos(cats);
      } catch (err) {
        setError(err.message);
        console.error('Falha ao buscar animais para a Home:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [API_URL, IMAGES_BASE_URL]);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2>Carregando nossos amiguinhos...</h2>
          <p>Buscando os primeiros pets para você!</p>
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
          <h2>Ops! Algo deu errado.</h2>
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
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#000000' }}>Adote um amiguinho ou cadastre para achar um lar para o que encontrou!</h2>
      <main className={styles.container}>
        <section id="cachorros">
          <h3>Cachorros</h3>
          <ul className="galeria"> 
            {cachorros.length > 0 ? (
              cachorros.map((pet) => (
                <li key={pet.id}> 
                  <PetCard pet={pet} imagesBaseUrl={IMAGES_BASE_URL} />
                </li>
              ))
            ) : (
              <p>Nenhum cachorro disponível no momento.</p>
            )}
          </ul>
        </section>

        <section id="gatos">
          <h3>Gatos</h3>
          <ul className="galeria">
            {gatos.length > 0 ? (
              gatos.map((pet) => (
                <li key={pet.id}> 
                  <PetCard pet={pet} imagesBaseUrl={IMAGES_BASE_URL} />
                </li>
              ))
            ) : (
              <p>Nenhum gato disponível no momento.</p>
            )}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}