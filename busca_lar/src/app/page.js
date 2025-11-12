'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { usePetsData } from '@/app/hooks/usePetsData';

export default function Home() {
  const { allPets, loading, error, imageUrl } = usePetsData();

  const dogs = allPets.filter(p => p.especie === 'Cachorro');
  const cats = allPets.filter(p => p.especie === 'Gato');

  return (
    <>
      <Header />

      <main>
        <section>
          <h2 style={{ textAlign: 'center', marginTop: 20 }}>
            Adote um amiguinho ou cadastre para achar um lar para o que encontrou!
          </h2>
        </section>

        {loading && (
          <section aria-live="polite">
            <p style={{ textAlign: 'center', marginTop: 40 }}>Carregando animais...</p>
          </section>
        )}

        {error && (
          <section>
            <p style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>
              Erro ao carregar a lista: {error}
            </p>
          </section>
        )}

        {!loading && !error && (
          <>
            {/* ==================== BLOCO CACHORROS ==================== */}
            <section aria-labelledby="titulo-cachorros" style={{ marginTop: 40 }}>
              <h3 id="titulo-cachorros" style={{ textAlign: 'center' }}>Cachorros</h3>

              {dogs.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Nenhum cachorro disponível no momento.</p>
              ) : (
                <nav aria-label="Cachorros disponíveis">
                  <ul
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: 24,
                      listStyle: 'none',
                      padding: 0,
                      margin: '24px auto',
                      maxWidth: 1200,
                      justifyItems: 'center',
                    }}
                  >
                    {dogs.slice(0, 5).map(pet => ( // apenas 5
                      <li key={pet.id}>
                        <a href={`/pets/${pet.id}`} aria-label={`Abrir ${pet.nome}`}>
                          <figure style={{ textAlign: 'center' }}>
                            <img
                              src={pet.foto}
                              alt={`Foto de ${pet.nome}`}
                              width="160"
                              height="160"
                              style={{
                                objectFit: 'cover',
                                borderRadius: 12,
                                border: '2px solid #000',
                              }}
                            />
                            <figcaption style={{ marginTop: 8 }}>
                              <strong>{pet.nome}</strong><br />
                              <small>{pet.cidade}/{pet.estado}</small>
                            </figcaption>
                          </figure>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </section>

            {/* ==================== BLOCO GATOS ==================== */}
            <section aria-labelledby="titulo-gatos" style={{ marginTop: 60 }}>
              <h3 id="titulo-gatos" style={{ textAlign: 'center' }}>Gatos</h3>

              {cats.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Nenhum gato disponível no momento.</p>
              ) : (
                <nav aria-label="Gatos disponíveis">
                  <ul
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: 24,
                      listStyle: 'none',
                      padding: 0,
                      margin: '24px auto',
                      maxWidth: 1200,
                      justifyItems: 'center',
                    }}
                  >
                    {cats.slice(0, 5).map(pet => ( // apenas 5
                      <li key={pet.id}>
                        <a href={`/pets/${pet.id}`} aria-label={`Abrir ${pet.nome}`}>
                          <figure style={{ textAlign: 'center' }}>
                            <img
                              src={pet.foto}
                              alt={`Foto de ${pet.nome}`}
                              width="160"
                              height="160"
                              style={{
                                objectFit: 'cover',
                                borderRadius: 12,
                                border: '2px solid #000',
                              }}
                            />
                            <figcaption style={{ marginTop: 8 }}>
                              <strong>{pet.nome}</strong><br />
                              <small>{pet.cidade}/{pet.estado}</small>
                            </figcaption>
                          </figure>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </section>

            {/* ==================== LINK FINAL ==================== */}
            <section style={{ textAlign: 'center', margin: '40px 0' }}>
              <a href="/pets" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                Ver todos os pets →
              </a>
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}