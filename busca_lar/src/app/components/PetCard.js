'use client';
import Link from 'next/link';

export default function PetCard({ pet, imagesBaseUrl = '' }) {
  const src = imagesBaseUrl ? `${imagesBaseUrl}/${pet.foto}` : pet.foto;

  return (
    <article style={{ textAlign: 'center' }}>
      <Link href={`/pets/${pet.id}`} aria-label={`Abrir perfil de ${pet.nome}`}>
        <img
          src={src}
          alt={`Foto de ${pet.nome}`}
          width={220}
          height={220}
          style={{
            borderRadius: 18,
            objectFit: 'cover',
            border: '3px solid #000',
            padding: 5,
            cursor: 'pointer',
          }}
        />
      </Link>

      <h4 style={{ margin: '8px 0 4px' }}>
        <Link href={`/pets/${pet.id}`}>{pet.nome}</Link>
      </h4>
      <small>
        {pet.especie} • {pet.cidade}/{pet.estado}
      </small>
    </article>
  );
}
