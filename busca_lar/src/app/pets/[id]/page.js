// src/app/pets/[id]/page.js
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { PETS } from '@/app/api/pets/route';

const CONTATO = {
  nome: 'ONG Busca Lar',
  telefone: '(11) 99999-9999',
  email: 'contato@buscalar.org',
};

export async function generateMetadata({ params }) {
  const id = parseInt(params.id, 10);
  const pet = PETS.find((p) => p.id === id);

  if (!pet) {
    return {
      title: 'Pet não encontrado — Busca Lar',
    };
  }

  return {
    title: `${pet.nome} — Busca Lar`,
  };
}

export default function PetDetalhe({ params }) {
  const id = parseInt(params.id, 10);
  const pet = PETS.find((p) => p.id === id);

  if (!pet) {
    return (
      <>
        <Header />
        <main
          style={{
            maxWidth: 900,
            margin: '40px auto',
            padding: '0 16px',
          }}
        >
          <p>Pet não encontrado.</p>
          <Link href="/pets" style={{ textDecoration: 'underline' }}>
            ← Voltar para a lista de pets
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // monta os links de contato
  const telefoneLimpo = CONTATO.telefone.replace(/\D/g, '') || '11999999999';
  const wa = `https://wa.me/55${telefoneLimpo}?text=${encodeURIComponent(
    `Olá! Tenho interesse em adotar o(a) ${pet.nome}.`,
  )}`;
  const mail = `mailto:${CONTATO.email}?subject=${encodeURIComponent(
    `Interesse em adotar ${pet.nome}`,
  )}`;

  return (
    <>
      <Header />
      <main
        style={{
          maxWidth: 960,
          margin: '40px auto 60px',
          padding: '0 16px',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <h1 style={{ fontSize: 28, margin: 0 }}>{pet.nome}</h1>

          <Link href="/pets" style={{ textDecoration: 'underline' }}>
            ← Voltar
          </Link>
        </header>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 32,
            alignItems: 'flex-start',
          }}
        >
          {/* Coluna da imagem e descrição */}
          <article>
            <figure style={{ textAlign: 'center', margin: 0 }}>
              <img
                // AQUI está o pulo do gato: sempre na raíz do site
                src={`/${pet.foto}`}
                alt={`Foto de ${pet.nome}`}
                width="260"
                height="260"
                style={{
                  borderRadius: 18,
                  objectFit: 'cover',
                  border: '3px solid #000',
                }}
              />
            </figure>

            <p style={{ marginTop: 16 }}>{pet.descricao}</p>
          </article>

          {/* Coluna das informações + contato */}
          <section>
            <h2 style={{ fontSize: 22, marginBottom: 12 }}>Informações</h2>
            <ul style={{ lineHeight: 1.9 }}>
              <li>
                <strong>Espécie:</strong> {pet.especie}
              </li>
              <li>
                <strong>Local:</strong> {pet.cidade}/{pet.estado}
              </li>
              <li>
                <strong>Sexo:</strong> {pet.sexo}
              </li>
              <li>
                <strong>Idade:</strong> {pet.idadeMeses} meses
              </li>
              <li>
                <strong>Porte:</strong> {pet.porte}
              </li>
            </ul>

            <hr style={{ margin: '18px 0' }} />

            <h3 style={{ fontSize: 20, marginBottom: 8 }}>
              Contato do doador
            </h3>
            <p>
              <strong>Responsável:</strong> {CONTATO.nome}
              <br />
              <strong>Telefone:</strong> {CONTATO.telefone}
              <br />
              <strong>E-mail:</strong> {CONTATO.email}
            </p>

            {/* Botões de contato – sem <div> extra */}
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: '2px solid #000',
                borderRadius: 12,
                padding: '10px 14px',
                display: 'inline-block',
                marginTop: 16,
                marginRight: 12,
              }}
            >
              Falar no WhatsApp
            </a>

            <a
              href={mail}
              style={{
                border: '2px solid #000',
                borderRadius: 12,
                padding: '10px 14px',
                display: 'inline-block',
                marginTop: 16,
              }}
            >
              Enviar e-mail
            </a>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}