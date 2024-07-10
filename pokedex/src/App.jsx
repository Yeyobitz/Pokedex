import React, { useEffect, useState } from 'react';
import PokemonList from '../components/PokemonList';
import './App.css';

const App = () => {
  const [eevee, setEevee] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    const fetchEeveeData = async () => {
      try {
        const eeveeResponse = await fetch('https://pokeapi.co/api/v2/pokemon/eevee');
        const eeveeData = await eeveeResponse.json();
        setEevee(eeveeData);

        const evolutionResponse = await fetch('https://pokeapi.co/api/v2/evolution-chain/67/');
        const evolutionData = await evolutionResponse.json();
        const eeveeEvolutions = evolutionData.chain.evolves_to.map(evolution => ({
          name: evolution.species.name,
          url: `https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`
        }));
        setEvolutions(eeveeEvolutions);
      } catch (error) {
        console.error('Error fetching Eevee data and evolutions:', error);
      }
    };

    fetchEeveeData();
  }, []);

  const handleSelectPokemon = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error('Error fetching selected Pokémon data:', error);
    }
  };

  const handleClose = () => {
    setSelectedPokemon(null);
  };

  const combinedList = [
    ...evolutions.slice(0, 4),
    { name: 'eevee', url: 'https://pokeapi.co/api/v2/pokemon/eevee' },
    ...evolutions.slice(4)
  ];

  const getAnimatedSprite = (name) => {
    const nameToIdMap = {
      eevee: 133,
      vaporeon: 134,
      jolteon: 135,
      flareon: 136,
      espeon: 196,
      umbreon: 197,
      leafeon: 470,
      glaceon: 471,
      sylveon: 700,
    };

    if (name === 'sylveon') {
      return `https://projectpokemon.org/images/normal-sprite/sylveon.gif`;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${nameToIdMap[name]}.gif`;
  };

  const getWikiLink = (name) => {
    return `https://pokemon.fandom.com/es/wiki/${name.charAt(0).toUpperCase() + name.slice(1)}`;
  };

  const handleMouseOver = (pokemon) => {
    const colors = {
      vaporeon: '#b3d4f7',
      jolteon: '#f7e7b3',
      flareon: '#f7b3b3',
      espeon: '#f7b3e0',
      umbreon: '#b3b3b3',
      leafeon: '#d3f7b3',
      glaceon: '#b3f7f7',
      sylveon: '#f7b3c3',
      eevee: '#d7bba3'
    };
    setBackgroundColor(colors[pokemon] || '');
  };

  const handleMouseOut = () => {
    setBackgroundColor('');
  };

  return (
    <div className="App" style={{ backgroundColor }}>
      <div className="pokemon-grid">
        <PokemonList 
          evolutions={combinedList} 
          onSelectPokemon={handleSelectPokemon}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </div>
      {selectedPokemon && (
        <div className={`overlay ${selectedPokemon.name.toLowerCase()}`}>
          <div className={`selected-pokemon ${selectedPokemon.name.toLowerCase()}`}>
            <button className="close-button" onClick={handleClose}>X</button>
            <img src={getAnimatedSprite(selectedPokemon.name.toLowerCase())} alt={selectedPokemon.name} className="pokemon-sprite" />
            <h2>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h2>
            <p>Altura: {(selectedPokemon.height * 10).toFixed(2)} cm</p>
            <p>Peso: {(selectedPokemon.weight / 10).toFixed(2)} kg</p>
            <a className='link-button' href={getWikiLink(selectedPokemon.name.toLowerCase())} target="_blank" rel="noopener noreferrer">Ver más</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
