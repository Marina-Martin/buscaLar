"use client"

import Image from "next/image";
import styles from "./page.module.css";
import OlaMundo from "./components/OlaMundo"
import Saudacao from "./components/Saudacao";
import { useEffect, useState } from "react";

export default function Home() {
  const [novaTarefa, setNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    console.log("Número de tarefas: ", tarefas.length);
  }, [tarefas]);

  function adicionarTarefa() {
    if (novaTarefa.trim() != "") {
      setTarefas([...tarefas, novaTarefa]);
      setNovaTarefa("");
    }
  }

  function removerTarefa(index) {
    const tarefasRefresh = tarefas.filter((item, i) => i != index);
    setTarefas(tarefasRefresh);
  }

  return (
    <section>  
      <OlaMundo/>
      <Saudacao nome = "Marina"/>

      <section>
        <h1> Lista de tarefas </h1>
        <input 
          type="text" 
          value={novaTarefa} 
          onChange={(i) => setNovaTarefa(i.target.value)} 
          placeholder="Digite uma tarefa"/>
        <button onClick={adicionarTarefa}> Adicionar </button>

        <ul>
          {tarefas.map((item, index) => (
            <li key={index}> 
            {item} 
            <button onClick={() => removerTarefa(index)}> Remover </button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
