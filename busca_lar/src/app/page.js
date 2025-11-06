"use client"


import Header from "./components/Header"
import Footer from "./components/Footer"
import { useEffect, useState } from "react";

export default function Home() {
  return (
  <>
    <Header/>
    <main>
      <section>
        <button onClick={() => alert('Em construção')}>Busca Pet</button>
        <a href="/forms">
          <button>Busca Lar</button>
        </a>
      </section>
    </main>
    <Footer/>
  </>
  )
}
