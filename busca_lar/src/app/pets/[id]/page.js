// src/app/pets/[id]/page.js
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PETS } from '@/app/api/pets/route'; // reuso do mock local

export function generateStaticParams() {
  return PETS.map(p => ({ id: String(p.id) }));
}

export function generateMetadata({ params }) {
  const pet = PETS.find(p => String(p.id) === String(params.id));
  return { title: pet ? `${pet.nome} — Busca Lar` : 'Pet não encontrado' };
}

export default function PetDetails({ params }) {
  const id = Number(params.id);
  const pet = PETS.find(p => p.id === id);
  if (!pet) notFound();

  // fallback de contato, caso ainda não tenha em cada pet
  const contato = pet.contato ?? {
    nome: 'ONG Busca Lar',
    telefone: '(11) 99999-9999',
    email: 'contato@buscalar.org',
  };

  const whatsapp = `https://wa.me/55${(contato.telefone || '').replace(/\D/g, '') || '11999999999'}`;
  const mailto = `mailto:${contato.email}?subject=Interesse em adotar ${encodeURIComponent(pet.nome)}`;

  return (
    <>
      <header style={{ textAlign: 'center', padding: '16px 0' }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>{pet.nome}</h1>
        <Link href="/pets" aria-label="Voltar para a lista de pets">← Voltar</Link>
      </header>

      <main
        style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: 24,
          padding: '0 16px 40px',
        }}
      >
        {/* Foto e descrição */}
        <figure>
          <img
            src={pet.foto}           // ex.: "Thor.jpg"
            alt={`Foto de ${pet.nome}`}
            width={320}
            height={320}
            style={{
              width: '100%',
              height: 320,
              objectFit: 'cover',
              borderRadius: 20,
              border: '3px solid #000',
              padding: 6,
              background: '#fff',
            }}
          />
          <figcaption style={{ marginTop: 8, color: '#444' }}>
            {pet.descricao ?? 'Aguarda um lar com amor 💛'}
          </figcaption>
        </figure>

        {/* Infos e contato */}
        <section>
          <h2 style={{ marginTop: 0 }}>Informações</h2>
          <ul style={{ lineHeight: 1.9 }}>
            <li><b>Espécie:</b> {pet.especie}</li>
            <li><b>Local:</b> {pet.cidade}/{pet.estado}</li>
            <li><b>Sexo:</b> {pet.sexo}</li>
            <li><b>Idade:</b> {pet.idadeMeses} meses</li>
            <li><b>Porte:</b> {pet.porte}</li>
          </ul>

          <hr style={{ margin: '16px 0' }} />

          <h3>Contato do doador</h3>
          <p style={{ lineHeight: 1.8 }}>
            <b>Responsável:</b> {contato.nome}<br />
            <b>Telefone:</b> {contato.telefone}<br />
            <b>E-mail:</b> <a href={`mailto:${contato.email}`}>{contato.email}</a>
          </p>

          {/* Botões de ação — SEM div */}
          <nav aria-label="Ações de contato" style={{ marginTop: 16, display: 'flex', gap: 12 }}>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: '2px solid #000',
                borderRadius: 12,
                padding: '10px 14px',
                textDecoration: 'none',
              }}
            >
              Falar no WhatsApp
            </a>
            <a
              href={mailto}
              style={{
                border: '2px solid #000',
                borderRadius: 12,
                padding: '10px 14px',
                textDecoration: 'none',
              }}
            >
              Enviar e-mail
            </a>
          </nav>
        </section>
      </main>
    </>
  );
}