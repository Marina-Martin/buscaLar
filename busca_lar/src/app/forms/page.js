'use client'; 

import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Forms() {
  // Estados para os campos que precisam de validação
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  // Lógica de Validação e Submissão
  const handleSubmit = (event) => {
    event.preventDefault(); 

    const nomeValue = nome.trim();
    const emailValue = email.trim();

    if (!nomeValue || !emailValue) {
      alert("Por favor, preencha o nome do pet e o e-mail.");
      return; 
    }

    alert(`Dados do Pet: Nome - ${nomeValue}, E-mail - ${emailValue}`);
  };

  // Lógica para o botão "Limpar"
  const handleReset = () => {
    setNome('');
    setEmail('');
  };
  
  return (
    <>
      <Header />
      <main>
        <h2>Cadastre seu Pet</h2>
        <form onSubmit={handleSubmit}> 
          <fieldset>
            <legend>Informações do Pet</legend>
            <p>
              <label htmlFor="nome-pet">Nome:</label>
              <input 
                className="inputs" 
                type="text" 
                id="nome-pet" 
                name="nome-pet"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="animal">Espécie:</label>
              <select className="inputs" id="animal" name="animal">
                <option>Cachorro</option>
                <option>Gato</option>
                <option>Outro</option>
              </select>
            </p>
            <p>
              <label htmlFor="descricao">Descrição:</label>
              <textarea className="inputs" id="descricao" name="descricao"></textarea>
            </p>
            <p>
              <label htmlFor="foto-pet">Foto:</label>
              <input className="inputs" type="file" id="foto-pet" name="foto-pet" />
            </p>
          </fieldset>

          <fieldset>
            <legend>Contato</legend>
            <p>
              <label htmlFor="cidade">Cidade:</label>
              <input className="inputs" type="text" id="cidade" name="cidade" />
            </p>
            <p>
              <label htmlFor="estado">Estado:</label>
              <input className="inputs" type="text" id="estado" name="estado" />
            </p>
            <p>
              <label htmlFor="email">E-mail:</label>
              <input 
                className="inputs" 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
          </fieldset>

          <p className="botoes-form">
            <button className="btn" type="submit">Enviar</button>
            <button className="btn" type="button" onClick={handleReset}>Limpar</button>
          </p>
        </form>
      </main>
      <Footer /> 
    </>
  );
}