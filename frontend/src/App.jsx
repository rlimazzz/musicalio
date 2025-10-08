import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [searchTerm, setSearchTerm] = useState('Kendrick Lamar');
  const [artistToSearch, setArtistToSearch] = useState('Kendrick Lamar');
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const handleSearch = () => {
    setArtistToSearch(searchTerm);
  };

  useEffect(() => {
    if (!artistToSearch) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setArtistData(null);

    // Garante que nomes com espaços ou caracteres especiais sejam formatados para a URL
    const encodedArtistName = encodeURIComponent(artistToSearch);
    const urlApi = `http://127.0.0.1:8000/api/artists/${encodedArtistName}`;

    // DEBUG: Verifique no console do navegador a URL exata que está sendo chamada
    console.log("Chamando a API com a URL:", urlApi);

    fetch(urlApi)
      .then(response => response.json())
      .then(data => {
        // DEBUG: Veja no console a estrutura exata dos dados recebidos do backend
        console.log("Dados recebidos do backend:", data);

        const foundArtist = data.artists?.items[0];

        // DEBUG: Verifique se o artista foi encontrado corretamente dentro dos dados
        console.log("Artista encontrado na resposta:", foundArtist);

        setArtistData(foundArtist);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar dados da API:", error);
        setArtistData(null);
        setLoading(false);
      });
      
  }, [artistToSearch]);

  console.log("Estado atual do artista:", artistData);

  return (
    <div className="App">
      <h1>Busque por um Artista</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Digite o nome do artista"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {loading && <h1>Carregando...</h1>}

      {!loading && artistData && (
        <Card 
          imagemUrl={artistData.images[0].url} 
          titulo={artistData.name}
          linkUrl={artistData.external_urls.spotify}
        />
      )}

      {!loading && !artistData && (
        <h2>Nenhum artista encontrado. Tente outra busca.</h2>
      )}
    </div>
  );
}

export default App;