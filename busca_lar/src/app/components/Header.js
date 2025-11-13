"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname(); 
  const mostrarPopup = () => {
    alert("Em construção"); 
  };

  return (
    <header>
      <h1><Link href="/">Busca Lar</Link></h1>
      <nav>
        <ul>
            {pathname !== "/pets" && (
              <Link href="/pets">
                <button>Busca Pet</button>
              </Link>
          )}
            {pathname !== "/forms" && (
              <Link href="/forms">
                <button>Busca Lar</button>
              </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}