'use client';

import { useState, useMemo } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { usePetsData } from '@/app/hooks/usePetsData';
import PetCard from '@/app/components/PetCard';

function uniqueSorted(list) {
  return Array.from(new Set(list)).sort();
}

export default function PetsPage() {
  const { allPets, loading, error } = usePetsData();

  // ---- estados dos filtros ----
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [especie, setEspecie] = useState('');

  // ---- opções dos selects (derivadas dos dados) ----
  const estados = useMemo(
    () => uniqueSorted(allPets.map((p) => p.estado)),
    [allPets]
  );

  const especies = useMemo(
    () => uniqueSorted(allPets.map((p) => p.especie)),
    [allPets]
  );

  const cidades = useMemo(() => {
    const base = estado
      ? allPets.filter((p) => p.estado === estado)
      : allPets;
    return uniqueSorted(base.map((p) => p.cidade));
  }, [allPets, estado]);

  // ---- aplicação dos filtros ----
  const petsFiltrados = allPets.filter((p) => {
    if (estado && p.estado !== estado) return false;
    if (cidade && p.cidade !== cidade) return false;
    if (especie && p.especie !== especie) return false;
    return true;
  });

  const limparFiltros = () => {
    setEstado('');
    setCidade('');
    setEspecie('');
  };

  return (
    <>
      <Header />

      <main>
        {/* Título da página */}
        <section style={{ textAlign: 'center', marginTop: 20 }}>
          <h2>Nossos Amiguinhos à Espera de um Lar!</h2>
        </section>

        {/* Estado de loading / erro */}
        {loading && (
          <section aria-live="polite">
            <p style={{ textAlign: 'center', marginTop: 40 }}>
              Carregando animais...
            </p>
          </section>
        )}

        {error && (
          <section>
            <p style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>
              Erro ao carregar a lista: {error}
            </p>
          </section>
        )}

        {/* Conteúdo principal com filtros + resultados */}
        {!loading && !error && (
          <>
            {/* ========= FILTROS ========= */}
            <section
              aria-label="Filtros de busca de pets"
              style={{
                maxWidth: 1000,
                margin: '32px auto 16px',
                padding: '16px 20px',
                border: '2px solid #000',
                borderRadius: 12,
              }}
            >
              <form>
                <fieldset
                  style={{
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                    gap: 16,
                    alignItems: 'end',
                  }}
                >
                  <legend
                    style={{
                      fontWeight: 'bold',
                      marginBottom: 12,
                      textAlign: 'left',
                    }}
                  >
                    Filtrar pets
                  </legend>

                  {/* Filtro por estado */}
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    Estado
                    <select
                      value={estado}
                      onChange={(e) => {
                        setEstado(e.target.value);
                        setCidade(''); // reset cidade ao trocar estado
                      }}
                    >
                      <option value="">Todos</option>
                      {estados.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Filtro por cidade */}
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    Cidade
                    <select
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                    >
                      <option value="">Todas</option>
                      {cidades.map((cid) => (
                        <option key={cid} value={cid}>
                          {cid}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Filtro por espécie (usando como "raça" agora) */}
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    Espécie
                    <select
                      value={especie}
                      onChange={(e) => setEspecie(e.target.value)}
                    >
                      <option value="">Todas</option>
                      {especies.map((esp) => (
                        <option key={esp} value={esp}>
                          {esp}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Botão limpar */}
                  <button
                    type="button"
                    onClick={limparFiltros}
                    style={{
                      border: '2px solid #000',
                      borderRadius: 12,
                      padding: '8px 12px',
                      cursor: 'pointer',
                      background: '#fff',
                    }}
                  >
                    Limpar filtros
                  </button>
                </fieldset>
              </form>

              <p style={{ marginTop: 12, fontSize: 14 }}>
                {petsFiltrados.length} pet(s) encontrado(s).
              </p>
            </section>

            {/* ========= RESULTADOS ========= */}
            <section aria-label="Lista de pets filtrados">
              {petsFiltrados.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: 32 }}>
                  Nenhum pet encontrado com os filtros selecionados.
                </p>
              ) : (
                <ul
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 24,
                    listStyle: 'none',
                    padding: 0,
                    margin: '24px auto 40px',
                    maxWidth: 1200,
                    justifyItems: 'center',
                  }}
                >
                  {petsFiltrados.map((pet) => (
                    <li key={pet.id}>
                      <PetCard pet={pet} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}