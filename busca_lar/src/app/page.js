// app/page.js
'use client';

import Header from "./components/Header";
import Footer from "./components/Footer";
import PetCard from "./components/PetCard";
import { usePetsData } from '@/app/hooks/usePetsData'; 
import styles from './page.module.css';

export default function Home() {
  const { allPets, loading, error, IMAGES_BASE_URL } = usePetsData();

  const cachorros = allPets.filter(pet => pet.especie === 'cachorro').slice(0, 5);
  const gatos = allPets.filter(pet => pet.especie === 'gato').slice(0, 5);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2>Carregando nossos amiguinhos...</h2>
          <p>Buscando os primeiros pets para você! 🐶🐱</p>
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