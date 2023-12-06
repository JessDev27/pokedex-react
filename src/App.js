import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([])

  async function pokemonApi() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const json = await response.json();
      setPokemons(json.results);
    } catch (error) {
      
    }
  }

  useEffect(() => {
   pokemonApi()
  },[])
  

  return (
    <section>
     <h1>Carregando...</h1>
     <ul>
      {pokemons.map((pokemon) => (
      <li>{pokemon.name}</li>
      ))}
      
     </ul>
    </section>
   
  );
}

export default App;
