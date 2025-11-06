import Link from 'next/link';

export default function Header() {
  const mostrarPopup = () => {
    alert("Em construção"); // Lógica original
  };

  return (
    <header>
      <h1><Link href="/">Busca Lar</Link></h1>
      <nav>
        <ul>
          <button className="btn" onClick={mostrarPopup}>Busca Pet</button>
        </ul>
      </nav>
    </header>
  );
}