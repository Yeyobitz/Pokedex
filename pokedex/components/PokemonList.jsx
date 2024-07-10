import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ evolutions, onSelectPokemon }) => {
  return (
    <>
      {evolutions.map((evolution, index) => (
        <PokemonCard key={index} name={evolution.name} url={evolution.url} onSelectPokemon={onSelectPokemon} />
      ))}
    </>
  );
};

export default PokemonList;
