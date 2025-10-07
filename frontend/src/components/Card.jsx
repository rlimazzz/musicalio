// src/components/Card.jsx

import React from 'react';
import './Card.css'; // Importando o CSS para estilização

// O componente Card recebe 'props' (propriedades) com os dados a serem exibidos
const Card = ({ imagemUrl, titulo, descricao, linkUrl }) => {
  return (
    // O container principal do card
    <div className="card-container">
      
      {/* Imagem do card */}
      <img src={imagemUrl} alt={`Capa para ${titulo}`} className="card-image" />

      {/* Corpo do card, com o conteúdo de texto */}
      <div className="card-body">
        <h3 className="card-title">{titulo}</h3>
        <p className="card-description">{descricao}</p>
      </div>

      {/* Rodapé do card com o botão/link */}
      <div className="card-footer">
        <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="card-button">
          Ouça Agora
        </a>
        <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="card-button">
          Avaliar
        </a>
      </div>

    </div>
  );
};

export default Card;