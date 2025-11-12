// src/app/api/pets/route.js

// API: lista de pets (mock local)
const PETS = [
  { id: 1,  nome: "Thor",   especie: "Cachorro", cidade: "São Paulo",  estado: "SP", sexo: "M", idadeMeses: 18, porte: "Médio",  descricao: "Brincalhão e dócil.",                  foto: "Thor.jpg"     },
  { id: 2,  nome: "Luna",   especie: "Gato",     cidade: "Santos",     estado: "SP", sexo: "F", idadeMeses: 12, porte: "Pequeno", descricao: "Calma e carinhosa.",                foto: "Luna.jpeg"    },
  { id: 3,  nome: "Zeus",   especie: "Cachorro", cidade: "Campinas",   estado: "SP", sexo: "M", idadeMeses: 8,  porte: "Pequeno", descricao: "Curioso e esperto.",                foto: "Zeus.jpeg"    },
  { id: 4,  nome: "Amora",  especie: "Gato",     cidade: "Osasco",     estado: "SP", sexo: "F", idadeMeses: 20, porte: "Médio",  descricao: "Tranquila e limpa.",                 foto: "Amora.JPG"    },
  { id: 5,  nome: "Nina",   especie: "Cachorro", cidade: "Guarulhos",  estado: "SP", sexo: "F", idadeMeses: 10, porte: "Pequeno", descricao: "Muito carinhosa.",                   foto: "Nina.jpg"     },
  { id: 6,  nome: "Milo",   especie: "Gato",     cidade: "Sorocaba",   estado: "SP", sexo: "M", idadeMeses: 16, porte: "Pequeno", descricao: "Apego por colo.",                    foto: "Milo.jpg"     },
  { id: 7,  nome: "Bento",  especie: "Cachorro", cidade: "Santos",     estado: "SP", sexo: "M", idadeMeses: 30, porte: "Grande",  descricao: "Companheiro fiel.",                  foto: "Bento.JPG"    },
  { id: 8,  nome: "Maya",   especie: "Gato",     cidade: "Jundiaí",    estado: "SP", sexo: "F", idadeMeses: 7,  porte: "Pequeno", descricao: "Brinca com bolinhas.",               foto: "Maya.jpg"     },
  { id: 9,  nome: "Pipoca", especie: "Cachorro", cidade: "Barueri",    estado: "SP", sexo: "F", idadeMeses: 14, porte: "Médio",  descricao: "Cheia de energia.",                  foto: "Pipoca.jpg"   },
  { id: 10, nome: "Tico",   especie: "Gato",     cidade: "São Paulo",  estado: "SP", sexo: "M", idadeMeses: 9,  porte: "Pequeno", descricao: "Observador silencioso.",            foto: "Tico.jpg"     },
  { id: 11, nome: "Zara",   especie: "Cachorro", cidade: "Santos",     estado: "SP", sexo: "F", idadeMeses: 22, porte: "Médio",  descricao: "Sociável com crianças.",             foto: "Zara.jpg"     },
  { id: 12, nome: "Kira",   especie: "Gato",     cidade: "São Paulo",  estado: "SP", sexo: "F", idadeMeses: 5,  porte: "Pequeno", descricao: "Filhote curiosa.",                   foto: "Kira.JPG"     },
  { id: 13, nome: "Bolt",   especie: "Cachorro", cidade: "Campinas",   estado: "SP", sexo: "M", idadeMeses: 11, porte: "Médio",  descricao: "Adora passear.",                      foto: "Bolt.jpeg"    },
  { id: 14, nome: "Mimi",   especie: "Gato",     cidade: "Osasco",     estado: "SP", sexo: "F", idadeMeses: 26, porte: "Pequeno", descricao: "Dorme ao sol.",                     foto: "Mimi.jpg"     },
  { id: 15, nome: "Rex",    especie: "Cachorro", cidade: "Guarulhos",  estado: "SP", sexo: "M", idadeMeses: 36, porte: "Grande",  descricao: "Protetor e calmo.",                   foto: "Rex.jpg"      },
  { id: 16, nome: "Nico",   especie: "Gato",     cidade: "Sorocaba",   estado: "SP", sexo: "M", idadeMeses: 4,  porte: "Pequeno", descricao: "Filhote manhoso.",                   foto: "Nico.jpg"     },
  { id: 17, nome: "Lola",   especie: "Cachorro", cidade: "Jundiaí",    estado: "SP", sexo: "F", idadeMeses: 18, porte: "Médio",  descricao: "Gosta de água.",                      foto: "Lola.jpg"     },
  { id: 18, nome: "Frajola",especie:"Gato",      cidade: "Barueri",    estado: "SP", sexo: "M", idadeMeses: 40, porte: "Pequeno", descricao: "Clássico preto e branco.",           foto: "Frajola.jpg"  },
  { id: 19, nome: "Duke",   especie: "Cachorro", cidade: "Santos",     estado: "SP", sexo: "M", idadeMeses: 28, porte: "Grande",  descricao: "Leal e atento.",                      foto: "Duke.jpeg"    },
  { id: 20, nome: "Nala",   especie: "Gato",     cidade: "São Paulo",  estado: "SP", sexo: "F", idadeMeses: 13, porte: "Pequeno", descricao: "Ronrona muito.",                     foto: "Nala.JPG"     },
  { id: 21, nome: "Luke",   especie: "Cachorro", cidade: "Campinas",   estado: "SP", sexo: "M", idadeMeses: 6,  porte: "Pequeno", descricao: "Aprendendo truques.",                foto: "Luke.jpg"     },
  { id: 22, nome: "Mel",    especie: "Gato",     cidade: "Osasco",     estado: "SP", sexo: "F", idadeMeses: 21, porte: "Pequeno", descricao: "Muito meiga.",                        foto: "Mel.jpeg"     },
  { id: 23, nome: "Apolo",  especie: "Cachorro", cidade: "Guarulhos",  estado: "SP", sexo: "M", idadeMeses: 15, porte: "Médio",  descricao: "Companheiro.",                         foto: "Apolo.jpg"    },
  { id: 24, nome: "Cacau",  especie: "Gato",     cidade: "Sorocaba",   estado: "SP", sexo: "F", idadeMeses: 32, porte: "Pequeno", descricao: "Adora caixa de papelão.",             foto: "Cacau.jpg"    },
  { id: 25, nome: "Teddy",  especie: "Cachorro", cidade: "Jundiaí",    estado: "SP", sexo: "M", idadeMeses: 9,  porte: "Pequeno", descricao: "Peludo e fofo.",                      foto: "Teddy.jpg"    }
];

export async function GET() {
  return Response.json(PETS, { status: 200 });
}

// Export para reuso (se precisar)
export { PETS };
