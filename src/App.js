import React from "react";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import GridPoke from "./components/grid/GridPoke";
import Header from "./components/Header/Header";
import Search from "./components/search/Search";

import "./styles.css";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [busca, setBusca] = useState("ditto");
  const [removeLoading, setRemoveLoading] = useState(true);
  let urlBusca = `https://pokeapi.co/api/v2/pokemon/${busca}`;

  useEffect(() => {
    loadAPI();
  }, []);

  function loadAPI() {
    fetch(urlBusca)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setPokemon(json);
        // console.log(urlBusca);
        setRemoveLoading(false);
      })
      .catch((err) => console.log(err));
  }

  // const search = (e) => {};

  const handleChange = (e) => {
    setBusca(e.target.value);
    // e.preventDefault();
  };
  if (removeLoading === true) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        <Header />
        <div>
          <div>
            <input
              placeholder="charizard"
              value={busca}
              onChange={handleChange}
              type="text"
            ></input>
            <button className="button" onClick={loadAPI}>
              Pesquisar detalhes
            </button>
          </div>
        </div>
        <div className="detalhes">
          <div className="results">
            <div className="principal">
              <div className="itens">{pokemon.name} </div>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <img src={pokemon.sprites.back_default} alt={pokemon.name} />
              {/* <img src={pokemon.sprites.front_shiny} alt={pokemon.name} /> */}
              <div>Nº: {pokemon.id} </div>
              <div>Peso: {pokemon.weight} </div>
              <div>Altura: {pokemon.height} </div>
              <div>Experiência: {pokemon.base_experience} </div>
            </div>
          </div>
        </div>

        <GridPoke />
      </div>
    );
  }
}
