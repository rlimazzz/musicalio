# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import  load_dotenv
import os
import json
import base64
from requests import post, get

load_dotenv()  # Carrega as variáveis de ambiente do arquivo .env

client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")

print("Client ID:", client_id)
print("Client Secret:", client_secret)  

def get_spotify_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    result = post(url, headers=headers, data=data)
    json_result = result.json()
    token = json_result["access_token"]
    return token

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}

def search_for_artists(token, artist_name):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth_header(token)
    query = f"?q={artist_name}&type=artist&limit=1"
    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = result.json()
    return json_result

token = get_spotify_token()
print(search_for_artists(token, "Adele"))

# Cria a aplicação FastAPI
app = FastAPI()

# Configuração do CORS
# Lista de origens permitidas (seu front-end React)
origins = [
    "http://localhost:3000", # Endereço padrão do create-react-app
    "http://localhost:5173", # Endereço padrão do Vite
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite as origens listadas
    allow_credentials=True,
    allow_methods=["*"],    # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],    # Permite todos os cabeçalhos
)

# Dados de exemplo
musicas_db = [
    {"id": 1, "nome": "Bohemian Rhapsody", "artista": "Queen", "avaliacao": 5},
    {"id": 2, "nome": "Smells Like Teen Spirit", "artista": "Nirvana", "avaliacao": 4},
    {"id": 3, "nome": "Billie Jean", "artista": "Michael Jackson", "avaliacao": 5},
]

# Endpoint para a raiz da API (só para teste)
@app.get("/")
def read_root():
    return {"Olá": "Mundo"}

# Endpoint para buscar todas as músicas
@app.get("/api/musicas/{artist_name}")
def get_musicas(artist_name: str):
    return search_for_artists(token, artist_name)