import Image from 'next/image';

export default function PetCard({ pet, imagesBaseUrl }) {
  const imageUrl = `${imagesBaseUrl}/${pet.foto}`;

  return (
    <div className="pet-card">
      <div className="pet-card-image-wrapper">
        <Image
          src={imageUrl}
          alt={`Foto de ${pet.nome}`}
          width={200}
          height={200}
          style={{ objectFit: 'cover', borderRadius: '10px' }}
        />
      </div>
      <h3 className="pet-card-name">{pet.nome}</h3>
    </div>
  );
}