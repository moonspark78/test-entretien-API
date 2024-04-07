import React, { useEffect, useState } from 'react';
import './style.css';
import CardPokemonDetail from './components/CardPokemonDetail';

/* 
  1 - Récupérer tous les pokémons sur https://pokeapi.co/api/v2/pokemon/ et les afficher sur les cartes noires
  2 - Au clic sur une des cartes noires on souhaite afficher une nouvelle carte grise, avec le nom du pokémon (name), le poids (weight) et la taille (height) https://pokeapi.co/api/v2/pokemon/{name ou id}
  3 - Créer un champ de recherche pour chercher un pokémon et l'afficher dans la carte grise
  4 - Propositions de refacto
*/

export default function App() {
  const [pokemons, setPokemons] = React.useState([
    { name: 'Pikachu' },
    { name: 'Salameche' },
  ]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() =>{
      const fetchData = async () => {
          const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/")
          const data = await reponse.json();
          console.log(data.results);
          setPokemons(data.results)
      };
      fetchData();
  },[])

  const handlePokemonClick = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error(`Error fetching details for ${pokemonName}:`, error);
    }
  };

  const filterData = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
  });








  return (
    <div>
      <h1>Liste de pokémons</h1>
      <input placeholder="Enter text here" class="input-style" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}   />

      <div style={{ textAlign: 'center' }}>
        Emplacement de la carte de détail d'un pokémon ce sera le composant
        CardPokemonDetail
        {selectedPokemon ? (
        <CardPokemonDetail
          name={selectedPokemon.name}
          height={selectedPokemon.height}
          weight={selectedPokemon.weight}
        />
      ) : (
        <p>Sélectionnez un Pokémon pour voir les détails.</p>
      )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filterData.map((pokemon) => (
          <div
            id="carte-pokemon"
            style={{
              background: '#222222',
              color: 'white',
              padding: '10px',
              margin: '15px',
              width: '100px',
              cursor: 'pointer',
            }}
            onClick={() => handlePokemonClick(pokemon.name)}
          >
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}