import { useEffect, useState } from 'react';
import './App.css';

const congelar = (tempo = 2000) => new Promise(resolve => setTimeout(() => resolve(), tempo ))

function App() {
  const [pokemons, setPokemons] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [error, setError] = useState(false)
  const [previousPage, setPreviousPage] = useState(null)
  const [nextPage, setNextPage] = useState(false)

  async function pokemonApi(url) {

    try {
      setError(false)
      setCarregando(true)
      await congelar()
      const response = await fetch(url);
      const json = await response.json();
      const detalhes = json.results.map(async(pokemon) => {
        const response = await fetch(pokemon.url)
        const json = await response.json()
        return json
      })
      const results = await Promise.all(detalhes)
      setPokemons(results)
      setNextPage(json.next);
      setPreviousPage(json.previous);
    } catch (error) {
      setError(true)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon/'
   pokemonApi(url)
  },[])

  return (
    <section>
     {error && <h1>Desculpe, não foi possível carregar sua Pokedéx, tente novamente! </h1>}
     {carregando && <h1>Carregando...</h1>}
     <ul>
      {!carregando && pokemons.map((pokemon) => (
        <div>
          <li>{pokemon.name}
          <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
          </li>
        </div>
      ))}
     </ul>

     <footer>
     <button onClick={() => previousPage && pokemonApi(previousPage)}>{'<<'}</button>
     <button onClick={() => nextPage && pokemonApi(nextPage)}>{'>>'}</button>
     </footer>
     

    </section>
   
  );
}

export default App;
