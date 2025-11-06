# Busca Lar

## Bruno Roveri - 10401752
## Marina Martin - 10403028

## 1. Sobre o projeto

O BuscaLar é uma plataforma digital criada para facilitar a adoção de animais encontrados nas ruas, oferecendo um espaço organizado onde pessoas podem cadastrar pets resgatados e onde interessados podem encontrá-los com facilidade. Mais do que um site, o projeto tem caráter extensionista, pois promove impacto social ao dar visibilidade a animais em situação de vulnerabilidade, conscientizar sobre a adoção responsável e fortalecer uma rede comunitária entre resgatadores, adotantes e ONGs. Assim, o BuscaLar contribui ativamente para a redução do abandono e para a construção de uma sociedade mais solidária e engajada com a causa animal.

## 2. Estrutura do Projeto

O formulário reside na rota /forms e depende de componentes compartilhados e do CSS global do projeto:
- src/app/forms/page.js: Contém o componente principal do formulário (lógica e JSX).
- src/app/components/Header.js: Componente de navegação superior, reutilizado da estrutura original e unifica a navegação superior.
- src/app/components/Footer.js: Componente de rodapé, reutilizado da estrutura original e unifica o rodapé.
- src/app/globals.css: Contém todos os estilos CSS do projeto, incluindo as regras de formsStyle.css e as correções de tema.

## 3. Transição de Código para Next.js

3.1 HTML (Convertido para JSX)
- O código HTML foi reescrito em JSX, a sintaxe de marcação do React. A maior mudança foi a unificação dos layouts de cabeçalho e rodapé.
- Adaptação de Atributos: Todos os atributos HTML class foram substituídos por className e for (usado em label) foi substituído por htmlFor.
- Unificação de Componentes: Os elementos de layout (header e footer) foram removidos das páginas individuais e centralizados nos componentes Header.js e Footer.js, que são reutilizados em todas as rotas.
- Navegação: O Header.js utiliza o componente Link do Next.js, garantindo que o link do logo Busca Lar para a Home Page seja rápido e otimizado.

src/app/components/Header.js
```
import Link from 'next/link';

export default function Header() {
  const mostrarPopup = () => {
    alert("Em construção");
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
````

3.2 CSS (Estilização de Formulário)
- O CSS foi unificado em globals.css. Regras explícitas foram adicionadas para garantir que o design preto e branco original fosse mantido.
- Design Original Preservado: As regras de border: 2px solid black para os elementos estruturais (header, footer, form, fieldset) foram mantidas.
- Consistência de Cores: Regras como background: white important foram usadas para forçar o fundo branco e o texto preto nos inputs, botões e no body, garantindo a fidelidade ao design.

src/app/globals.css
```
body {
  background: white !important; /* Fundo branco original */
  color: black !important;
  /* ... */
}

/* Estilos de Botões e Inputs (garante cor preta/branca em todas as plataformas) */
button, .input-control, .inputs {
  background-color: white !important;
  color: black !important;
  /* ... */
}

/* Estilos Estruturais */
header, footer, form, fieldset {
  border: 2px solid black;
  /* ... */
}
```

3.3 JavaScript (Reatividade e Hooks)

lógica do formsScript.js foi completamente substituída pelo modelo de programação reativa do React em src/app/forms/page.js.
- Diretiva use client: Esta diretiva é obrigatória no App Router, pois permite o uso do hook useState e interações com o navegador.
useState (Controle Reativo):
- Lógica: O hook useState (ex: const nome, setNome = useState('');) cria variáveis de estado que substituem a leitura manual dos valores do DOM. O valor de cada campo é atualizado a cada tecla digitada.
handleSubmit (Validação):
- Lógica: A função ligada ao evento onSubmit executa event.preventDefault() para evitar o recarregamento. Em seguida, verifica se os estados nome e email estão vazios, replicando a lógica de erro do projeto original.
src/app/forms/page.js
```
'use client'; 
import { useState } from 'react';
// ...

export default function Forms() {
  const [nome, setNome] = useState('');
  // ... outros estados ...

  const handleSubmit = (event) => {
    event.preventDefault(); 
    // ... validação dos campos ...
  };

  return (
    // ... JSX do formulário ...
    <input 
        className="inputs" 
        // ...
        value={nome}
        onChange={(e) => setNome(e.target.value)} // Conexão que atualiza o estado
    />
    // ...
  );
}
```

## 4. Tutorial do que foi implementado (sem API)

O projeto foi configurado como funcional ao simular os dados do backend usando Dados Fixos para Estrutura (Simulação).
- Geração Dinâmica da Galeria (Dados Fixos para Estrutura)
- A lógica da antiga função JavaScript criarGaleria foi reescrita em src/app/page.js usando um array de dados fixos.
- Dados de Estrutura Fixa: Um array de objetos (petData) foi criado. Cada objeto contém o caminho das imagens e a propriedade quantity (quantidade), simulando o que viria de um servidor.
- Renderização com .map: A função .map do JavaScript é usada para iterar sobre os dados, que funcionam como uma lista para o componente. Em vez de usar o for loop tradicional, o .map gera dinamicamente os componentes img no JSX.
src/app/page.js
```
const petData = [
  { id: 'cachorros', title: 'Cachorros', src: '/Cachorro.jpg', quantity: 4 },
  { id: 'gatos', title: 'Gatos', src: '/Gato.jpg', quantity: 4 },
];

// Componente PetGallery (Gera as imagens dinamicamente)
function PetGallery({ id, title, data }) {
  // Cria um array para iterar 4 vezes
  const images = Array.from({ length: data.quantity }, (_, index) => index);

  return (
    <section id={id}>
      <h2>{title}</h2>
      {images.map((index) => (
        // Geração dinâmica de imagens com base nos Dados Fixos
        <img key={index} src={data.src} alt={data.alt} />
      ))}
    </section>
  );
}
```

