'use client';

import { useState, useRef } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function Forms() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [especie, setEspecie] = useState('Cachorro');
  const [descricao, setDescricao] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const fotoRef = useRef(null); // arquivo não vai para localStorage; guardamos só o nome

  const handleSubmit = (event) => {
    event.preventDefault();

    const nomeValue = nome.trim();
    const emailValue = email.trim();
    const cidadeValue = cidade.trim();
    const estadoValue = estado.trim();
    const descricaoValue = descricao.trim();

    if (!nomeValue || !emailValue) {
      alert('Por favor, preencha o nome do pet e o e-mail.');
      return;
    }

    // Registro mínimo para PARTE 2 (sem API): salvar no localStorage
    const novoPet = {
      id: crypto.randomUUID(),
      nome: nomeValue,
      especie,
      descricao: descricaoValue,
      cidade: cidadeValue,
      estado: estadoValue,
      // Apenas o nome do arquivo para referência (sem upload real)
      fotoNome: fotoRef.current?.files?.[0]?.name ?? null,
      criadoEm: new Date().toISOString(),
    };

    const chave = 'buscaLar_pets';
    const atual = JSON.parse(localStorage.getItem(chave) || '[]');
    localStorage.setItem(chave, JSON.stringify([novoPet, ...atual]));

    alert('Pet cadastrado localmente (sem API).');
    handleReset();
  };

  const handleReset = () => {
    setNome('');
    setEmail('');
    setEspecie('Cachorro');
    setDescricao('');
    setCidade('');
    setEstado('');
    if (fotoRef.current) fotoRef.current.value = '';
  };

  return (
    <>
      {/* Se Header/Footer forem unificados no layout, remova-os daqui */}
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
                required
              />
            </p>

            <p>
              <label htmlFor="animal">Espécie:</label>
              <select
                className="inputs"
                id="animal"
                name="animal"
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
              >
                <option>Cachorro</option>
                <option>Gato</option>
                <option>Outro</option>
              </select>
            </p>

            <p>
              <label htmlFor="descricao">Descrição:</label>
              <textarea
                className="inputs"
                id="descricao"
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </p>

            <p>
              <label htmlFor="foto-pet">Foto:</label>
              <input
                className="inputs"
                type="file"
                id="foto-pet"
                name="foto-pet"
                ref={fotoRef}
                accept="image/*"
              />
            </p>
          </fieldset>

          <fieldset>
            <legend>Contato</legend>

            <p>
              <label htmlFor="cidade">Cidade:</label>
              <input
                className="inputs"
                type="text"
                id="cidade"
                name="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </p>

            <p>
              <label htmlFor="estado">Estado:</label>
              <input
                className="inputs"
                type="text"
                id="estado"
                name="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              />
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
                required
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
