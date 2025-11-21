"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import usePetsData from "../hooks/usePetsData";
import PetCard from "../components/PetCard";
import styles from "./page.module.css";

export default function PetsPage() {
  const { allPets: pets, loading, error, IMAGES_BASE_URL } = usePetsData();

  const [speciesFilter, setSpeciesFilter] = useState("todas");
  const [cityFilter, setCityFilter] = useState("todas");
  const [stateFilter, setStateFilter] = useState("todas");

  // opções dinâmicas (sem repetição)
  const speciesOptions = useMemo(
    () => ["todas", ...new Set(pets.map((p) => p.especie))],
    [pets]
  );

  const cityOptions = useMemo(
    () => ["todas", ...new Set(pets.map((p) => p.cidade))],
    [pets]
  );

  const stateOptions = useMemo(
    () => ["todas", ...new Set(pets.map((p) => p.estado))],
    [pets]
  );

  const filteredPets = useMemo(
    () =>
      pets.filter((pet) => {
        const okSpecies =
          speciesFilter === "todas" || pet.especie === speciesFilter;
        const okCity = cityFilter === "todas" || pet.cidade === cityFilter;
        const okState = stateFilter === "todas" || pet.estado === stateFilter;
        return okSpecies && okCity && okState;
      }),
    [pets, speciesFilter, cityFilter, stateFilter]
  );

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2>Carregando pets...</h2>
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

        {/* seção de filtros sem div */}
        <section
          className={styles.filters}
          aria-label="Filtros de busca de animais"
        >
          <fieldset className={styles.filterGroup}>
            <legend>Espécie</legend>
            <label className={styles.visuallyHidden} htmlFor="speciesFilter">
              Espécie
            </label>
            <select
              id="speciesFilter"
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
            >
              {speciesOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "todas" ? "Todas" : opt}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className={styles.filterGroup}>
            <legend>Estado</legend>
            <label className={styles.visuallyHidden} htmlFor="stateFilter">
              Estado
            </label>
            <select
              id="stateFilter"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              {stateOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "todas" ? "Todos" : opt}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className={styles.filterGroup}>
            <legend>Cidade</legend>
            <label className={styles.visuallyHidden} htmlFor="cityFilter">
              Cidade
            </label>
            <select
              id="cityFilter"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              {cityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "todas" ? "Todas" : opt}
                </option>
              ))}
            </select>
          </fieldset>
        </section>

        {/* galeria */}
        {filteredPets.length > 0 ? (
          <ul className="galeria">
            {filteredPets.map((pet) => (
              <li key={pet.id}>
                <Link href={`/pets/${pet.id}`}>
                  <PetCard pet={pet} imagesBaseUrl={IMAGES_BASE_URL} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <section className={styles.emptyState}>
            <p>
              Nenhum animal encontrado com os filtros selecionados. Tente
              alterar os filtros.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}