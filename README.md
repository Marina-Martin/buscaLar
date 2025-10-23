# Busca Lar

## Bruno Roveri - 10401752
## Marina Martin - 10403028

## 1. Sobre o projeto

O BuscaLar é uma plataforma digital criada para facilitar a adoção de animais encontrados nas ruas, oferecendo um espaço organizado onde pessoas podem cadastrar pets resgatados e onde interessados podem encontrá-los com facilidade. Mais do que um site, o projeto tem caráter extensionista, pois promove impacto social ao dar visibilidade a animais em situação de vulnerabilidade, conscientizar sobre a adoção responsável e fortalecer uma rede comunitária entre resgatadores, adotantes e ONGs. Assim, o BuscaLar contribui ativamente para a redução do abandono e para a construção de uma sociedade mais solidária e engajada com a causa animal.

## 2. Estrutura do Projeto

O formulário reside na rota /forms e depende de componentes compartilhados e do CSS global do projeto:
- src/app/forms/page.js: Contém o componente principal do formulário (lógica e JSX).
- src/app/components/Header.js: Componente de navegação superior, reutilizado da estrutura original.
- src/app/components/Footer.js: Componente de rodapé, reutilizado da estrutura original.
- src/app/globals.css: Contém todos os estilos CSS do projeto, incluindo as regras de formsStyle.css e as correções de tema.

## 3. Transição de Código para Next.js

3.1 HTML (Convertido para JSX)
- Adaptação de Atributos: Os atributos HTML nativos foram substituídos pelos seus equivalentes em React: class se tornou className e for se tornou htmlFor.
- Modularização do Layout: A página /forms importa os componentes <Header /> e <Footer />, garantindo que o cabeçalho e rodapé sejam idênticos em todo o site. O Header.js utiliza o componente <Link href=> do Next.js para garantir uma navegação suave de volta à Home.
- Estrutura de Formulário: A organização com <fieldset> e <legend> para agrupar "Informações do Pet" e "Contato" foi mantida.

3.2 CSS (Estilização de Formulário)
- Estilos do formsStyle.css: Regras como border: 2px solid black para header, footer, form e fieldset foram transferidas para manter a identidade visual forte do projeto.
- Design de Inputs: O seletor .inputs (presente nos campos do forms.html) foi estilizado para garantir que os campos ocupem 100% da largura do contêiner e possuam o padding adequado.
- Feedback Visual: A regra button:hover foi mantida para garantir a transição de cores (background: black; color: white;) ao passar o mouse sobre os botões, fornecendo feedback ao usuário.

3.3 JavaScript (Reatividade e Hooks)

Diretiva 'use client': Esta diretiva foi a primeira linha do arquivo e é obrigatória no App Router. Ela instrui o Next.js a renderizar o componente no lado do navegador, permitindo o uso de funcionalidades interativas como o hook useState e funções como alert().

useState (Gerenciamento de Inputs):
- Propósito: Substitui a leitura direta dos valores do DOM. O valor de cada campo é associado a uma variável de estado que é atualizada a cada tecla digitada (Inputs Controlados).

handleSubmit (Validação de Envio):
- Conexão: Chamada pela propriedade onSubmit na tag <form>.
- Propósito: Executa event.preventDefault() para impedir o recarregamento da página e, em seguida, verifica se os estados nome e email estão vazios. A lógica condicional e o alert replicam exatamente o comportamento do formsScript.js original.

handleReset (Limpar Campos):
- Função: É conectada ao botão "Limpar" através do onClick.
- Propósito: Reseta o estado dos inputs (ex: setNome('')), demonstrando como o React gerencia a reatividade para limpar o formulário.

