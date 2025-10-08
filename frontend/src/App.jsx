import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [searchTerm, setSearchTerm] = useState('Queen');
  const [artistToSearch, setArtistToSearch] = useState('Queen');
  const [artistList, setArtistList] = useState([]);
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
    setArtistList([]);

    const encodedArtistName = encodeURIComponent(artistToSearch);
    // CORREÇÃO: O IP correto para o servidor local é 127.0.0.1
    const urlApi = `http://127.0.0.1:8000/api/artists/${encodedArtistName}`;

    fetch(urlApi)
      .then(response => response.json())
      .then(data => {
        const foundArtists = data.artists?.items || [];
        setArtistList(foundArtists);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar dados da API:", error);
        setArtistList([]);
        setLoading(false);
      });
      
  }, [artistToSearch]);

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

      {!loading && artistList.length > 0 && (
        <div className="artists-container">
          {artistList.map((artist) => {
            const imageUrl = artist.images[0]?.url || 'https://placehold.co/300x300/222/fff?text=?';
            
            return (
              <Card 
                key={artist.id}
                imagemUrl={imageUrl} 
                titulo={artist.name}
                linkUrl={artist.external_urls.spotify}
              />
            )
          })}
        </div>
      )}

      {!loading && artistList.length === 0 && (
        <h2>Nenhum artista encontrado. Tente outra busca.</h2>
      )}
    </div>
  );
}

export default App;