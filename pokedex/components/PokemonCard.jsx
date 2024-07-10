import React, { useEffect, useState } from 'react';

const PokemonCard = ({ name, url, onSelectPokemon }) => {
  const [image, setImage] = useState('');
  const [cry, setCry] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setImage(data.sprites.front_default);
        setCry(`https://play.pokemonshowdown.com/audio/cries/${name}.mp3`);
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
    </div>
  );
};

export default PokemonCard;
