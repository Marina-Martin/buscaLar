# Busca Lar

## Bruno Roveri - 10401752
## Marina Martin - 10403028

## 1. Sobre o projeto

O BuscaLar é uma plataforma digital criada para facilitar a adoção de animais encontrados nas ruas, oferecendo um espaço organizado onde pessoas podem cadastrar pets resgatados e onde interessados podem encontrá-los com facilidade. Mais do que um site, o projeto tem caráter extensionista, pois promove impacto social ao dar visibilidade a animais em situação de vulnerabilidade, conscientizar sobre a adoção responsável e fortalecer uma rede comunitária entre resgatadores, adotantes e ONGs. Assim, o BuscaLar contribui ativamente para a redução do abandono e para a construção de uma sociedade mais solidária e engajada com a causa animal.

## 2. Estrutura do Projeto

O projeto é construído com Next.js e utiliza o App Router. A estrutura foi pensada para componentes reutilizáveis, gerenciamento de estado eficiente e uma boa experiência de desenvolvimento.

### Componentes Comuns:
- `src/app/components/Header.js`: Componente de navegação superior.
- `src/app/components/Footer.js`: Componente de rodapé.
- `src/app/components/PetCard.js`: Componente para exibir detalhes de um animal em um cartão.

### Páginas Principais:
- `src/app/page.js`: Página inicial que exibe uma prévia de cachorros e gatos para adoção.
- `src/app/forms/page.js`: Página com o formulário de cadastro de pets.
- `src/app/pets/page.js`: Página de listagem completa de pets (componente `PetSearch`).
- `src/app/pets/[id]/page.js`: Página de detalhes individuais do pet selecionado, carregando todas as informações completas da API.


### Estilização e Dados:
- `src/app/globals.css`: Contém todos os estilos CSS globais do projeto.
- `src/app/hooks/usePetsData.js`: Custom hook para buscar dados da API.
- `src/app/pets/page.module.css`: Estilos específicos para a página de listagem de pets.
- `src/app/page.module.css`: Estilos específicos para a página inicial.

## 3. Transição de Código para Next.js

### 3.1 HTML (Convertido para JSX e Refatorado)
- O código HTML foi reescrito em JSX, a sintaxe de marcação do React.
- **Adaptação de Atributos**: Todos os atributos HTML `class` foram substituídos por `className` e `for` (usado em `label`) por `htmlFor`.
- **Unificação de Componentes**: Os elementos de layout (`<header>` e `<footer>`) foram removidos das páginas individuais e centralizados nos componentes `Header.js` e `Footer.js`, que são reutilizados em todas as rotas.
- **Navegação**: O `Header.js` utiliza o componente `Link` do Next.js, garantindo que o link do logo "Busca Lar" para a Home Page seja rápido e otimizado.

src/app/components/Header.js
```
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
````

### 3.2 CSS (Estilização de Formulário)
- O CSS foi unificado em `globals.css`. Regras explícitas foram adicionadas para garantir que o design preto e branco original fosse mantido.
- Design Original Preservado.
- Consistência de Cores: Regras como background: white important foram usadas para forçar o fundo branco e o texto preto nos inputs, botões e no body, garantindo a fidelidade ao design.

`src/app/globals.css` (Trecho relevante)

```
body {
  background: #f2f2f2 !important;
  color: black !important;
  font-family: Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Estilos de Botões e Inputs */
button, .input-control, .inputs {
  background-color: white !important;
  color: black !important;
  border: 1px solid black;
  /* ... */
}

/* Estilos Estruturais com bordas */
header, footer, form, fieldset {
  border: 2px solid black;
  border-color: black !important;
  /* ... */
}

main h2, section h3, .pet-card-name {
  color: #000000 !important;
}

.galeria {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pet-card {
  width: 200px;
  /* ... */
}

section h3 {
  margin-bottom: 1.5rem; 
  text-align: center;
  /* ... */
}
```

### 3.3 JavaScript (Reatividade, Hooks e Gestão de API)

A lógica do `formsScript.js` foi completamente substituída pelo modelo de programação reativa do React em `src/app/forms/page.js`. Além disso, a busca de dados da API foi centralizada em um custom hook.

- Diretiva `use client`: Esta diretiva é obrigatória no App Router para componentes que utilizam hooks de estado (`useState`, `useEffect`) ou interagem com o navegador.

- `useState` (Controle Reativo): Hooks como `useState` (ex: `const [nome, setNome] = useState('');`) criam variáveis de estado que substituem a leitura manual dos valores do DOM. O valor de cada campo é atualizado a cada tecla digitada.

- handleSubmit (Validação): A função ligada ao evento `onSubmit` executa `event.preventDefault()` para evitar o recarregamento da página. Em seguida, valida os campos replicando a lógica de erro do projeto original.

`src/app/forms/page.js` (Trecho relevante)

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

## 4. Gerenciamento de Dados (com API)
   
O projeto agora busca dinamicamente os dados de pets de uma API externa, usando um custom hook para reutilização de código e melhor gerenciamento de estado.

### 4.1 Custom Hook usePetsData
- Para evitar a duplicação da lógica de chamada de API em múltiplas páginas, um custom hook chamado `usePetsData` foi criado.
- Ele encapsula a lógica de fetch de dados, gerenciamento de estados de `loading` e `error`, e a obtenção das variáveis de ambiente (`API_URL` e `IMAGES_BASE_URL`).
- O hook retorna um objeto contendo `allPets` (o array completo de pets), `loading` (booleano indicando se a requisição está em andamento), `error` (mensagem de erro, se houver) e `IMAGES_BASE_URL`.

`src/app/hooks/usePetsData.js`

```
'use client';

import { useState, useEffect } from 'react';

export function usePetsData() {
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const IMAGES_BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL || '';

  useEffect(() => {
    async function fetchData() {
      if (!API_URL || !IMAGES_BASE_URL) {
        setError("As variáveis de ambiente NEXT_PUBLIC_API_URL ou NEXT_PUBLIC_IMAGES_BASE_URL não estão definidas.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllPets(data);
      } catch (err) {
        setError(err.message);
        console.error('Falha ao buscar animais:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [API_URL, IMAGES_BASE_URL]);

  return { allPets, loading, error, IMAGES_BASE_URL };
}
```

### 4.2 Consumo de Dados na Página Inicial (Home)
- A página `Home` agora utiliza o usePetsData para obter todos os pets disponíveis.
- A partir de `allPets`, ela filtra e seleciona os primeiros 5 cachorros e 5 gatos para exibição nas respectivas galerias.
- O componente `PetCard` é reutilizado para renderizar cada animal.
  
`src/app/page.js`

```
'use client';

import Header from "./components/Header";
import Footer from "./components/Footer";
import PetCard from "./components/PetCard";
import { usePetsData } from '@/app/hooks/usePetsData'; // Importa o custom hook
import styles from './page.module.css';

export default function Home() {
  const { allPets, loading, error, IMAGES_BASE_URL } = usePetsData();

  const cachorros = allPets.filter(pet => pet.especie === 'cachorro').slice(0, 5);
  const gatos = allPets.filter(pet => pet.especie === 'gato').slice(0, 5);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2>Carregando nossos amiguinhos...</h2>
          <p>Buscando os primeiros pets para você!</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2>Ops! Algo deu errado.</h2>
          <p className={styles.errorMessage}>Ocorreu um erro ao carregar os animais: {error}</p>
          <p>Verifique as variáveis de ambiente e a disponibilidade da API.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#000000' }}>Adote um amiguinho ou cadastre para achar um lar para o que encontrou!</h2>
      <main className={styles.container}>
        <section id="cachorros">
          <h3>Cachorros</h3>
          <ul className="galeria">
            {cachorros.length > 0 ? (
              cachorros.map((pet) => (
                <li key={pet.id}>
                  <PetCard pet={pet} imagesBaseUrl={IMAGES_BASE_URL} />
                </li>
              ))
            ) : (
              <p>Nenhum cachorro disponível no momento.</p>
            )}
          </ul>
        </section>

        <section id="gatos">
          <h3>Gatos</h3>
          <ul className="galeria">
            {gatos.length > 0 ? (
              gatos.map((pet) => (
                <li key={pet.id}>
                  <PetCard pet={pet} imagesBaseUrl={IMAGES_BASE_URL} />
                </li>
              ))
            ) : (
              <p>Nenhum gato disponível no momento.</p>
            )}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

### 4.3 Consumo de Dados na Página de Busca de Pets (`PetSearch`)
- A página `PetSearch` também utiliza o `usePetsData` para obter a lista completa de pets.
- Diferente da `Home`, ela exibe todos os pets retornados pela API diretamente em uma única galeria.

`src/app/pets/page.js`

```
'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import PetCard from '@/app/components/PetCard';
import { usePetsData } from '@/app/hooks/usePetsData'; // Importa o custom hook
import styles from './PetsPage.module.css';

export default function PetSearch() {
  const { allPets, loading, error, IMAGES_BASE_URL } = usePetsData();

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2>Animais Disponíveis para Adoção</h2>
          <p>Carregando animais... ��</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className={styles.container}>
          <h2>Animais Disponíveis para Adoção</h2>
          <p className={styles.errorMessage}>Ocorreu um erro ao carregar os animais: {error}</p>
          <p>Verifique as variáveis de ambiente e a disponibilidade da API.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h2>Nossos Amiguinhos à Espera de um Lar! 🏡</h2>
        <ul className="galeria">
          {allPets.length > 0 ? (
            allPets.map((pet) => (
              <li key={pet.id}>
                <PetCard pet={pet} imagesBaseUrl={IMAGES_BASE_URL} />
              </li>
            ))
          ) : (
            <p className={styles.noPetsMessage}>Nenhum animal disponível no momento. Volte mais tarde!</p>
          )}
        </ul>
      </main>
      <Footer />
    </>
  );
}
```

## 5. Expansão do Projeto: BuscaPet com Filtros

A página `pets/page.js` foi ampliada e agora funciona como um catálogo completo dos animais disponíveis.  
As principais funcionalidades adicionadas:

### Filtros Dinâmicos
A página agora permite filtrar os pets por:
- Espécie
- Cidade
- Estado

As opções de filtro são geradas dinamicamente com base no conteúdo da API, evitando duplicação e garantindo escalabilidade.

### Renderização Reativa
Cada filtro atualiza imediatamente a lista de animais sem a necessidade de recarregar a página.

### Componentização
A listagem usa o `PetCard`, garantindo consistência visual entre Home e BuscaPet.

```
const speciesOptions = ["todas", ...new Set(pets.map(p => p.especie))];
const cityOptions    = ["todas", ...new Set(pets.map(p => p.cidade))];
const stateOptions   = ["todas", ...new Set(pets.map(p => p.estado))];
const filteredPets = pets.filter(pet => {
  return (
    (speciesFilter === "todas" || pet.especie === speciesFilter) &&
    (cityFilter === "todas" || pet.cidade === cityFilter) &&
    (stateFilter === "todas" || pet.estado === stateFilter)
  );
});
```

---

## 6. Página de Detalhes do Pet (`/pets/[id]`)

Uma nova rota dinâmica foi criada para exibir informações detalhadas de cada pet.

### O que a página exibe:
- Foto do pet (vinda da pasta `/fotos` na API)
- Nome
- Espécie
- Cidade e Estado
- Descrição
- E-mail de contato
- Botão de voltar para a listagem

### Objetivo da página
Oferecer ao usuário um painel completo do pet escolhido, melhorando a experiência e auxiliando o processo de adoção.

### Integração com a API
A página utiliza o mesmo hook `usePetsData` para garantir consistência entre todas as rotas.

```
<article className={styles.details}>
  <figure>
    <Image src={`${IMAGES_BASE_URL}/${pet.foto}`} width={320} height={320} />
    <figcaption>{pet.nome}</figcaption>
  </figure>

  <section className={styles.info}>
    <h2>{pet.nome}</h2>
    <p><strong>Espécie:</strong> {pet.especie}</p>
    <p><strong>Localização:</strong> {pet.cidade} - {pet.estado}</p>
    <p><strong>Descrição:</strong> {pet.descricao}</p>
  </section>
</article>
```

---

## 7. Atualizações na Página Inicial (Home)

Com a evolução do projeto, a Home também foi ajustada:

### Cards clicáveis
Agora, ao clicar em qualquer pet listado na Home, o usuário é direcionado para a página de detalhes.

### Uso do `Link` do Next.js
Foi adicionado o componente `Link` envolvendo o `PetCard`, criando uma navegação fluida e sem recarregamento de página.

### Padronização visual
A Home recebeu atualizações no estilo para manter consistência com a página de busca e com a página de detalhes.

---

## 8. Evolução do PetCard

O PetCard foi refinado para:

- Exibir imagem e nome de forma padronizada,
- Ser reutilizável na Home, na BuscaPet e em futuras páginas,
- Garantir acessibilidade e semântica adequada,
- Facilitar a navegação para a página de detalhes.

```
export default function PetCard({ pet, imagesBaseUrl }) {
  return (
    <article className="pet-card">
      <figure>
        <Image
          src={`${imagesBaseUrl}/${pet.foto}`}
          alt={pet.nome}
          width={200}
          height={200}
        />
      </figure>

      <h3>{pet.nome}</h3>
    </article>
  );
}
```
