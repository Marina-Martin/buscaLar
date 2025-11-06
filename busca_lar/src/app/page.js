"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [cachorros, setCachorros] = useState([]);
  const [gatos, setGatos] = useState([]);

  useEffect(() => {
    function criarGaleria(src, alt, quantidade) {
      const imagens = [];
      for (let i = 0; i < quantidade; i++) {
        imagens.push({ src, alt });
      }
      return imagens;
    }

    setCachorros(
      criarGaleria(
        "/Cachorro.jpg",
        "Imagem de cachorro raça beagle usando óculos de grau",
        4
      )
    );

    setGatos(
      criarGaleria(
        "/Gato.jpg",
        "Imagem de gato usando óculos de grau e coleira com laço vermelho em cima de um notebook",
        4
      )
    );
  }, []);

  return (
    <>
      <Header />
      <main>
        <section id="cachorros">
          <h2>Galeria de Cachorros</h2>
          <div className="galeria">
            {cachorros.map((img, index) => (
              <img key={index} src={img.src} alt={img.alt} />
            ))}
          </div>
        </section>

        <section id="gatos">
          <h2>Galeria de Gatos</h2>
          <div className="galeria">
            {gatos.map((img, index) => (
              <img key={index} src={img.src} alt={img.alt} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

