"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import usePetsData from "../../hooks/usePetsData";
import styles from "./page.module.css";

export default function PetDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { allPets, loading, error, IMAGES_BASE_URL } = usePetsData();

  const pets = allPets ?? [];
  const pet = pets.find((p) => String(p.id) === String(id));

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <p>Carregando informações do pet...</p>
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
          <p className={styles.errorMessage}>
            Ocorreu um erro ao carregar as informações do pet: {error}
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (!pet) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <p className={styles.errorMessage}>
            Não encontramos esse pet. Ele pode ter sido removido ou a URL está incorreta.
          </p>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => router.push("/pets")}
          >
            Voltar para a lista
          </button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.back()}
        >
          ← Voltar
        </button>

        <article className={styles.details} aria-label={`Detalhes do pet ${pet.nome}`}>
          <figure className={styles.figure}>
            <Image
              src={`${IMAGES_BASE_URL}/${pet.foto}`}
              alt={`Foto de ${pet.nome}`}
              width={320}
              height={320}
              className={styles.petImage}
            />
            <figcaption className={styles.caption}>{pet.nome}</figcaption>
          </figure>

          <section className={styles.info}>
            <h2 className={styles.petName}>{pet.nome}</h2>

            <p>
              <strong>Espécie:</strong> {pet.especie}
            </p>

            <p>
              <strong>Localização:</strong> {pet.cidade} - {pet.estado}
            </p>

            <p>
              <strong>Descrição:</strong> {pet.descricao}
            </p>

            <p>
              <strong>Contato para adoção:</strong>{" "}
              <a href={pet.email ? `mailto:${pet.email.replace(/"/g, "")}` : "#"}>
                {pet.email ? pet.email.replace(/"/g, "") : "E-mail não informado"}
              </a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
