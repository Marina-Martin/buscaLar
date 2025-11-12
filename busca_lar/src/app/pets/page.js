// app/pets/page.js
'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import PetCard from '@/app/components/PetCard';
import { usePetsData } from '@/app/hooks/usePetsData';
import styles from './page.module.css';

export default function PetSearch() {
  const { allPets: pets, loading, error, IMAGES_BASE_URL } = usePetsData();

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2>Animais Disponíveis para Adoção</h2>
          <p>Carregando animais... 🐾</p>
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
          <p className={styles.errorMessage}>
            Ocorreu um erro ao carregar os animais: {error}
          </p>
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
        <ul className="galeria">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <li key={pet.id}>
                <PetCard pet={pet} imagesBaseUrl={IMAGES_BASE_URL} />
              </li>
            ))
          ) : (
            <p className={styles.noPetsMessage}>
              Nenhum animal disponível no momento. Volte mais tarde!
            </p>
          )}
        </ul>
      </main>
      <Footer />
    </>
  );
}
