// frontend/src/App.jsx

import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card';

function App() {
  // Estado para armazenar a lista de músicas
  const [musicas, setMusicas] = useState([]);
  // Estado para mostrar uma mensagem de carregamento
  const [loading, setLoading] = useState(true);

  // useEffect vai rodar uma vez, quando o componente for montado
  useEffect(() => {
    // A URL completa do endpoint do seu back-end FastAPI
    const urlApi = "http://127.0.0.1:8000/api/musicas/KendrickLamar";

    // Usamos a função fetch() para fazer a requisição GET
    fetch(urlApi)
      .then(response => response.json()) // Converte a resposta para JSON
      .then(data => {
        setMusicas(data); // Armazena os dados no nosso estado
        setLoading(false); // Esconde a mensagem de carregamento
      })
      .catch(error => {
        console.error("Erro ao buscar dados da API:", error);
        setLoading(false);
      });
  }, []); // O array vazio [] garante que esta função só rode uma vez

  // Mostra a mensagem de carregamento enquanto os dados não chegam
  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="App">
      <h1>Minhas Músicas Favoritas</h1>
      <Card imagemUrl={musicas.artists.items[0].images[0].url} 
            titulo={musicas.artists.items[0].name}
            linkUrl={musicas.artists.items[0].external_urls.spotify}/>
    </div>
  )
}

export default App