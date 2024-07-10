import React, { useEffect, useState } from 'react';

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
};

const PokemonCard = ({ name, url, onSelectPokemon }) => {
  const [image, setImage] = useState('');
  const [cry, setCry] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setImage(data.sprites.front_default);
        setCry(`https://play.pokemonshowdown.com/audio/cries/${name}.mp3`);
        setTypes(data.types.map(typeInfo => typeInfo.type.name));
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [url, name]);

  const handleClick = () => {
    onSelectPokemon(url);
    if (cry) {
      const audio = new Audio(cry);
      audio.play();
    }
  };

  return (
    <div className={`pokemon-card ${name.toLowerCase()}`} onClick={handleClick}>
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      {image && <img src={image} alt={name} />}
      <div className="types">
        {types.map(type => (
          <span key={type} className="type-label" style={{ backgroundColor: typeColors[type] }}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
